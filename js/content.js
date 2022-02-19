chrome.storage.local.get(['same_active_service'], function(result) {
    if (result.same_active_service=="yes") {
        sameContentInitSystem();
    }
});


chrome.runtime.onMessage.addListener(function (response, sendResponse) {

      console.log(response);
      console.log(sendResponse);

      /********* Screenshots ***********/

      if (message.name === 'stream' && message.streamId) {
      // if (message.name === 'sameStreamScreenshots' && message.streamId) {
          alert("Screenshots CONTENT.js");

          let track, canvas
          navigator.mediaDevices.getUserMedia({
              video: {
                  mandatory: {
                      chromeMediaSource: 'desktop',
                      chromeMediaSourceId: message.streamId
                  },
              }
          }).then((stream) => {

          })


      }

      /********* VIDEO ***********/

      if (response.type=="sameActive") {

            /*
            if (document.getElementById('SameDeactive')) {
                alert("SameDeactive delete");
                var elem = document.getElementById("SameDeactive");
                return elem.parentNode.removeChild(elem);
            }
            */
            if (!document.getElementById('SameActive')) {
                sameContentInitSystem();
            }

      } else if (response.type=="sameDeactive") {

            /*
            if (document.getElementById('SameActive')) {
                alert("SameActive delete");
                var elem = document.getElementById("SameActive");
                return elem.parentNode.removeChild(elem);
            }
            // if (!document.getElementById('SameDeactive')) {
                alert("SameDeactive add");
                var imported = document.createElement('script');
                imported.id = "SameDeactive";
                imported.src = "https://extension.same.it/samedeactive.js";
                (document.head||document.documentElement).appendChild(imported);
            // }
            */


      } else if (response.type=="sameSave") {

          console.log("_______sameSave");
          /*
          console.log(response.audio);
          console.log(response.format);
          const currentDate = new Date(Date.now()).toDateString();
          */
          // chrome.downloads.download({url: response.audio, filename: `${currentDate}.${response.format}`, saveAs: true});
          // chrome.downloads.download({url: response.audio, filename: "BELLA" + response.format , saveAs: true});

      } else if (response.type=="sameCancel") {

          console.log("_______sameCancel");

      }

});

function sameContentInitSystem() {

      var same_linkTag = document.createElement ("link");
      same_linkTag.href = "https://plugin.salesmeet.it/v1/same.css";
      same_linkTag.rel = "stylesheet";
      var same_head = document.getElementsByTagName ("head")[0];
      same_head.appendChild (same_linkTag);

      var same_importedJS = document.createElement('script');
      same_importedJS.id = "same_importedJS";
      same_importedJS.src = "https://plugin.salesmeet.it/v1/same.js";
      (document.head||document.documentElement).appendChild(same_importedJS);

      /*
      var same_capure = document.createElement('script');
      same_capure.id = "same_capure";
      same_capure.src = "https://plugin.salesmeet.it/v1/html2canvas.js";
      (document.head||document.documentElement).appendChild(same_capure);
      */
}
