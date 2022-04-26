//function CheckUserLoggedOutByOtherUser() {

//    setTimeout("CheckUserLoggedOutByOtherUser()", 6000);

//    var url1 = "/Account/ValidateUserLoggedIn/";
//    $.ajax({
//        url: url1,
//        type: "POST",
//        success: function (result) {
//            if (result.is_Logged_in == false) {
//                postMessage('/Account/LogOn?IsLogOff=true');
//                //window.location.href = "/Account/LogOn?IsLogOff=true";
//            }
//        },
//        error: function (result) {
//            postMessage('/Account/LogOn');
//            //window.location.href = "/Account/LogOn";
//        }, complete: function (result) {
//            //loadingFinished();
//        }
//    });
//}
//CheckUserLoggedOutByOtherUser();



//var ajax = function (url, data, callback, type) {
//    var data_array, data_string, idx, req, value;
//    if (data == null) {
//        data = {};
//    }
//    if (callback == null) {
//        callback = function () { };
//    }
//    if (type == null) {
//        //default to a GET request
//        type = 'GET';
//    }
//    data_array = [];
//    for (idx in data) {
//        value = data[idx];
//        data_array.push("" + idx + "=" + value);
//    }
//    data_string = data_array.join("&");
//    req = new XMLHttpRequest();
//    req.open(type, url, false);
//    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//    req.onreadystatechange = function () {
//        if (req.readyState === 4 && req.status === 200) {
//            return callback(req.responseText);
//        }
//    };
//    req.send(data_string);
//    return req;
//};

//var url = '/Account/ValidateUserLoggedIn/';

//ajax(url, { 'send': true, 'lemons': 'sour' }, function (data) {
//    //do something with the data like:
//    self.postMessage(data);
//}, 'POST');

//////////////////////////////////////////////////

//simple XHR request in pure JavaScript
//function load(url, callback) {
//    var xhr;

//    if (typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
//    else {
//        var versions = ["MSXML2.XmlHttp.5.0",
//			 	"MSXML2.XmlHttp.4.0",
//			 	"MSXML2.XmlHttp.3.0",
//			 	"MSXML2.XmlHttp.2.0",
//			 	"Microsoft.XmlHttp"]

//        for (var i = 0, len = versions.length; i < len; i++) {
//            try {
//                xhr = new ActiveXObject(versions[i]);
//                break;
//            }
//            catch (e) { }
//        } // end for
//    }

//    xhr.onreadystatechange = ensureReadiness;

//    function ensureReadiness() {
//        if (xhr.readyState < 4) {
//            return;
//        }

//        if (xhr.status !== 200) {
//            return;
//        }

//        // all is well	
//        if (xhr.readyState === 4) {
//            callback(xhr);
//        }
//    }

//    xhr.open('GET', url, true);
//    xhr.send(url);
//}

//self.addEventListener(url, function (e) {
//    self.postMessage(e.data);
//}, false)

//and here is how you use it to load a json file with ajax

var url = "http://localhost:58017/Account/ValidateUserLoggedIn/";
//
//load(url, function (xhr) {
//    var result = xhr.responseText;
//});

//function CheckUserLoggedOutByOtherUser() {
//    setTimeout("CheckUserLoggedOutByOtherUser()", 6000);
//    var xhttp = new XMLHttpRequest();
//    xhttp.onreadystatechange = function () {
//        if (this.readyState == 4 && this.status == 200) {
//            // Typical action to be performed when the document is ready:
//            var x = xhttp.responseText;
//            self.postMessage(x)
//        }
//    };
//    xhttp.open("GET", url, true);
//    xhttp.send();
//}

function RunMe() {
    setTimeout("RunMe()", 6000);
    //var source = new EventSource(url);
    //source.onmessage = function (event) {
        postMessage('x');
    //}
}

//CheckUserLoggedOutByOtherUser();

