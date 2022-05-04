
/****** RECORD FUNCTION  ************************************************/

/* salva i dati per il record della registrazione audio  */
function samePostAPIRecord( url ) {
      var data = new FormData();
      data.append('file', url );
      samePostAPICommon(same_domain_api + '/api/v1/postrecord.php',data);
}

function sameInitRecord() {

  const same_record_button = document.querySelector('.same_record_button');
  const same_stop_button = document.querySelector('.same_stop_button');
  const same_cancel_button = document.querySelector('.same_cancel_button');
  const soundClips = document.querySelector('.sound-clips');
  const canvas = document.querySelector('.visualizer');
  const mainSection = document.querySelector('.main-controls');

  // disable stop button while not recording
  same_stop_button.disabled = true;
  same_cancel_button.disabled = true;

  let audioCtx;

  var sameIdUnivoco = "";

  // set up basic variables for app
  if (navigator.mediaDevices.getUserMedia) {

    let chunks = [];

    let onSuccess = function(stream) {

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start

      /* visualize(stream); */

      same_record_button.onclick = function() {


        sameIdUnivoco = Date.now()  + "_" + sameGetIdMeeting() + "_" + sameGetUser();
        initVideoSameExension(sameIdUnivoco);

        mediaRecorder.start();
        console.log(mediaRecorder.state);
        console.log("recorder started");
        same_record_button.style.background = "red";

        same_stop_button.disabled = false;
        same_cancel_button.disabled = false;
        same_record_button.disabled = true;

      }

      same_stop_button.onclick = function() {

        // alert("same_stop_button onclick");

        const options = {operation:"stopSame", user:sameGetUser(), idmeeting:sameGetIdMeeting(), type:"back", idunivoco:sameIdUnivoco};
        chrome.runtime.sendMessage( same_id_extension , options);

        // alert("same_stop_button after same_id_extension");

        mediaRecorder.stop();
        console.log(mediaRecorder.state);
        console.log("recorder stopped");
        same_record_button.style.background = "";
        same_record_button.style.color = "";
        // mediaRecorder.requestData();

        same_stop_button.disabled = true;
        same_cancel_button.disabled = true;
        same_record_button.disabled = false;


      }

      same_cancel_button.onclick = function() {

        mediaRecorder.stop();
        console.log(mediaRecorder.state);
        console.log("recorder stopped");
        same_record_button.style.background = "";
        same_record_button.style.color = "";
        // mediaRecorder.requestData();

        same_stop_button.disabled = true;
        same_cancel_button.disabled = true;
        same_record_button.disabled = false;

        const options = {operation:"cancelSame", user:sameGetUser(), idmeeting:sameGetIdMeeting(), type:"", idunivoco:sameIdUnivoco};
        chrome.runtime.sendMessage( same_id_extension ,options);

      }

      mediaRecorder.onstop = function(e) {

        let clipName = prompt('Enter a name for your record clip?','');

        if (clipName != null) {

            // const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
            const blob = new Blob(chunks, { 'type' : 'audio/wav; codecs=opus' });
            // const blob = new Blob(chunks, { 'type' : 'audio/wav; codecs=MS_PCM' });

            //the form data that will hold the Blob to upload
            const formData = new FormData();
            //add the Blob to formData
            //nformData.append('fileToUpload', blob, 'recording.mp3');
            formData.append('fileToUpload', blob, 'recording.wav');
            formData.append('idmeeting', sameGetIdMeeting() );
            formData.append('type', "microphone" );
            formData.append('name', clipName );
            formData.append('user', sameGetUser());
            // formData.append('extension', "ogg");
            formData.append('extension', "wav");
            formData.append('idunivoco', sameIdUnivoco);
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
              // alert("error________" + error);
            }

        }

      }
      mediaRecorder.ondataavailable = function(e) {
        console.log("ondataavailable");
        chunks.push(e.data);
      }

    }

    let onError = function(err) {
      console.log('The following error occured: ' + err);
    }

    const constraints = { audio: true }
    navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);

  }

}

function initVideoSameExension( sameIdUnivoco ) {
    const options = {operation:"startSame", user:sameGetUser(), idmeeting:sameGetIdMeeting(), name:"", type:"", idunivoco: sameIdUnivoco};
    console.log( options );
    chrome.runtime.sendMessage( same_id_extension ,options);
}

/*
window.onload = function() {
  sameInitRecord();
};
*/
