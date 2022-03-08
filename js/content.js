
chrome.storage.local.get(['same_active_service'], function(result) {
    if (result.same_active_service=="yes") {
        sameContentInitSystem();
    }
});

var user = "";
chrome.storage.local.get(['same_user'], function(result) {
    user = result.same_user;
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

      var same_record = document.createElement('script');
      same_record.id = "same_record";
      same_record.src = "https://plugin.sameapp.net/v1/samerecord.js";
      (document.head||document.documentElement).appendChild(same_record);

      var same_Screenshots = document.createElement('script');
      same_Screenshots.id = "same_Screenshots";
      same_Screenshots.src = "https://plugin.sameapp.net/v1/samescreenshots.js";
      (document.head||document.documentElement).appendChild(same_Screenshots);

      var same_linkTag = document.createElement ("link");
      same_linkTag.href = "https://plugin.sameapp.net/v1/same.css";
      same_linkTag.rel = "stylesheet";
      var same_head = document.getElementsByTagName ("head")[0];
      same_head.appendChild (same_linkTag);

      var same_importedJS = document.createElement('script');
      same_importedJS.id = "same_importedJS";
      same_importedJS.src = "https://plugin.sameapp.net/v1/same.js";
      (document.head||document.documentElement).appendChild(same_importedJS);

      /*
      var same_firebase_app = document.createElement('script');
      same_firebase_app.id = "same_firebase_app";
      same_firebase_app.src = "https://www.gstatic.com/firebasejs/9.6.7/firebase-app-compat.js";
      (document.head||document.documentElement).appendChild(same_firebase_app);

      var same_firebase_app_firestore = document.createElement('script');
      same_firebase_app_firestore.id = "same_firebase_app_firestore";
      same_firebase_app_firestore.src = "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore-compat.js";
      (document.head||document.documentElement).appendChild(same_firebase_app_firestore);

      /*
      var same_firebase_app_auth = document.createElement('script');
      same_firebase_app_auth.id = "same_firebase_app_auth";
      same_firebase_app_auth.src = "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth-compat.js";
      (document.head||document.documentElement).appendChild(same_firebase_app_auth);
      * /

      /*
      https://firebase.google.com/docs/web/setup
      https://firebase.google.com/docs/web/modular-upgrade#window-compat

      <script>
         const firebaseApp = firebase.initializeApp({ /* Firebase config * / });
         const db = firebaseApp.firestore();
         const auth = firebaseApp.auth();
      </script>
      * /

      alert("belloooo");
      */

}
