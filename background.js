
/* SAME */
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
      if (request.operation=="startSame") {
          startCapture();
      } else if (request.operation=="stopSame") {
          // alert("bk - addListener: stopSame ");
          // stopSame();
      } else if (request.operation=="sameGetScreenshots") {
          alert("sameGetScreenshots");
          startCaptureScreenshot( request.user, request.idmeeting, request.value );
      }

  });
/* SAME */


const record_extend = function() { //helper function to merge objects
  let target = arguments[0],
      sources = [].slice.call(arguments, 1);
  for (let i = 0; i < sources.length; ++i) {
    let src = sources[i];
    for (key in src) {
      let val = src[key];
      target[key] = typeof val === "object"
        ? record_extend(typeof target[key] === "object" ? target[key] : {}, val)
        : val;
    }
  }
  return target;
};

const RECORD_WORKER_FILE = {
  wav: "WavWorker.js",
  mp3: "Mp3Worker.js"
};

// default configs
const RECORD_CONFIGS = {
  workerDir: "/workers/",     // worker scripts dir (end with /)
  numChannels: 2,     // number of channels
  encoding: "wav",    // encoding (can be changed at runtime)

  // runtime options
  options: {
    timeLimit: 3600,           // recording time limit (sec)
    encodeAfterRecord: true, // process encoding after recording
    progressInterval: 1000,   // encoding progress report interval (millisec)
    bufferSize: undefined,    // buffer size (use browser default)

    // encoding-specific options
    wav: {
      mimeType: "audio/wav"
    },
    mp3: {
      mimeType: "audio/mpeg",
      bitRate: 192            // (CBR only): bit rate = [64 .. 320]
    }
  }
};

class Recorder {

  constructor(source, configs) { //creates audio context from the source and connects it to the worker
    record_extend(this, RECORD_CONFIGS, configs || {});
    this.context = source.context;
    if (this.context.createScriptProcessor == null)
      this.context.createScriptProcessor = this.context.createJavaScriptNode;
    this.input = this.context.createGain();
    source.connect(this.input);
    this.buffer = [];
    this.initWorker();
  }

  isRecording() {
    return this.processor != null;
  }

  setEncoding(encoding) {
    if(!this.isRecording() && this.encoding !== encoding) {
        this.encoding = encoding;
        this.initWorker();
    }
  }

  setOptions(options) {
    if (!this.isRecording()) {
      record_extend(this.options, options);
      this.worker.postMessage({ command: "options", options: this.options});
    }
  }

  startRecording() {
    if(!this.isRecording()) {
      let numChannels = this.numChannels;
      let buffer = this.buffer;
      let worker = this.worker;
      this.processor = this.context.createScriptProcessor(
        this.options.bufferSize,
        this.numChannels, this.numChannels);
      this.input.connect(this.processor);
      this.processor.connect(this.context.destination);
      this.processor.onaudioprocess = function(event) {
        for (var ch = 0; ch < numChannels; ++ch)
          buffer[ch] = event.inputBuffer.getChannelData(ch);
        worker.postMessage({ command: "record", buffer: buffer });
      };
      this.worker.postMessage({
        command: "start",
        bufferSize: this.processor.bufferSize
      });
      this.startTime = Date.now();
    }
  }

  cancelRecording() {
    if(this.isRecording()) {
      this.input.disconnect();
      this.processor.disconnect();
      delete this.processor;
      this.worker.postMessage({ command: "cancel" });
    }
  }

  finishRecording() {
    if (this.isRecording()) {
      this.input.disconnect();
      this.processor.disconnect();
      delete this.processor;
      this.worker.postMessage({ command: "finish" });
    }
  }

  cancelEncoding() {
    if (this.options.encodeAfterRecord)
      if (!this.isRecording()) {
        this.onEncodingCanceled(this);
        this.initWorker();
      }
  }

  initWorker() {
    if (this.worker != null)
      this.worker.terminate();
    this.onEncoderLoading(this, this.encoding);
    this.worker = new Worker(this.workerDir + RECORD_WORKER_FILE[this.encoding]);
    let _this = this;
    this.worker.onmessage = function(event) {
      let data = event.data;
      switch (data.command) {
        case "loaded":
          _this.onEncoderLoaded(_this, _this.encoding);
          break;
        case "timeout":
          _this.onTimeout(_this);
          break;
        case "progress":
          _this.onEncodingProgress(_this, data.progress);
          break;
        case "complete":
          _this.onComplete(_this, data.blob);
      }
    }
    this.worker.postMessage({
      command: "init",
      config: {
        sampleRate: this.context.sampleRate,
        numChannels: this.numChannels
      },
      options: this.options
    });
  }

  onEncoderLoading(recorder, encoding) {}
  onEncoderLoaded(recorder, encoding) {}
  onTimeout(recorder) {}
  onEncodingProgress(recorder, progress) {}
  onEncodingCanceled(recorder) {}
  onComplete(recorder, blob) {}

}

const audioCapture = (timeLimit, muteTab, format, quality, limitRemoved) => {

  chrome.tabCapture.capture({audio: true}, (stream) => { // sets up stream for capture

    let startTabId; //tab when the capture is started
    let timeout;
    let completeTabID; //tab when the capture is stopped
    let audioURL = null; //resulting object when encoding is completed
    chrome.tabs.query({active:true, currentWindow: true}, (tabs) => startTabId = tabs[0].id) //saves start tab

    // alert("stream funzionante:" + stream);
    const liveStream = stream;
    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaStreamSource(stream);
    let mediaRecorder = new Recorder(source); //initiates the recorder based on the current stream
    mediaRecorder.setEncoding(format); //sets encoding based on options
    if(limitRemoved) { //removes time limit
      mediaRecorder.setOptions({timeLimit: 10800});
    } else {
      mediaRecorder.setOptions({timeLimit: timeLimit/1000});
    }
    if(format === "mp3") {
      mediaRecorder.setOptions({mp3: {bitRate: quality}});
    }
    mediaRecorder.startRecording();


    function onStopCommand(command) { //keypress
      // alert("bk - onStopCommand:" + command);
      if (command === "stop") {
        stopCapture();
      }
    }

    function onStopClick(request) { //click on popup
      // alert("bk - onStopClick: " + request);
      if(request.operation === "stopCapture") {
        stopCapture();
      } else if (request.operation === "cancelCapture") {
        cancelCapture();
      } else if (request.operation.cancelEncodeID) {
        if(request.operation.cancelEncodeID === startTabId && mediaRecorder) {
          mediaRecorder.cancelEncoding();
        }
      }
    }

    var userSame = "";
    var idmeetingSame = "";
    var usertypeSame = "";
    var idunivocoSame = "";

    function onStopClickSame(request) { //click on popup
      userSame = request.user;
      idmeetingSame = request.idmeeting;
      usertypeSame = request.type;
      idunivocoSame = request.idunivoco;

      if(request.operation === "stopSame") {
        // alert("bk - onStopClickSame"); // OK
        stopCapture();
      } else if (request.operation === "cancelSame") {
        cancelCapture();
      }
    }

    chrome.commands.onCommand.addListener(onStopCommand);
    chrome.runtime.onMessage.addListener(onStopClick);
    chrome.runtime.onMessageExternal.addListener(onStopClickSame);

    mediaRecorder.onComplete = (recorder, blob) => {

        //the form data that will hold the Blob to upload
        const formData = new FormData();
        //add the Blob to formData
        formData.append('fileToUpload', blob, 'recording.mp3');
        formData.append('idmeeting', idmeetingSame );
        formData.append('type', usertypeSame );
        formData.append('name', "" );
        formData.append('idunivoco', idunivocoSame );
        formData.append('user', userSame);
        // alert("recording___" + blob);
        //send the request to the endpoint
        var xhr = new XMLHttpRequest();
        xhr.open('POST', "https://api.sameapp.net/public/v1/record/save", true);
        xhr.onload = function () {
            // alert("onload________" + this.status);
        };
        xhr.onreadystatechange = function() {
            // alert("onreadystatechange________" + this.status);
        };
        try {
          xhr.send(formData);
        } catch (error) {
           // alert("error__recording______" + error);
        }

    }
    mediaRecorder.onEncodingProgress = (recorder, progress) => {
      if(completeTabID) {
        chrome.tabs.sendMessage(completeTabID, {type: "encodingProgress", progress: progress});
      }
    }

    const stopCapture = function() {

      let endTabId;
      //check to make sure the current tab is the tab being captured
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        endTabId = tabs[0].id;
        if(mediaRecorder && startTabId === endTabId){
          mediaRecorder.finishRecording();
          /*
          chrome.tabs.create({url: "../complete/complete.html"}, (tab) => {
            completeTabID = tab.id;
            let completeCallback = () => {
              chrome.tabs.sendMessage(tab.id, {type: "createTab", format: format, audioURL, startID: startTabId});
            }
            setTimeout(completeCallback, 2000);
          });
          */
          closeStream(endTabId);
        }


      })


    }

    const cancelCapture = function() {
      // alert("bk - cancelCapture");
      let endTabId;
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        endTabId = tabs[0].id;
        if(mediaRecorder && startTabId === endTabId){
          mediaRecorder.cancelRecording();
          closeStream(endTabId);
        }
        // chrome.tabs.sendMessage(tabs[0].id,{type: "sameCancel"});
      })

    }


//removes the audio context and closes recorder to save memory
    const closeStream = function(endTabId) {
      chrome.commands.onCommand.removeListener(onStopCommand);
      chrome.runtime.onMessage.removeListener(onStopClick);
      mediaRecorder.onTimeout = () => {};
      audioCtx.close();
      liveStream.getAudioTracks()[0].stop();
      sessionStorage.removeItem(endTabId);
      chrome.runtime.sendMessage({captureStopped: endTabId});
    }

    mediaRecorder.onTimeout = stopCapture;

    if(!muteTab) {
      let audio = new Audio();
      audio.srcObject = liveStream;
      audio.play();
    }

  });
}

/*********************** SAME plugin *************************/

//sends reponses to and from the popup menu
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.currentTab && sessionStorage.getItem(request.currentTab)) {
    sendResponse(sessionStorage.getItem(request.currentTab));
  } else if (request.currentTab){
    sendResponse(false);
  } else if (request === "startCapture") {
    startCapture();
  }  else if (request === "activeSame") {
    activeSame();
  } else if (request === "deactiveSame") {
    deactiveSame();
  }

});

/* SAME */
const activeSame = function() {
  sendMessageSame( "sameActive");
};
const deactiveSame = function() {
  sendMessageSame( "sameDeactive");
};

const sendMessageSame = function( msg ) {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id,{type: msg});
  });
};


/* SAME */

const startCapture = function() {

  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    // CODE TO BLOCK CAPTURE ON YOUTUBE, DO NOT REMOVE
      if(!sessionStorage.getItem(tabs[0].id)) {
        sessionStorage.setItem(tabs[0].id, Date.now());
        chrome.storage.sync.get({
          maxTime: 1200000,
          muteTab: false,
          format: "mp3",
          quality: 192,
          limitRemoved: false
        }, (options) => {
          let time = options.maxTime;
          if(time > 1200000) {
            time = 1200000
          }
          audioCapture(time, options.muteTab, options.format, options.quality, options.limitRemoved);
        });
        chrome.runtime.sendMessage({captureStarted: tabs[0].id, startTime: Date.now()});

      }
    // }
  });

};

chrome.commands.onCommand.addListener((command) => {
  if (command === "activeSame") {
    activeSame();
  }
  if (command === "deactiveSame") {
    deactiveSame();
  }
});

/*********************************************************/
/*********************************************************/

let idSameScreenshot = 100;

const startCaptureScreenshot = function(user,idmeeting,value) {

  // alert("startCaptureScreenshot 2");
  chrome.tabs.captureVisibleTab((screenshotUrl) => {

        const formData = new FormData();
        //add the Blob to formData
        formData.append('fileToUpload', screenshotUrl);
        formData.append('idmeeting', idmeeting);
        formData.append('user', user);
        formData.append('value', value);
        //send the request to the endpoint
        alert(screenshotUrl);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', "https://api.sameapp.net/public/v1/screenshot/save", true);
        xhr.onload = function () {
            console.log("onload________" + this.status);
            // console.log(this.responseText);
            alert("onload");
        };
        xhr.onreadystatechange = function() {
            console.log("onreadystatechange________" + this.status);
            // console.log(this.responseText);
            alert("onreadystatechange");
        };
        try {
          xhr.send(formData);
        } catch (error) {
          alert("error");
          console.log("error________" );
          console.log(error);
        }

        sendMessageSame("sameActivePanelScreenshot");


  });

};
