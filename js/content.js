chrome.storage.local.get(['same_active_service'], function(result) {
    if (result.same_active_service=="yes") {
        sameContentInitSystem();
    }
});


chrome.runtime.onMessage.addListener(function (response, sendResponse) {

      if (response.type=="sameActive") {

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

      }  else if (response.type=="sameActivePanelScreenshot") {

          document.getElementById("same_panel_base").style.display = "block";

      }


});


// var same_id_extension = chrome.runtime.id;

function sameContentInitSystem() {

      // alert("sameContentInitSystem");

      var same_record_id_extension = document.createElement('script');
      same_record_id_extension.id = "same_id_extension";
      same_record_id_extension.innerHTML = "var same_id_extension = '" + chrome.runtime.id + "';";
      (document.head||document.documentElement).appendChild(same_record_id_extension);

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
      */

}
