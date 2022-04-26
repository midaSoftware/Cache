/// <reference path="libs/jquery-1.8.2.js" />
var array;
var array2;
var time = 300000;
var prevPid;
var ShortList = false;
var IsQuickSearch = false;
//setInterval(CheckUserLoggedOutByOtherUser, 60000);
var currStyle = "";
var IsJob = true;
var DateDir = 'desc';
var NameDir = 'desc';
//setInterval(GetNewCandidatesForJob, 60000);
var sec = 0;
var jobnameid = '';
var timeToShowNotificatiomMsg = 1000;
//window.onbeforeunload = confirmExit;
var lockArr = [];
function confirmExit() {
    var url1 = "/Account/LogOff/";
    $.ajax({
        url: url1,
        type: "Get"
    });
}

function pad(val) { return val > 9 ? val : "0" + val; }
setInterval(function () {
    $("#ipSeconds").html(pad(++sec % 60));
    $("#ipMinutes").html(pad(parseInt(sec / 60, 10)));
}, 1000);
function GetNewCandidatesForJob(SearchAgain) {
    var url1 = "/Notification/NewCandidateJobSearch?SearchAgain=" + SearchAgain;
    $('#NewCandidatesForJob').html('<img src="/Content/img/spinner.gif" class="loadimg" alt="">');
    $.ajax({
        url: url1,
        type: "Get",
        success: function (res) {
            $('#NewCandidatesForJob').html(res);
        }
        , error: function () {
            alert('error');
        }
    });
}


function gDisableAll(objName) {
    $(objName).disableInput();
    $(objName).prop('disabled', true);
    $(objName).addClass('disabled');
    $(objName).attr("onclick", "");
    $(objName).find("*").attr("disabled", "disabled");
    $(objName).children().each(
        function (indx) {
            if (this != undefined) {
                gDisableAll(this);
            }
            else {
                return;
            }
        }
    );
}


function gGetMassage(Currindex, IsForReadList, Direction, nextdex) {

    var IsFirstTime = 2;
    if (IsForReadList != "@") {
        if (Direction == "next") {
            nextdex++;
        }
        else {
            nextdex--;
        }
        $('.timedMassages').each(function (index) {
            if (Currindex == index) {
                var CurrentMassageTime = $(this).attr('id');
                array2 = CurrentMassageTime.split('*');
                CurrentMassageTime = array2[0];
                var TimeCreateNumeric = array2[1];
                CurrentMassageTime = CurrentMassageTime.slice(0, -3);
                var massageBody = $(this).children().attr("onclick");
                //      massageBody = gReplaceAllChars("'", "", massageBody);
                //   array = gSetMassageArray(massageBody);
                array = massageBody.split("'")
                try { $.modal.current.closeModal(); } catch (ex) { }
                OpenMessage(array[1], array[3], array[5], array[7], array[9], CurrentMassageTime, TimeCreateNumeric, this, false, Currindex, false, nextdex, IsFirstTime, array[21], array[23], array[25], array[27]);
                return false;
            }
        });
    }
    else {
        $('.unstarred').each(function (index) {
            if (Direction == "next") {
                Currindex = $(this).parent().parent().parent().nextUntil('.unstarred').attr('title');
                nextdex++;
            }
            else {
                Currindex = $(this).parent().parent().parent().prevUntil('.unstarred').attr('title');
                nextdex--;
            }
            var CurrentMassageTime = $(this).parent().parent().parent().attr('id');
            array2 = CurrentMassageTime.split('*');
            CurrentMassageTime = array2[0];
            var TimeCreateNumeric = array2[1];
            CurrentMassageTime = CurrentMassageTime.slice(0, -3);
            var massageBody = $(this).parent().parent().attr("onclick");
            //    massageBody = gReplaceAllChars("'", "", massageBody);
            //    array = gSetMassageArray(massageBody);
            array = massageBody.split("'")
            $.modal.current.closeModal();
            OpenMessage(array[1], array[3], array[5], array[7], array[9], CurrentMassageTime, TimeCreateNumeric, this, false, Currindex, true, nextdex, IsFirstTime, array[21], array[23], array[25], array[27]);
            return false;
        });
    }
}


function CreateMessagePopUp(recipientType, recipientNumber, recipientName, modalTitle, eventno, orderNo) {
    url = "/Message/PopUpMessage?recipientType=" + recipientType + "&recipientNumber=" + recipientNumber + "&recipientName=" + recipientName + "&eventno=" + eventno + "&orderNo=" + orderNo;
    $.modal({
        title: modalTitle,
        url: url,
        width: 1000,
        height: 550
    });
}


function CheckTextDir(text) {
    if (CheckTextIsEnglish(text)) {
        return "ltr";
    }
    return "rtl";
}

function CheckTextIsEnglish(text) {
    var isNonEnglish = /[^\u0000-\u00ff]/.test(text);
    if (isNonEnglish) {
        return false;
    }
    return true;
}

function SetActiveTab(tabId) {

    $.ajax({
        type: "POST",
        url: "/Candidate/SetActiveTab?tabId=" + tabId,
        async: false,
        success: function () {
        }, complete: function (result) {
            if (result.responseText == "redirect") {
                //window.location.href = "/Account/logOn?ipChanged=true";
            }

            loadingFinished();
        }
    });
}


//function setActiveTabCandidate(tabId) {
//    $.ajax({
//        type: "POST",
//        url: "/Candidate/SetCandidateActiveTab?tabId=" + tabId,
//        success: function () {
//        }, complete: function (result) {
//            loadingFinished();
//        }
//    });
//}
function setActiveTabCandidate(tab, idcounter) {

    if (tab != 1) {
        $('#tab-' + 1 + idcounter).removeClass("tab-active");
        $('#tab-' + 1 + idcounter).css("display", "none");
    }
    if (tab != 2) {
        $('#tab-' + 2 + idcounter).removeClass("tab-active");
        $('#tab-' + 2 + idcounter).css("display", "none");
    }
    if (tab != 3) {
        $('#tab-' + 3 + idcounter).removeClass("tab-active");
        $('#tab-' + 3 + idcounter).css("display", "none");
    }
    if (tab != 4) {
        $('#tab-' + 4 + idcounter).removeClass("tab-active");
        $('#tab-' + 4 + idcounter).css("display", "none");
    }
    if (tab != 5) {
        $('#tab-' + 5 + idcounter).removeClass("tab-active");
        $('#tab-' + 5 + idcounter).css("display", "none");
    }
    if (tab != 6) {
        $('#tab-' + 6 + idcounter).removeClass("tab-active");
        $('#tab-' + 6 + idcounter).css("display", "none");
    }
    $(".candidateClassCandidate" + tab + idcounter).each(function (result) {
        $(this).addClass("active");
    });
    $('#tab-' + tab + idcounter).addClass("tab-active");
    $('#tab-' + tab + idcounter).css("display", "block");
    $.ajax({
        type: "POST",
        url: "/Candidate/SetCandidateActiveTab?tabId=" + tab,
        success: function () {
        }, complete: function (result) {
            loadingFinished();
        }
    });
}

function gToggleElement(Element) {

    $(Element).fadeToggle("fast");
}


/*function gToggleElementCand(Element, cand) {

    var res = CheckLockCand(cand);
    if(res == "ok")
    {
        $(Element).fadeToggle("fast");
    }
    else
    {
        lockCandMsg(cand,res);
    }
}*/


function TrimMailCharsInvalid(elm) {

    $(elm).val(gReplaceAllChars(" ", "", $(elm).val()));
    $(elm).val(gReplaceAllChars("\\", "", $(elm).val()));
}

function GetCityList(ObjName, Title) {
    var url = "/Job/CityView?Name=" + ObjName;
    $.modal({
        title: Title,
        url: url,
        height: 620,
        width: 340
    });
}

function SaveObj(obj, type) {
    if (type != 'Message') {
        if (obj != null) {
            CurrentFocusObj = obj;
            $(obj).focus();
        }
    }
}
function gGetCurrentDate() {
    var d = new Date();
    var month = 0;
    if ((d.getMonth() + 1) < 10) {
        month = d.getMonth() + 1;
        month = '0' + month;
    }
    else {
        month = d.getMonth() + 1;
    }

    var day = 0;
    if (d.getDate() < 10) {
        day = d.getDate();
        day = '0' + day;
    }
    else {
        day = d.getDate();
    }

    var hour = 0;
    if (d.getHours() < 10) {
        hour = d.getHours();
        hour = '0' + hour;
    }
    else {
        hour = d.getHours();
    }

    var minutes = 0;
    if (d.getMinutes() < 10) {
        minutes = d.getMinutes();
        minutes = '0' + minutes;
    }
    else {
        minutes = d.getMinutes();
    }

    var DateNow = d.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + minutes;
    return DateNow;
}
$(function () {
    $(document).keydown(function (e) {
        return (e.which || e.keyCode) != 116;
    });

    $(document).on("keydown", function (event) {
        // Chrome & Firefox || Internet Explorer
        if (document.activeElement === document.body || document.activeElement === document.body.parentElement) {
            // SPACE (32) o BACKSPACE (8)
            if (event.keyCode === 32 || event.keyCode === 8) {
                event.preventDefault();
            }
        }
    });

});


function isLater(str1, str2) {
    return new Date(str1) > new Date(str2);
}

$(document).ready(function () {
    var d = new Date();
    var isMessage = false;
    setInterval(openTimedMassages, time);//Time for popup message 1 minute popup
    setInterval(GgetMessagesAll, time);//Get messages 5 minutes
    $("html").addClass("grey-bg");
    history.pushState(null, null, '#');
    window.addEventListener('popstate', function (event) {
        history.pushState(null, null, '#');
    });
});

function GgetMessagesAll() {
    updateMessages();
    UserMessageCount();
}

function setWindowClose(Close, jobId, IdCounter, innerTableNum) {
    return CloseButtonWindow = "<button style='color: red;' class='float-right' onclick='JobEvents(" + jobId + "," + IdCounter + "," + innerTableNum + ")';'>x</button>";
}
function setWindowCloseHR(Close, jobId, IdCounter, innerTableNum) {
    return CloseButtonWindow = "<button style='color: red;' class='float-right' onclick='GetHrCands(" + jobId + "," + IdCounter + "," + innerTableNum + ")';'>x</button>";
}
function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
var CloseButtonWindow = "";
function gfillDDLFromJSONUrl(ddl2HtmlElementId, url, callbackFunction) {
    $('#' + ddl2HtmlElementId).prop("readonly", true);
    $.getJSON(url, function (result) {
        var ddl = $('#' + ddl2HtmlElementId);
        ddl.empty();
        if (result != null) {
            if (isJson(result)) {
                result = JSON.parse(result);
            }
            $(result).each(function (result) {
                try {
                    ddl.append(
                        $('<option/>',
                            {
                                value: this.Value
                            }
                        ).html(this.Text)
                    );
                }
                catch (e) {
                    alert("Error rendering jobs for client " + e);
                }
            });
        }
        var args = [];
        args.push(result);
        callbackFunction.apply(null, args);
        $('#' + ddl2HtmlElementId).prop("readonly", false);
        $('#' + ddl2HtmlElementId).trigger('update-select-list').change();
    });
}
function gGetNotificationMessage(msg1, msg2) {
    return "<span class='big-message lightgrey-gradient' width='100%'><a href='#' class='close show-on-parent-hover'>✕</a><span class='block-arrow'><span></span></span><span class='big-message-icon icon-mail'></span><strong>" + msg1 + "</strong><br>" + msg2 + "</span><br/>";
}
function gGetClientJobsActive(clientNo, ExJob, branchId, jobsListId, callbackFunction) {
    gfillDDLFromJSONUrl(jobsListId, "/Message/GetJobsActive?clientID=" + clientNo + "&ExJob=" + ExJob + "&branchId=" + branchId, function (result) {
        try {
            var args = [];
            args.push(result);
            callbackFunction.apply(null, args);
        }
        catch (e) {
            alert("error getting client jobs " + e);
        }
    });
}

function gGetClientJobsActiveDropDown(clientNo, ExJob, branchId, jobsListId, callbackFunction) {

    gfillDDLFromJSONUrl(jobsListId, "/Message/GetJobsActiveDropDown?clientID=" + clientNo + "&ExJob=" + ExJob + "&branchId=" + branchId, function (result) {
        try {
            var args = [];
            args.push(result);
            callbackFunction.apply(null, args);
        }
        catch (e) {
            alert("error getting client jobs " + e);
        }
    });
}

function gGetClientJobs(clientNo, jobsListId, callbackFunction) {
    gfillDDLFromJSONUrl(jobsListId, "/Message/GetJobs?clientID=" + clientNo, function (result) {
        try {
            var args = [];
            args.push(result);
            callbackFunction.apply(null, args);
        }
        catch (e) {
            alert("error getting client jobs " + e);
        }
    });
}

function gGetCandidate(searchText, candsListId, callbackFunction) {
    gfillDDLFromJSONUrl(candsListId, "/Event/GetCandList?searchText=" + searchText, function (result) {
        try {
            var args = [];
            args.push(result);
            callbackFunction.apply(null, args);
        }
        catch (e) {
            alert("error getting candidates " + e);
        }
    });

}

function gGetMaritalStatuses(statuseId, statusesListId, callbackFunction) {
    var url = "/Candidate/GetMaritalStatuses?statuseId=" + statuseId;
    $('#' + statusesListId).prop("readonly", true);
    $.getJSON(url, function (result) {
        var ddl = $('#' + statusesListId);
        ddl.val(result).attr("selected", "selected");
        var args = [];
        args.push(result);
        callbackFunction.apply(null, args);
        $('#' + statusesListId).trigger('update-select-list').change();
    });
}

function gGenders(genderId, gendersListId, callbackFunction) {
    var url = "/Candidate/GetGenders?genderId=" + genderId;
    $('#' + gendersListId).prop("readonly", true);
    $.getJSON(url, function (result) {
        var ddl = $('#' + gendersListId);
        ddl.val(result).attr("selected", "selected");
        var args = [];
        args.push(result);
        callbackFunction.apply(null, args);
        $('#' + gendersListId).trigger('update-select-list').change();
    });
}

function gGetJobClient(jobNo, clientsListId, callbackFunction) {
    var url = "/Message/GetClientByJobID?jobID=" + jobNo;
    $('#' + clientsListId).prop("readonly", true);
    $.getJSON(url, function (result) {
        if (result != null) {
            var arrayResualt = result.split("*~");
            var ddl = $('#' + clientsListId);
            ddl.val(arrayResualt[0]).attr("selected", "selected");
            var jobDesc = arrayResualt[1];
            var args = [];
            args.push(result);
            callbackFunction.apply(null, args);
            $('#' + clientsListId).trigger('update-select-list').change();
        }
    });
}






function openTimedMassages() {
    var isMessage = false;
    var d = new Date();
    var month = 0;
    if ((d.getMonth() + 1) < 10) {
        month = d.getMonth() + 1;
        month = '0' + month;
    }
    else {
        month = d.getMonth() + 1;
    }

    var day = 0;
    if (d.getDate() < 10) {
        day = d.getDate();
        day = '0' + day;
    }
    else {
        day = d.getDate();
    }

    var hour = 0;
    if (d.getHours() < 10) {
        hour = d.getHours();
        hour = '0' + hour;
    }
    else {
        hour = d.getHours();
    }

    var minutes = 0;
    if (d.getMinutes() < 10) {
        minutes = d.getMinutes();
        minutes = '0' + minutes;
    }
    else {
        minutes = d.getMinutes();
    }
    var DateNow = day + "/" + month + "/" + d.getFullYear() + " " + hour + ":" + minutes;
    var DayNow = day + "/" + month + "/" + d.getFullYear();
    $('.unstarred').each(function (index) {
        $(this).removeClass("unstarred");
        var CurMessage = $(this).parent().parent().parent();
        var CurrentMassageTime = $(CurMessage).attr('id');
        array2 = CurrentMassageTime.split('*');
        CurrentMassageTime = array2[0];
        var TimeCreateNumeric = array2[1];
        CurrentMassageTime = CurrentMassageTime.slice(0, -3);
        var massageBody = $(CurMessage).children().attr("onclick");
        //   massageBody = gReplaceAllChars("'", "", massageBody);
        array = massageBody.split("'")
        //   array = gSetMassageArray(massageBody);
        var CurrentMassageDay = CurrentMassageTime.split(" ");
        CurrentMassageDay = CurrentMassageDay[0];
        var Time = CurrentMassageTime.split(" ")[0].split("/")[2] + "/" + CurrentMassageTime.split(" ")[0].split("/")[1] + "/" + CurrentMassageTime.split(" ")[0].split("/")[0];
        CurrentMassageTime = Time + " " + CurrentMassageTime.split(" ")[1];
        var nowCompare = moment(new Date());
        var nextCompare = moment(new Date(CurrentMassageTime));
        if (nowCompare.diff(nextCompare) >= 0) {
            OpenMessagePopUp(array[1], array[3], array[5], array[7], array[9], CurrentMassageTime, TimeCreateNumeric, index, true, 0, true, array[21], array[23], array[25], array[27]);
            isMessage = array[2] + "*" + array[3];
            return false;
        }
    });
    if (isMessage != false) {
        isMessage = isMessage.split("*");
        //
        (isMessage[1], isMessage[2]);
    }
}

function OpenMessagePopUp(title, type, subject, body, senderName, Massagedate, TimeCreateNumeric, index, IsForReadList, UnreadIndex, IsFirstTime, EntityNo, EntityName, eventno, orderno) {

    var firstTime = true;
    if ($.modal.name == 'timedMassages' || $.modal.name != '' || $.modal.current != false) {
        clearInterval(time);
        return;
    }
    if ($.modal.name == 'unstarredMessages') {
        try { $.modal.current.closeModal(); } catch (ex) { }
    }
    if (IsFirstTime == 2) {
        firstTime = false;
    }

 


    title = title.replace("##", "'");
    title = title.replace("##", "'");
    url1 = "/Message/MessageDashRead?type=" + type + "&subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body) + "&senderName=" + senderName + "&Massagedate=" +
        Massagedate + "&TimeCreateNumeric=" + TimeCreateNumeric + "&index="
        + index + "&IsForReadList=" + IsForReadList + "&UnreadIndex=" +
        UnreadIndex + "&IsFirstTime=" + firstTime +
        "&EntityCode=" + EntityNo + "&EntityType=" + EntityName + "&eventno=" + eventno + "&orderno=" + orderno;
    $.modal({
        name: 'unstarredMessages',
        title: title,
        url: url1,
        width: 637,
        height: 450
    });
}

function OpenMessage(title, type, subject, body, senderName, Massagedate, TimeCreateNumeric, massage, IsRead, index, IsForReadList, UnreadIndex, IsFirstTime, EntityCode, EntityType, eventno, orderno) {

    var firstTime = true;
    if ($.modal.name == 'unstarredMessages' || $.modal.name != '' || $.modal.current == true) {
        clearInterval(time);
        return;
    }
    if ($.modal.name == 'timedMassages') {
        try { $.modal.current.closeModal(); } catch (ex) { }
    }
    if (IsRead == "onclick" || IsRead == true) {
        IsRead = true;
    }
    else {
        IsRead = false;
    }
    if (IsFirstTime == 2) {
        firstTime = false;
    }
    var url1 = "/Message/MessageDashRead?type=" + type + "&subject=" + encodeURIComponent(subject)
        + "&body=" + encodeURIComponent(body) + "&senderName=" + senderName + "&hasBeenRead="
        + IsRead + "&Massagedate=" + Massagedate + "&TimeCreateNumeric="
        + TimeCreateNumeric + "&index=" + index + "&IsForReadList="
        + IsForReadList + "&UnreadIndex=" + UnreadIndex + "&IsFirstTime="
        + firstTime + "&EntityCode=" + EntityCode + "&EntityType=" + EntityType + "&eventno=" + eventno + "&orderno=" + orderno;
    $.modal({
        name: 'timedMassages',
        title: title.replace("##", "'"),
        url: url1,
        width: 637,
        height: 430
    });
}



function updateMessages1() {
    gGetMessages(220, "MessagesMainTab", "Main");
    $.ajax(
        {
            type: "POST",
            url: "/Menu/GetHomeCountNewMessages",
            error: function (result) {
            },
            success: function (result) {
                if (result.CountNewMessages >= 1) {
                    $("#HomeCountNewMessages").html(result.CountNewMessages);
                }
                else {
                    $("#HomeCountNewMessages").html(0);
                }
                if (result.CountNewMessages == 1) {
                    document.getElementById("NewsReminders").innerHTML = result.Text;
                }
                else {
                    document.getElementById("NewsReminders").innerHTML = result.Text;
                }
            }
        });
}

function gSetMassageArray(massage) {
    massage = massage.replace(")", "");
    massage = massage.replace("(", "");
    massage = massage.replace("OpenMessageNow", "");
    var array = massage.split(',');
    return array;
}

function gSetReadMessage(Massagedate, TimeCreateNumeric, IsRead, SetMassagedate) {
    var arr = Massagedate.split(" ");
    Massagedate = arr[0];
    var SetMassagedate2 = SetMassagedate.split(" ");
    var SetMassageTime = SetMassagedate2[1];
    SetMassagedate = SetMassagedate2[0];
    var url1 = "/Message/SetReadMessage?Massagedate=" + Massagedate + "&MassageTime=" + TimeCreateNumeric + "&IsRead=" + IsRead + "&SetMassagedate=" + SetMassagedate + "&SetMassageTime=" + SetMassageTime;
    $.ajax({
        url: url1,
        type: "POST",
        success: function (result) {
        }
        , error: function (result) {
            alert("Error");
        }, complete: function (result) {
            //loadingFinished();
        }
    });
}

function gDeleteMessage(Massagedate, TimeCreateNumeric, IsRead, SetMassagedate, clientId, userId) {
    var arr = Massagedate.split(" ");
    Massagedate = arr[0];
    var SetMassagedate2 = SetMassagedate.split(" ");
    var SetMassageTime = SetMassagedate2[1];
    SetMassagedate = SetMassagedate2[0];
    var url1 = "/Message/DeleteMessage?Massagedate=" + Massagedate + "&MassageTime=" + TimeCreateNumeric + "&IsRead=" + IsRead + "&SetMassagedate=" + SetMassagedate + "&SetMassageTime=" + SetMassageTime;
    $.ajax({
        url: url1,
        type: "POST",
        success: function (result) {
        }
        , error: function (result) {
            alert("Error");
        }, complete: function (result) {
            updateMessages();
            UserMessageCount();
            //loadingFinished();
        }
    });
}
function maxLengthChars(obj, numChars) {
    if (obj.value.length > numChars) {
        obj.value = obj.value.substr(0, numChars);
    }
}
function gGetMessages(Amount, MessagesLocation, location) {
    $.ajax(
        {
            type: "POST",
            url: "/Message/Messages?MessageAmount=" + Amount + "&Window=" + location,
            error: function (result) {
            },
            success: function (result) {
                $("." + MessagesLocation).html(result);
            }
        });
}

function gResetSelectionDropDown(id) {
    var selectList = document.getElementById(id);
    if (selectList.selectedOptions != undefined) {
        for (var i = 0; i < selectList.selectedOptions.length; i++) {
            selectList.selectedOptions[i].selected == false;
        }
        $(selectList).prop("disabled", false);
        $(selectList).enableInput();
        $(selectList).trigger('update-select-list').change();
    }
}

function gCheckIfEmailAddress(userCode) {
    var url = "/Message/EmailMessing?userCode=" + userCode;
    $.modal({
        url: url,
        width: 400,
        height: 100
    });
}


function OpenMainPopUp(title, size) {
    var url = "/Main/MainPopUp";
    $.modal({
        title: title,
        url: url,
        width: 900,
        height: size

    });
}

function showNotification(title = '', message = '', hpos = 'right', vPos = 'top', isAutoClose = true, time = 4, id = '', classes = 'green-gradient', err = '') {
    // vPos: 'top' or 'bottom' - not fully working
    // hPos: 'left', 'center' or 'right'
    //var time = '@System.Configuration.ConfigurationManager.AppSettings["messageTime"]';   
    if (err != '') {
        var divErr = $('<div></div>');
        $(divErr).attr('id', 'divError');
        $(divErr).attr('css', 'display: none');
        $(divErr).hide();
        $(divErr).html(err);
        $('body').append(divErr);
    }

    if (title == "הצגה מוקדמת" && message == '') {
        var text = CKEDITOR.instances.MessageNew.ui.editor.getData();
        message = text;
    }

    if (classes == 'red-gradient') {

        time *= timeToShowNotificatiomMsg;
    }
    else {
        time *= 1000;

    }


    //   time *= 4000;        
    try {
        notify(title, message, {
            id: id,
            hPos: hpos,
            vPos: vPos,
            showCloseOnHover: false,
            //autoClose: isAutoClose,
            autoClose: isAutoClose,
            groupSimilar: false,
            closeDelay: time,
            classes: classes,
            onDisplay: function () {
            }
        });
    }
    catch (e) {
    }
}

function checkemail(email) {
    var str = email;
    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (filter.test(str))
        testresults = true
    else {
        testresults = false
    }
    return (testresults)
}

function nameid(name) {

    jobnameid = name;
}


function gGetView(className, typeController, contoroller, action, dataParams) {
    startLoading('', '');
    var url = '/' + contoroller + '/' + action + '/';
    $.ajax({
        url: url,
        data: dataParams,
        type: 'GET',
        success: function (result) {

            $(typeController + className).show(result);
            $(typeController + className).html(result);
        },
        complete: function (result) {
            loadingFinished();
        }
    });
}



function splitStringByChar(stringToSplit, splitChar) {
    var res = stringToSplit.split(splitChar);
    return res;
}

