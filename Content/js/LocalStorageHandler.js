// Local Storage Handler
// Created at 6.6.2017 by izik shtemer

$(document).ready(function () {
    if (typeof (Storage) !== "undefined") {
        //alert('Web Storage supported');
    }
    else {
        alert('Sorry! No Web Storage support..');
    }
});

function saveDataToLocalStorage(storageId, data) {
    
    window.localStorage.setItem(storageId, JSON.stringify(data));
}

function removeDataFromLocalStorage(storageId)
{

    localStorage.removeItem(storageId);
}

function getDataFromLocalStorage(storageId) {

    try{
        var localStorageValue = JSON.parse(window.localStorage.getItem(storageId));
        return localStorageValue;
    }
    catch(ex){return null;}
}

function clearLocalStorage() {
    
    localStorage.clear();
}

function removeDuplicate(a) {
    uniqueArray = a.filter(function (item, pos) {
        return a.indexOf(item) == pos;
    })
}

function removeItemFromArray(array, data) {

    if (array[0] != null && data != null) {
        for (var i = 0, len = array.length; i < len; i++) {
            if (array[i].action == data.action &&
                array[i].controller == data.controller &&
                array[i].text == data.text &&
                array[i].textParam == data.textParam &&
                array[i].parameters == data.parameters) {
                array.splice(i, 1);
                len = len - 1;
            }
        }
        return array;
    }
}

function removeItemFromArrayByTabId(array, tabId) {
   
    if (array[0] != null && tabId != null) {
        for (var i = 0, len = array.length; i < len; i++) {
            if (array[i].newTabId == tabId) {
                array.splice(i, 1);
                len = len - 1;
            }
        }
        return array;
    }
}

function checkItemExistsArray(array, data) {
    
    if (array[0] != null && data != null) {
        for (var i = 0, len = array.length; i < len; i++) {
            if (array[i].action == data.action &&
                array[i].controller == data.controller &&
                array[i].text == data.text &&
                array[i].textParam == data.textParam &&
                array[i].parameters == data.parameters) {
                return true
            }
        }
        return false;
    }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}




