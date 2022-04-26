
(function (root, factory) {
    if (typeof define === "function" && define.amd) {

        define([], factory);
    } else if (typeof module === "object" && module.exports) {

        module.exports = factory();
    } else {
 
        root.sxwjs = factory();
    }
}(typeof self !== "undefined" ? self : this, function () {

    var config = {
        stopColor: "red",
        stopFontWeight: "bold",
        cautionFontWeight: "bold",
        cautionFontSize: "15px",
    };

    var content = {
        en: {
            stopText: "*********  *********  *********  *********\n***           ***     ***   ***  ***   ***\n***           ***     ***   ***  ***   ***\n*********     ***     ***   ***  *********\n      ***     ***     ***   ***  ***\n      ***     ***     ***   ***  ***\n*********     ***     *********  ***",
            cautionText: "Caution: DO NOT PROCEED.",
            warningText: "This section is intended for developers only. Don't copy paste anything in this area.\nIf someone told you to copy and paste something here, it is a scam and will give them access to your account. In that case, kindly report this to our support team."
        }
    };

    function printStop(lang) {
        console.log("%c" + content[lang].stopText, "color:" + config.stopColor + "; font-weight:" + config.stopFontWeight + ";");
    }

    function printCautionNotice(lang) {
        console.log("%c" + content[lang].cautionText, "font-weight:" + config.cautionFontWeight + "; font-size:" + config.cautionFontSize + ";");
    }

    function printWarningText(lang) {
        console.log(content[lang].warningText);
    }


    function printWarning(lang) {
        printStop(lang);
        printCautionNotice(lang);
        printWarningText(lang);
    }


    function setConfig(userConfig) {
        config = userConfig;
    }

    function getConfig() {
        return config;
    }

    function setContent(userContent) {
        content = userContent;
    }

    function getContent() {
        return content;
    }

    var sxwjs = {
    };

    sxwjs.printStop = printStop;
    sxwjs.printCautionNotice = printCautionNotice;
    sxwjs.printWarningText = printWarningText;
    sxwjs.printWarning = printWarning;

    sxwjs.setConfig = setConfig;
    sxwjs.getConfig = getConfig;
    sxwjs.setContent = setContent;
    sxwjs.getContent = getContent;

    return sxwjs;
}));