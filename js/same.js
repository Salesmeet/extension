/* funzione per pulire il codice HTML iniettato nella pagina - per potere evitare errori trusted con MEET o TEAMS*/

// var same_id_extension = "jinjngkjbcaedjmllefbghfodplfngeh";



var same_domain_api = "https://api.sameapp.net";
var same_domain = "https://plugin.sameapp.net";
var same_id_meeting = "";
function sameGetIdMeeting() { return same_id_meeting; }
function sameSetIdMeeting( value ) { same_id_meeting = value; }
function sameGetLanguage() { return "en"; }
var same_id_user = "";
function sameGetUser() { return same_id_user; }
function sameSetUser( value ) { same_id_user = value; }
function sameGetDatePage() { return encodeURIComponent(window.location.href); }
var samePanelSelected = "";
var samePositionSelected = "right";
var samePanelNoteLarge = "";
function sameSetPanelSelected( value ) { samePanelSelected = value; }
var same_shortcut_list = "";
function sameGetShortcutList() { return same_shortcut_list; }
function sameSetShortcutList( value ) { same_shortcut_list = value; sameCreateNoteShortcut(); sameCreatePanelShortcut(); }

/****** PANEL DESIGN ************************************************/
var same_panel_recording_button = '\
<div class="same_recording_internal">\
<button id="same_function_note_button_vertical" class="same_hidden_vertical same_hidden_deactive" >Note</button>\
<button id="same_function_note_big_button_vertical" class="same_resize_img same_icon_style same_hidden_vertical same_hidden_deactive" title="Enlarge notes field"> </button>\
<button id="same_function_note_small_button_vertical" style="" class="same_resize_img same_icon_style same_hidden_vertical same_hidden_deactive" title="Secrease note field"> </button>\
</div>\
<div class="same_recording_internal"><button id="same_screenshot_button" class="same_icon_style" title="Screenshot"> </button><hr class="same_hidden"></div>\
<div class="same_recording_internal"><button id="same_record_button" class="same_record_button same_icon_style" title="Record"> </button>\
<button id="same_stop_button" class="same_stop_button same_icon_style" title="Save"> </button>\
<button id="same_cancel_button" class="same_cancel_button same_icon_style" title="Cancel"> </button>\
<hr class="same_hidden"></div>\
<div id="same_count_hour_default" class="same_recording_internal">Meeting timer <label id="same_minutes_default">00</label>:<label id="same_seconds_default">00</label></div>\
';

var same_panel_rapid_command = '<div id="same_rapid_command" style="float:left;"></div>';

var same_panel_note = '<div id="same_note" style="display:none">' + same_panel_rapid_command + '<div id="same_note_text_div" style="float:left;"><iframe src="" id="same_note_text_iframe"></iframe></div></div>'; //  <textarea id="same_note_text"></textarea> <div contenteditable="true" id="same_note_text"><a href="" target="blank">zzzz</a></div>

var same_panel_shortcut = '<div id="same_shortcut" style="display:none"></div>';

// <button id="same_function_meeting_attachments_button" class="same_buttom_img">Attachments</button> \
var same_panel_data_meeting = '\
<div id="same_data_meeting" style="display:none">\
<button id="same_function_meeting_data_button" class="same_buttom_img">Summary</button> \
<button id="same_function_agenda_data_button" class="same_buttom_img">Agenda</button> \
<button id="same_function_participant_list_button" class="same_buttom_img">Participant list</button> \
<button id="same_function_screenshot_button" class="same_buttom_img">Screenshot list</button> \
<button id="same_function_records_button" class="same_buttom_img">Records list</button> \
<button id="same_function_meeting_notes_button" class="same_buttom_img">Note list</button> \
</div>';

var same_panel_all_meeting = '\
<div id="same_all_meeting" style="display:none">\
<button id="same_function_all_logout_button">Logout</button> \
<button id="same_function_all_meeting_calendar_button">Appointment calendar</button> \
<button id="same_function_all_meeting_new_button">New meeting</button> \
<button id="same_function_all_meeting_open_in_same_button">Open meeting in SAME</button> \
</div>';

var same_panel_setting = '<div id="same_setting" style="display:none"></div>';

var same_panel_common = '<div id="same_common" style="display:none"></div>';

var same_panel_recording = '<div id="same_recording" class="same_panel_style same_panel_style_border">' + same_panel_recording_button + '</div>';

// same_button_no_border
var same_panel_tools = '\
  <div id="same_tools" class="same_panel_style same_panel_style_border">\
  <button id="same_function_note_button" class="same_hidden">Note</button> \
  <button id="same_function_note_big_button" class="same_resize_img same_icon_style same_hidden" title="Enlarge notes field"> </button>\
  <button id="same_function_note_small_button" class="same_resize_img same_icon_style same_hidden" title="Secrease note field"> </button>\
  <button id="same_function_shortcut_button" class="same_resize_img same_icon_style same_hidden" title="Shortcuts"> </button>\
  <hr class="">\
  <button id="same_function_data_meeting_button">Data meeting</button><hr class="same_hidden">\
  <button id="same_function_data_report_meeting_button">Export</button>\
  <button id="same_function_data_report_meeting_edit_plus_button">Edit plus</button><hr class="same_hidden">\
  <button id="same_function_data_meeting_template_button">Template</button>\
  <button id="same_function_same_settimg_button">Setting</button>\
  </div>';

var same_panel_edit_external = '<div style="display:none;" id="same_panel_edit_external">\
<iframe src="" id="same_panel_edit_external_iframe"></iframe>\
</div>';

var same_panel_init_after_note = '<div style="display:none;" id="same_panel_init_after_note">\
Meeting already active. There are saved notes.<br><br> \
Do you want to proceed with the recovery? <br><br>\
<button id="same_function_open_note_version_button">Open list version</button>\
</div>';

var same_panel_operation = '<div id="same_panel" class="same_panel_style same_panel_style_border">' + same_panel_shortcut + same_panel_note + same_panel_edit_external + same_panel_setting + same_panel_data_meeting + same_panel_all_meeting + same_panel_common + same_panel_init_after_note + '</div>';

var same_panel_info = '<div id="same_info" class="same_panel_style">\
<center>\
<button id="same_function_stop_hour_button" style="display:none;">Stop timer</button>\
<button id="same_function_start_short_hour_button" style="display:none;">Resume</button>\
<button id="same_function_clear_hour_button" style="display:none;">Clear</button>\
<button id="same_function_start_hour_button">Start timer action</button>\
<hr>\
<div id="same_count_hour"><label id="same_minutes">00</label>:<label id="same_seconds">00</label></div>\
<hr>\
<button id="same_function_icon_button" class="same_icon_style" title="Zoom out"></button>\
<button id="same_function_top_button" class="same_icon_style" title="Position top"></button>\
<button id="same_function_bottom_button" class="same_icon_style" title="Position bottom"></button>\
<button id="same_function_right_button" class="same_icon_style" title="Position right"></button>\
<!--button id="same_function_setting_button" class="same_icon_style" title="Setting"></button-->\
</center>\
</div>';

function sameEscapeHTMLPolicy( value ) {
    if (window.location.href.indexOf("teams.microsoft") != -1) {
        return value ;
    } else {
        var escapeHTMLPolicy = trustedTypes.createPolicy("forceInner", {
            createHTML: (to_escape) => to_escape
        })
        return escapeHTMLPolicy.createHTML( value );
    }
}

/****** PANEL INIT  ************************************************/

/* Inizializza SAME creando l'immagine drag come primo step per il cliente */
function sameInit() {
    var same_init = '<img id="same_init_img" alt="Open" src="' + same_domain + '/logo.png"><div id="same_initheader">Click here to move</div>';
    var same_elemDiv = document.createElement('div');
    same_elemDiv.id = "same_init";
    same_elemDiv.innerHTML = sameEscapeHTMLPolicy(same_init);
    // same_elemDiv.style = "background: #FFFFFF;bottom: 110px;position: absolute;width: 150px;height: 75px;z-index: 99990;border: 1px solid #000";
    document.body.appendChild(same_elemDiv);
    sameClickCommon( "same_init_img" , sameInitHidden );
    sameDragElement(document.getElementById("same_init"));

}

/* Nasconde immagine SAME e apre il pannello di lavoro */
var sameInitMeeting = false;
function sameInitHidden() {
    if (sameGetUser()=="") {
      sameLogin();
    } else {
      sameDisplayCommon("same_init","none");
      if (sameGetIdMeeting()=="") {
          sameGetIdMeetingByUrl();
      } else {
          if (!sameInitMeeting) {
             initSameMeeting();
             sameStartHourDefault();
             document.getElementById("same_note_text_iframe").src = same_domain + '/v1/editor.php?idmeeting=' + sameGetIdMeeting() + '&lang=' + sameGetLanguage() + "&user=" + sameGetUser();
             if (samePositionSelected == "right") {
               sameMovePanelRight();
               sameNoteBigVertical();
             }
          }
          sameInitMeeting = true;
          sameDisplayCommon("same_panel_base","block");
      }
    }
}

/* Nasconde il pannello di lavoro e apre immagine SAME */
function sameInitShow() {
    sameDisplayCommon("same_init","block");
    sameDisplayCommon("same_panel_base","none");
}
/* Inizializza il pannello di lavoro */
function sameInitPanel() {
    var same_elemDiv = document.createElement('div');
    same_elemDiv.id = "same_panel_base";
    same_elemDiv.innerHTML = sameEscapeHTMLPolicy(same_panel_recording + same_panel_tools + same_panel_operation + same_panel_info);
    document.body.appendChild(same_elemDiv);
    // init recupero i dati del mmeting ...
    sameGetAPI(same_domain_api + "/public/v1/meeting/init/" ,"sameInitAfter", "sameInitAfter");
}

/* Apre il popup per inserire un id del meeting o crearne uno */
function sameGetIdMeetingByUrl() {
    var data = new FormData();
    data.append('page', window.location.href);
    data.append('lang', sameGetLanguage());
    data.append('user', sameGetUser());
    var xhr = new XMLHttpRequest();
    xhr.open('POST', same_domain_api + "/public/v1/meeting/url", true);
    xhr.onload = function () {
        var myArr = JSON.parse(this.responseText);
        if (myArr.id!="") {
            sameSetIdMeeting(myArr.id);
            sameInitHidden();
        } else {
            sameNewMeeting();
        }
    };
    try {
      xhr.send(data);
    } catch (error) {
    }
}
/* apre iframe per creare un nuvo meeting */
function sameNewMeeting() {
    var same_new_meeting = '<iframe src="'+ same_domain + '/v1/newmeeting.php?lang=' + sameGetLanguage() + '&user=' + sameGetUser() + '&url=' + sameGetDatePage() + '" id="same_new_meeting_iframe"></iframe>';
    var same_elemDiv = document.createElement('div');
    same_elemDiv.id = "same_new_meeting";
    same_elemDiv.innerHTML = sameEscapeHTMLPolicy(same_new_meeting);
    document.body.appendChild(same_elemDiv);
}


/******* DA QUI CORRADO ******/
function sameInitAfter( data ) {
    var myArr = JSON.parse(data);
    sameGetAPI(same_domain_api + "/public/v1/shortcut/type/" ,"sameShortcutList", "sameShortcutList");
    if (myArr.init!="") {
        /* apre funzione recupero note */
        // console.log("non init");
        sameDisplayCommon( "same_panel_init_after_note" , "block" );
    } else {
        // console.log("init");
        myTimeout = setTimeout(sameGetDataMeeting, 200);
    }
}


/* funzioni per rendere l'immagine SAME draggabile */
function sameDragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
/****** PANEL Note  ************************************************/

/* scrive il valore nello WYSIWYG HTML */
function sameSetNoteValue( value ) {
  samePostMessageNote( value, "sameWrite" );
}

function sameGetIframeTiny()  {
    return document.getElementById("same_note_text_iframe");
}

/* ritorna il tempo da inserire correlato con le funzioni rapide */
function same_getTimeNote() {
   if (same_timer_flag) {
      // return sameACapoCharacter + "[" + same_getTime() + "]";
      return same_getTime();
   }
   return "";
}
/* ritorna il tempo da inserire correlato con le funzioni rapide */
function same_getTimeShortcut() {
    var temp = same_getTimeNote();
    if (temp==""){
        return "";
    }
    return same_getTimeNote() + sameACapoCharacter;
}
/* ingrandisce WYSIWYG HTML */
function sameNoteBig() {
      sameChangePanelNote();
      sameNoteBigCommon();
}

function sameNoteBigVertical() {
  samePanelNoteLarge = "";
  element = document.getElementById("same_note_text_iframe");
  element.classList.add("same_note_text_iframe_right_big");
}
function sameNoteSmallVertical() {
  samePanelNoteLarge = "small";
  element = document.getElementById("same_note_text_iframe");
  element.classList.remove("same_note_text_iframe_right_big");
}

/* ingrandisce WYSIWYG HTML */
function sameNoteBigCommon() {
      samePanelNoteLarge = "";
      sameNoteChangeHeight();
      element = document.getElementById("same_note_text_iframe");
      if (samePositionSelected=="right") {

      } else if (samePositionSelected=="bottom") {
          element.classList.add("same_note_text_big_bottom");
      } else {
          element.classList.add("same_note_text_big_top");
      }
}
function sameNoteChangeHeight() {
      samePostMessageNote( "", "changeHeight" );
}

function samePostMessageNote( value, action ) {
      sameGetIframeTiny().contentWindow.postMessage( {"value":value,"action":action} , '*');
}

/* rimpicciolisce WYSIWYG HTML */
function sameNoteSmall() {
      samePanelNoteLarge = "small";
      sameChangePanelNote();
      sameNoteChangeHeight();
      element = document.getElementById("same_note_text_iframe");
      element.classList.remove("same_note_text_big_bottom");
      element.classList.remove("same_note_text_big_top");
}


/****** TIMER DEFAULT  ************************************************/
/****** PANEL START & HOUR  ************************************************/

var same_minutesLabel = "";
var same_secondsLabel = "";
var same_totalSeconds = 0;

var sameDefaulTotalSeconds = 0;
var same_minutesLabel_default = "";
var same_secondsLabel_default = "";

function sameStartHourDefault() {
     if (sameDefaulTotalSeconds==0) {
         same_minutesLabel_default = document.getElementById("same_minutes_default");
         same_secondsLabel_default = document.getElementById("same_seconds_default");
         const d = new Date();
         var temp = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "-" + d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds();
         samePostAPI(temp,"sameStartHourDefault")
         setInterval(sameStartHourDefaultSetTime, 1000);
     }
}
function sameStartHourDefaultSetTime() {
    ++sameDefaulTotalSeconds;
    same_secondsLabel_default.innerHTML = sameEscapeHTMLPolicy(same_pad(sameDefaulTotalSeconds % 60));
    same_minutesLabel_default.innerHTML = sameEscapeHTMLPolicy(same_pad(parseInt(sameDefaulTotalSeconds / 60)));
}


function same_getTime() {
   try {
      if (same_minutesLabel.innerHTML!==undefined) {
        return same_minutesLabel.innerHTML + ":" + same_secondsLabel.innerHTML;
      } else {
        return "";
      }
   } catch (error) {
      return "";
   }

}
function same_setTime() {
  ++same_totalSeconds;
  same_secondsLabel.innerHTML = sameEscapeHTMLPolicy(same_pad(same_totalSeconds % 60));
  same_minutesLabel.innerHTML = sameEscapeHTMLPolicy(same_pad(parseInt(same_totalSeconds / 60)));
}
function same_pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}
var same_timer;
var same_timer_flag = false;
function sameStartHour() {
    samePostAPI(same_totalSeconds,"sameStartHour");
    same_minutesLabel = document.getElementById("same_minutes");
    same_secondsLabel = document.getElementById("same_seconds");
    same_timer_flag = true;
    same_timer = setInterval(same_setTime, 1000);
    sameDisplayCommon("same_function_start_hour_button","none");
    sameDisplayCommon("same_function_start_short_hour_button","none");
    sameDisplayCommon("same_function_stop_hour_button","block");
    sameDisplayCommon("same_function_clear_hour_button","block");
}
function sameStopHour() {
    samePostAPI(same_totalSeconds,"sameStopHour");
    same_timer_flag = false;
    sameDisplayCommon("same_function_stop_hour_button","none");
    sameDisplayCommon("same_function_start_short_hour_button","block");
    clearInterval(same_timer);
}
function sameClearHourAsk() {
    var temp = 'Do you want to reset timer?\
    <button id="same_function_clear_yes">YES</button>\
    <button id="same_function_clear_no">NO</button>\
    ';
    sameCommonBlock( temp );
    sameClickCommon( "same_function_clear_yes" , sameClearTimerYes );
    sameClickCommon( "same_function_clear_no" , sameClearTimerNo );
}
function sameClearTimerYes() {
    sameClearHour();
    sameCommonBlock( "" );
}
function sameClearTimerNo() {
    sameCommonBlock( "" );
}
function sameClearHour() {
    samePostAPI(same_totalSeconds,"sameClearHour");
    clearInterval(same_timer);
    same_totalSeconds = 0;
    same_secondsLabel.innerHTML = sameEscapeHTMLPolicy("00");
    same_minutesLabel.innerHTML =  sameEscapeHTMLPolicy("00");
    sameDisplayCommon("same_function_start_hour_button","block");
    sameDisplayCommon("same_function_start_short_hour_button","none");
    sameDisplayCommon("same_function_stop_hour_button","none");
    sameDisplayCommon("same_function_clear_hour_button","none");
}

/****** PANEL FUNCTION  ************************************************/

/* gestisce il cambio di visualizzazione dei pannelli */
function sameChangePanel(note,shortcut,setting,common,datameeting,allmeeting) {

      sameSelectedButtoCommon( "same_function_note_button" , note );
      sameSelectedButtoCommon( "same_function_note_button_vertical" , note );
      sameDisplayCommon("same_note",note);

      sameSelectedButtoCommon( "same_function_shortcut_button" , shortcut );
      sameDisplayCommon("same_shortcut",shortcut);

      sameDisplayCommon("same_setting",setting);

      sameSelectedButtoCommon( "same_function_data_meeting_button" , datameeting );
      sameDisplayCommon("same_data_meeting",datameeting);

      sameSelectedButtoCommon( "same_function_same_settimg_button" , allmeeting );
      sameDisplayCommon("same_all_meeting",allmeeting);

      // pannello iniziale recupero note ... Sempre in none.
      sameDisplayCommon("same_panel_init_after_note","none");
      sameDisplayCommon("same_common",common);

}
/* gestisce il colore dei bottoni in base alla visualizzazione dei pannelli */
function sameSelectedButtoCommon( id_element , display ) {
      element = document.getElementById(id_element);
      if (display=="none") {
        element.classList.remove("same_panel_bottone_active");
      } else {
        element.classList.add("same_panel_bottone_active");
      }
}
/* attiva il pannello note creando WYSIWYG HTML */
var sameFlagInitNote = false;
function sameChangePanelNote() {
      if (sameFlagInitNote==false) {
          sameFlagInitNote = true;
          sameNoteBigCommon();
      }
      sameChangePanel("block","none","none","none","none","none");
}

/* crea dinamicamente da sameGetShortcutList la lista di bottoni dei tasti rapidi */
function sameCreateNoteShortcut() {
      var temp = sameGetShortcutList();
      var myArr = JSON.parse( temp );
      var myItems = myArr.items;
      var out = "";
      // for(i = 0; i < myItems.length; i++) {
      for(i = 0; i < 4; i++) {
          var img = myItems[i].img ;
          if  (img=="") {
              img = same_domain + "/v1/img/no-img.png";
          }
          var style = "background-image: url('" + img + "') !important;";
          // out += '<button onclick="sameRapidShortcutList(\'' + myItems[i].value + '\',\'' + myItems[i].call + '\');" class="same_resize_img same_icon_style" style="' + style + '"></button>';
          out += '<button data-value="' + myItems[i].value + '" data-call="' + myItems[i].call + '" class="sameRapidShortcutList same_resize_img same_icon_style" style="' + style + '"></button>';
      }
      out += '<button id="same_function_shortcut_short_button" class="same_resize_img same_icon_style" title="Shortcuts"> </button>';
      document.getElementById("same_rapid_command").innerHTML = sameEscapeHTMLPolicy( out );
      sameClickCommonClass( "sameRapidShortcutList" , sameRapidShortcutList, "click" );
      sameClickCommon( "same_function_shortcut_short_button" , sameChangePanelShortcut );
}
function sameCreatePanelShortcut() {
      var temp = sameGetShortcutList();
      var myArr = JSON.parse( temp );
      var myItems = myArr.items;
      var out = "";
      var outHelp = "<table><tr><td style='width:70px;'><b>Shortcut</b></td><td><b>Value</b></td></tr>";
      outHelp += "<tr><td>@</td><td>Partecipant</td></tr>";
      outHelp += "<tr><td>##</td><td>Agenda</td></tr>";
      for(i = 0; i < myItems.length; i++) {
          var style = "background-image: url('" + myItems[i].img + "') !important;";
          // out += '<button onclick="sameRapidShortcutList(\'' + myItems[i].value + '\',\'' + myItems[i].call + '\');" class="same_buttom_img" style="' + style + '">' + myItems[i].value + '</button>';
          out += '<button data-value="' + myItems[i].value + '" data-call="' + myItems[i].call + '" class="sameRapidShortcutList same_buttom_img" style="' + style + '">' + myItems[i].value + '</button>';
          outHelp += "<tr><td>" + myItems[i].shortcut + "</td><td>" + myItems[i].value + "</td></tr>";
      }
      document.getElementById("same_shortcut").innerHTML = sameEscapeHTMLPolicy( out );
      outHelp += "</table>";
      outHelp += '\
        <hr>\
        <button id="same_function_edit_shurtcut" class="same_icon_style" title="edit"></button>\
      ';
      document.getElementById("same_setting").innerHTML = sameEscapeHTMLPolicy( outHelp );
      sameClickCommon( "same_function_edit_shurtcut" , sameFunctionEditOpenShurtcut );
      sameClickCommonClass( "sameRapidShortcutList" , sameRapidShortcutList, "click" );
}

function sameChangePanelShortcut() {
      sameChangePanel("none","block","none","none","none","none");
}

function sameChangePanelSetting() {
      sameChangePanel("none","none","block","none","none","none");
}
function sameChangePanelDataMeeting() {
      sameChangePanel("none","none","none","none","block","none");
}
function sameChangePanelSameSetting() {
      sameChangePanel("none","none","none","none","none","block");
}
function sameChangePanelCommon() {
      sameChangePanel("none","none","none","block","none","none");
}

/****** PANEL FUNCTION comandi rapidi ************************************************/
var sameACapoCharacter = "";
function sameRapidShortcutList() {
      sameRapidShortcutListCommon(this.getAttribute('data-value') , this.getAttribute('data-call'));
}
function sameRapidShortcutListCommon(value, type) {
      sameRapidCommand(1,value,type,sameACapoCharacter);
}

function sameRapidCommand(time, value, type, start ) {
      time = same_getTimeShortcut();
      var json = {"type": type, "value": value, "timeDefault": sameDefaulTotalSeconds, "time": time};
      samePostMessageNote( json , "sameRapidCommand" );
      sameChangePanelNote();
      samePostAPI(value,type);
}

/****** PANEL FUNCTION ALL MEETING ************************************************/

function sameAllMeetingCalendar( value ) {
    sameOpenWindowCommon( "https://my.sameapp.net/" );
}

/****** PANEL FUNCTION COMMON ************************************************/

/* centralizza la scrittura all'interno del pnnello common */
function sameCommonBlock( value ) {
      document.getElementById("same_common").innerHTML = sameEscapeHTMLPolicy(value);
      sameChangePanelCommon();
}

function sameReplaceCharacters( value ) {
      if (value!=null) {
        return value.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'_');
      }
      return "";
}
/* funzione per reintempreta la scrittura dei comandi rapidi */
function sameAddValueInNote( value ){
    sameRapidCommand( 0, this.getAttribute('data-value') , this.getAttribute('data-type'), " ");
}
/* funzione per cambiare il check dei checkbox */
function sameAddValueCheck( value ){
    var checked = 0;
    if (this.checked) { checked = 1; }
    var data = new FormData();
    data.append('id', this.id);
    data.append('checked', checked );
    data.append('value', checked );
    data.append('idmeeting', sameGetIdMeeting());
    data.append('second', sameDefaulTotalSeconds);
    data.append('secondmanual', same_totalSeconds);
    data.append('user', sameGetUser());
    data.append('action', "");
    samePostAPICommon( this.getAttribute('data-url') , data);
}

/* analisi e creazione dei blocchi per la sezione "data meeting" */
function sameCommonBlockApi( value, type ) {
      var myArr = JSON.parse(value);
      var myItems = myArr.items;
      var out = "";
      var i;
      var title = "";
      var type = "";
      if (myArr.title!="") {
          title ='<b>' + myArr.title + '</b><br><br>';
      }
      for(i = 0; i < myItems.length; i++) {


        if ((myItems[i].type == 'record') || (myItems[i].type == 'screenshot')) {
            out += '<div class="">';
        } else {
            out += '<div class="sameBlockApi">';
        }

        if (myItems[i].type == 'checkbox') {
            if (myItems[i].checked == '1') { var checked = "checked"; } else { var checked = ""; }
            out += "<input class='sameAddValueCheck' data-url='" + myArr.apiupdate + "' type='checkbox' " + checked + " id='" + myItems[i].id + "'>";
        }
        var description = "";
        if (myArr.viewdescription == "1") { description = myItems[i].description + ": "; }

        if (myItems[i].type == 'link') {
            out += '<a href="' + myItems[i].value + '" target="_blank">' + description + myItems[i].value + '</a>';

        } else if (myItems[i].type == 'record') {
           type = 'record';
           if (myItems[i].name!="") {
              out += '<a href="' + same_domain_api + myItems[i].directory + myItems[i].value  + '" target="_blank">' + myItems[i].name + ' (' + myItems[i].date + ')</a>';
           } else {
              out += '<a href="' + same_domain_api + myItems[i].directory + myItems[i].value  + '" target="_blank">' + myItems[i].value + ' (' + myItems[i].date + ')</a>';
           }
         } else if (myItems[i].type == 'screenshot') {
            type = 'screenshot';
            if (myItems[i].value!="") {
               out += '<img id="' + myItems[i].id + '" class="loadingImage" data-name="' + myItems[i].name + '" style="width:100px;" src="https://plugin.sameapp.net/v1/img/placeholder.png"><br>' + myItems[i].value + ' (' + myItems[i].date + ')';
            } else {
               out += '<img id="' + myItems[i].id + '"  class="loadingImage" data-name="' + myItems[i].name + '" style="width:100px;" src="https://plugin.sameapp.net/v1/img/placeholder.png"><br>' + myItems[i].name + ' (' + myItems[i].date + ')';
            }
        } else {

            out += description + myItems[i].value;
        }
        out += ' <button id="' + myItems[i].id + 'button" data-object="' + myItems[i].type + '" data-type="' + type + '" data-value="' + sameReplaceCharacters( myItems[i].value ) + '" class="sameAddValueInNote same_resize_small_img same_icon_style" title="Add note"></button>';
        out += "</div>";

      }

      if (myArr.edit!="") {
        out = '\
          <div id="same_data_meeting_edit">\
          <button data-type="' + myArr.edit + '" id="same_function_edit" class="same_icon_style" title="edit"></button>\
          </div>\
          <div id="same_data_meeting_body">' + title + out + '</div>\
        ';

        document.getElementById("same_common").innerHTML = sameEscapeHTMLPolicy(out);
        sameClickCommon( "same_function_edit" , sameFunctionEditOpen );

      } else {
        out = '<div style="float:left;" id="same_data_meeting_body">' + title + out + '</div>';
        document.getElementById("same_common").innerHTML = sameEscapeHTMLPolicy(out);
      }

      sameClickCommonClass( "sameAddValueInNote" , sameAddValueInNote , "click" );
      sameClickCommonClass( "sameAddValueCheck" , sameAddValueCheck , "click" );
      sameChangePanelCommon();

      if (type=="screenshot") {
          myTimeout = setTimeout( sameGetImageScreenshot, 300);
      }


}

function sameGetImageScreenshot() {

    var userSelection =  document.getElementsByClassName("loadingImage");
    for(var i = 0; i < userSelection.length; i++) {
      (function(index) {
        // console.log(userSelection[index]);
        // console.log(userSelection[index].getAttribute('data-name'));
        sameGetAPI(same_domain_api + "/public/v1/screenshot/getFile/" + userSelection[index].getAttribute('data-name') + "/", userSelection[index].id , "sameGetImageScreenshotInsert");
      })(i);
    }
}

function sameGetImageScreenshotInsert( value, idObject ) {
    var myArr = JSON.parse(value);
    document.getElementById(idObject + "button").setAttribute('data-value', myArr.value);
    document.getElementById(idObject).src = myArr.value;
}

function sameGetAPI(url,type,action) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               if (action=="sameInitAfter") {
                 sameInitAfter(this.responseText);
               } else if (action=="sameShortcutList") {
                 sameSetShortcutList( this.responseText )
               } else if (action=="sameGetImageScreenshotInsert") {
                 sameGetImageScreenshotInsert( this.responseText, type )
               } else {
                 sameCommonBlockApi( this.responseText, type );
               }
           }
      };
      xhttp.open("GET", url + sameGetIdMeeting() + "/" + sameGetLanguage() + "/" + sameGetUser() , true);
      xhttp.send();
}

function samePostAPI(value,action) {
      if (value==="") {
          // ssconsole.log("Vuoto: " + action + " __ " + value);
      } else {
          // console.log("samePostAPI");
          var data = new FormData();
          data.append('value', value);
          data.append('action', action);
          data.append('second', sameDefaulTotalSeconds);
          data.append('secondmanual', same_totalSeconds);
          data.append('idmeeting', sameGetIdMeeting());
          data.append('lang', sameGetLanguage());
          data.append('user', sameGetUser());
          samePostAPICommon( same_domain_api + '/public/v1/action',data);
      }
}
/* salva i dati provenienti dallo WYSIWYG HTML */
function samePostAPINote() {
      samePostMessageNote( "", "saveNote" );
}

function samePostAPICommon(url,data) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      xhr.onload = function () {
          // console.log(this.responseText);
      };
      try {
        xhr.send(data);
      } catch (error) {
      }
}
function sameInProgress(url) {
    sameCommonBlock("Section in progress ...");
}
function sameOpenWindowCommon( value ) {
    window.open(value);
}
function sameDisplayCommon( id , value ) {
  if (value == "block") {
    sameSetPanelSelected( id );
  }
  document.getElementById(id).style.display = value;
}
function sameClickCommon( id , name_funcition ) {
      try {
        document.getElementById(id).addEventListener("click", name_funcition);
      } catch (error) {
      }
}
function sameClickCommonClass( id , name_funcition, action ) {
    var userSelection =  document.getElementsByClassName(id);
    for(var i = 0; i < userSelection.length; i++) {
      (function(index) {
        userSelection[index].addEventListener( action , name_funcition);
      })(i);
    }
}

/****** PANEL FUNCTION TEMPLATE ************************************************/
function sameFunctionOpenTemplate() {
    samePostAPINote();
    sameChangePanelNote();
    sameFunctionOpenTemplateCommon( "" );
}
function sameFunctionOpenTemplateCommon( init ) {
    sameFunctionOpenCommon(same_domain + "/v1/gettemplate.php?idmeeting=" + sameGetIdMeeting() + "&init=" + init);
}

/****** PANEL FUNCTION EDIT ************************************************/
function sameFunctionEditOpen() {
    var type = document.getElementById("same_function_edit").getAttribute('data-type')
    sameFunctionOpenCommon(same_domain + "/v1/getmeeting.php?idmeeting=" + sameGetIdMeeting() + "&type=" + type + "&lang=" + sameGetLanguage() + "&user=" + sameGetUser() );
}
function sameFunctionEditOpenShurtcut() {
    sameFunctionOpenCommon(same_domain + "/v1/getshurcut.php?idmeeting=" + sameGetIdMeeting() + "&lang=" + sameGetLanguage() + "&user=" + sameGetUser() );
}
function sameFunctionOpenNoteVersion() {
    sameChangePanelNote();
    sameFunctionOpenCommon(same_domain + "/v1/getnoteversion.php?idmeeting=" + sameGetIdMeeting() + "&lang=" + sameGetLanguage() + "&user=" + sameGetUser() );
}
function sameFunctionOpenReport() {
    if (sameFlagInitNote==false) {
      sameChangePanelNote();
    } else {
      samePostAPINote();
    }
    sameFunctionOpenCommon(same_domain + "/v1/getreport.php?idmeeting=" + sameGetIdMeeting() + "&lang=" + sameGetLanguage() + "&user=" + sameGetUser()  );
}
function sameFunctionOpenCalendar() {
    sameFunctionOpenCommon(same_domain + "/v1/getcalendar.php?idmeeting=" + sameGetIdMeeting() );
}
function sameFunctionOpenCommon(url) {

    var element = document.getElementById("same_panel_edit_external");
    if (samePositionSelected=="right") {
         console.log("sameFunctionOpenCommon __  right");
    } else if (samePositionSelected=="bottom") {
    // if (same_position_bottom) {
         element.classList.add("same_panel_edit_external_bottom");
    } else {
         element.classList.add("same_panel_edit_external_top");
    }
    sameDisplayCommon( "same_panel_edit_external","block");
    document.getElementById("same_panel_edit_external_iframe").src = url;
    sameClickCommon( "same_panel_edit_external_close" );
}

function sameFunctionEditClose() {
    document.getElementById("same_panel_edit_external_iframe").src = "";
    sameDisplayCommon( "same_panel_edit_external","none");

}

/****** PANEL FUNCTION CALL API ************************************************/
function sameGetParticipantList() {
    sameGetAPI(same_domain_api + "/public/v1/partecipants/" ,"participant", "");
}
function sameGetDataMeeting() {
    sameGetAPI(same_domain_api + "/public/v1/meeting/" ,"data", "");
}
function sameGetAgenda() {
    sameGetAPI(same_domain_api + "/public/v1/agenda/" ,"agenda", "");
}
function sameGetAttachments() {
    sameGetAPI(same_domain_api + "/public/v1/attachements/" ,"attachments", "");
}
function sameGetRecords() {
    sameGetAPI(same_domain_api + "/public/v1/record/all/" ,"records", "");
}
function sameGetScreenshot() {
    sameGetAPI(same_domain_api + "/public/v1/screenshot/all/" ,"screenshot", "");
}

/****** PANEL FUNCTION SETTING ************************************************/
function sameMovePanelTop() {
      sameNoteSmallVertical();
      samePositionSelected = "top";
      sameMovePanelDeleteRight();
      document.getElementById("same_panel_base").style.top = "0px";
      document.getElementById("same_panel_base").style.bottom = "auto";
      sameNoteSmall();
      if (samePanelNoteLarge == "") {
        sameNoteBig();
      }
}
function sameMovePanelBottom() {
      sameNoteSmallVertical();
      samePositionSelected = "bottom";
      // sameNoteSmall();
      if (samePanelNoteLarge == "") {
        sameNoteBigCommon();
      }
      sameMovePanelDeleteRight();
      document.getElementById("same_panel_base").style.top = "auto";
      document.getElementById("same_panel_base").style.bottom = "0px";
}
function sameMovePanelRight() {

      document.getElementById("same_panel_base").classList.add("same_panel_base_right");
      document.getElementById("same_recording").classList.add("same_panel_right");
      document.getElementById("same_tools").classList.add("same_panel_right_tools");
      document.getElementById("same_panel").classList.add("same_panel_panel_right");
      document.getElementById("same_info").classList.add("same_info_right");
      document.getElementById("same_common").classList.add("same_common_right");
      document.getElementById("same_note_text_iframe").classList.add("same_note_text_iframe_right");
      document.getElementById("same_panel_edit_external").classList.add("same_panel_edit_external_right");
      document.getElementById("same_rapid_command").classList.add("same_rapid_command_right");

      var hrselec_vertical =  document.getElementsByClassName("same_hidden_vertical");
      for(var i = 0; i < hrselec_vertical.length; i++) {
          hrselec_vertical[i].classList.remove("same_hidden_deactive");
      }
      var hrselec =  document.getElementsByClassName("same_hidden");
      for(var i = 0; i < hrselec.length; i++) {
          hrselec[i].classList.add("same_hidden_deactive");
      }
      var hrselec_rec =  document.getElementsByClassName("same_recording_internal");
      for(var i = 0; i < hrselec_rec.length; i++) {
          hrselec_rec[i].classList.add("same_recording_internal_right");
      }

      let height = window.innerHeight - 215;
      document.getElementById("same_panel").style.height = height + "px";
      document.getElementById("same_note_text_iframe").style.height = (height - 50) + "px";
      document.getElementById("same_panel_edit_external_iframe").style.height = "98%";

      sameNoteBigCommon();
      samePositionSelected = "right";
}

function sameMovePanelDeleteRight() {
      document.getElementById("same_panel_base").classList.remove("same_panel_base_right");
      document.getElementById("same_recording").classList.remove("same_panel_right");
      document.getElementById("same_tools").classList.remove("same_panel_right_tools");
      document.getElementById("same_panel").classList.remove("same_panel_panel_right");
      document.getElementById("same_info").classList.remove("same_info_right");
      document.getElementById("same_common").classList.remove("same_common_right");
      document.getElementById("same_note_text_iframe").classList.remove("same_note_text_iframe_right");
      document.getElementById("same_panel_edit_external").classList.remove("same_panel_edit_external_right");
      document.getElementById("same_rapid_command").classList.remove("same_rapid_command_right");

      var hrselec_vertical =  document.getElementsByClassName("same_hidden_vertical");
      for(var i = 0; i < hrselec_vertical.length; i++) {
          hrselec_vertical[i].classList.add("same_hidden_deactive");
      }
      var hrselec =  document.getElementsByClassName("same_hidden");
      for(var i = 0; i < hrselec.length; i++) {
          hrselec[i].classList.remove("same_hidden_deactive");
      }
      var hrselec_rec =  document.getElementsByClassName("same_recording_internal");
      for(var i = 0; i < hrselec_rec.length; i++) {
          hrselec_rec[i].classList.remove("same_recording_internal_right");
      }

      document.getElementById("same_panel").style.height = "100%";
      document.getElementById("same_note_text_iframe").style.height = "135px";
      document.getElementById("same_panel_edit_external_iframe").style.height = "100%";

}

/****** AUTH  ************************************************/
function sameLogin() {
  var same_login = '<iframe src="'+ same_domain + '/v1/auth/auth.php?lang=' + sameGetLanguage() + '&url=' + sameGetDatePage() + '" id="same_login_iframe"></iframe>';
  var same_elemDiv = document.createElement('div');
  same_elemDiv.id = "same_login";
  same_elemDiv.innerHTML = sameEscapeHTMLPolicy(same_login);
  document.body.appendChild(same_elemDiv);
}
function sameLogout() {
  var same_loguot = '<iframe src="'+ same_domain + '/v1/auth/logout.php?lang=' + sameGetLanguage() + '&url=' + sameGetDatePage() + '" id="same_logout_iframe"></iframe>';
  var same_elemDiv = document.createElement('div');
  same_elemDiv.id = "same_loguot";
  same_elemDiv.innerHTML = sameEscapeHTMLPolicy(same_loguot);
  document.body.appendChild(same_elemDiv);
  // sameDisplayCommon( "same_loguot" , "none" );
  sameInitShow();
}

/****** INIT  ************************************************/
function initSame() {
  sameInit();
}
function initSameMeeting() {

  sameInitPanel();

  sameClickCommon( "same_function_note_big_button" , sameNoteBig );
  sameClickCommon( "same_function_note_big_button_vertical" , sameNoteBigVertical );
  sameClickCommon( "same_function_note_small_button" , sameNoteSmall );
  sameClickCommon( "same_function_note_small_button_vertical" , sameNoteSmallVertical );

  sameClickCommon( "same_function_start_hour_button" , sameStartHour );
  sameClickCommon( "same_function_start_short_hour_button" , sameStartHour );
  sameClickCommon( "same_function_stop_hour_button" , sameStopHour );

  sameClickCommon( "same_function_clear_hour_button" , sameClearHourAsk );

  sameClickCommon( "same_function_note_button" , sameChangePanelNote );
  sameClickCommon( "same_function_note_button_vertical" , sameChangePanelNote );

  sameClickCommon( "same_function_shortcut_button" , sameChangePanelShortcut );
  sameClickCommon( "same_function_shortcut_short_button" , sameChangePanelShortcut );

  sameClickCommon( "same_function_setting_button" , sameChangePanelSetting );
  sameClickCommon( "same_function_data_meeting_button" , sameChangePanelDataMeeting );
  sameClickCommon( "same_function_same_settimg_button" , sameChangePanelSameSetting );

  sameClickCommon( "same_function_participant_list_button" , sameGetParticipantList );
  sameClickCommon( "same_function_meeting_data_button" , sameGetDataMeeting );
  sameClickCommon( "same_function_meeting_notes_button" , sameFunctionOpenNoteVersion );
  sameClickCommon( "same_function_agenda_data_button" , sameGetAgenda );
  // sameClickCommon( "same_function_meeting_attachments_button" , sameGetAttachments);
  sameClickCommon( "same_function_records_button" , sameGetRecords );
  sameClickCommon( "same_function_screenshot_button" , sameGetScreenshot );


  sameClickCommon( "same_function_all_logout_button" , sameLogout );
  sameClickCommon( "same_function_all_meeting_calendar_button" , sameAllMeetingCalendar );
  sameClickCommon( "same_function_all_meeting_new_button" , sameAllMeetingCalendar );
  sameClickCommon( "same_function_all_meeting_open_in_same_button" , sameAllMeetingCalendar );

  sameClickCommon( "same_function_top_button" , sameMovePanelTop );
  sameClickCommon( "same_function_bottom_button" , sameMovePanelBottom );
  sameClickCommon( "same_function_right_button" , sameMovePanelRight );
  sameClickCommon( "same_function_icon_button" , sameInitShow );

  sameClickCommon( "same_function_data_report_meeting_button" , sameFunctionOpenReport );
  sameClickCommon( "same_function_data_report_meeting_edit_plus_button" , sameFunctionOpenReport );

  sameClickCommon( "same_function_data_meeting_template_button" , sameFunctionOpenTemplate );

  sameClickCommon( "same_screenshot_button" , initScreenshotsSameExension )
  sameClickCommon( "same_function_open_note_version_button" , sameFunctionOpenNoteVersion )

  document.getElementById("same_note_text_iframe").addEventListener("mouseout", samePostAPINote);
  window.onblur = function() {
     samePostAPINote();
  };

  sameInitRecord();

}

/****** Chiamate dall'IFRAME  ************************************************/
if (window.addEventListener) {
    window.addEventListener("message", onMessage, false);
}
else if (window.attachEvent) {
    window.attachEvent("onmessage", onMessage, false);
}
function onMessage(event) {
    // Check sender origin to be trusted
    if ( (event.origin !== same_domain_api) && (event.origin !== same_domain)) {
      return;
    }
    var data = event.data;
    if (typeof(window[data.func]) == "function") {
        window[data.func].call(null, data.message);
    }
}
// Function to be called from iframe

var sameNameTemplate = "";
function sameTemplateChoise(message) {
    sameNameTemplate = message;
    samePostAPI(message,"sameTemplateChoise");
}
function sameSaveParentNote(message) {
    sameChangePanelNote();
    sameSaveParentCommon(message);
}
function sameTemplateCloseParent(message) {
    sameFunctionEditClose();
}
function sameTemplateCloseParentGetAgenda(message) {
    sameGetAgenda();
    sameFunctionEditClose();
}
function sameTemplateCloseParentGetParticipantList(message) {
    sameGetParticipantList();
    sameFunctionEditClose();
}
function sameTemplateSaveParent(message) {
    sameSaveParentCommon(message);
}
function sameSaveParentCommon(message) {
    samePostAPI(sameNameTemplate,"sameTemplateSaveParent");
    samePostAPINote();
    sameSetNoteValue( message );
    sameFunctionEditClose();
}
function sameCreateMeeting(message) {
    sameSetIdMeeting(message);
    sameInitPanel();
    sameInitHidden();
    sameDisplayCommon( "same_new_meeting" , "none" );
}
function sameEditorRapidCommad(message) {
    var myArr = JSON.parse( message );
    sameRapidShortcutListCommon(myArr.value, myArr.type);
}
function sameAuthOk(message) {
    sameSetUser(message);
    sameInitHidden();
    sameDisplayCommon( "same_login" , "none" );
}
/***** INIZIALIZZA SAME *****/
initSame();
