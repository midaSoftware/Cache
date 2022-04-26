$(document).ready(function () {

    $('a#hometab').live('click', function () {
        $("body").removeClass("menu-visible");
        $("body").find("#menu").hide();

        var url = "/Home/SwitchTab?tabIndex=0";

        $.ajax({
            url: url,
            success: function (data) {
                $('#admtabscontainer').html(data);
            }
        });
        return false;
    });

    $('a.sidemenulnk').live('click', function () {
        $("body").removeClass("menu-visible");
        $("body").find("#menu").hide();

        var sz = $('#admtabs ul >li .tabtextwrap').length;

        if (sz >= 7) {
            maxTabs();
        }
        else {
            var tabContext = $(this).attr("tabcontext");
            var tabParameter = $(this).attr("tabparameter");

            var qs = "tabContext=" + tabContext;

            if (tabParameter)
                qs = qs + "&tabParameter=" + tabParameter;



            var url = "/Home/OpenNewTab" + "?" + qs;



            $.ajax({
                url: url,
                success: function (data) {
                    $('#admtabscontainer').html(data);
                }
            });
            return false;
        }
    });

    $('a#newtab').live('click', function () {
        var sz = $('#admtabs ul >li .tabtextwrap').length;

        if (sz >= 7) {
            maxTabs();
        }
        else {
            $("body").removeClass("menu-visible");
            $("body").find("#menu").hide();

            var tabContext = "CandidateTab";


            var tc = $("#hfTabContext").val();

            if (tc != "HomeTab")
                tabContext = tc;


            var qs = "tabContext=" + tabContext;

            var tabParameter = $(this).attr("tabparameter");


            if (tabParameter) {
                qs = qs + "&tabParameter=" + tabParameter;
            }

            var url = "/Home/OpenNewTab" + "?" + qs;



            $.ajax({
                url: url,
                success: function (data) {
                    $('#admtabscontainer').html(data);
                }
            });
            return false;
        }
    });

    $('.tab-actions').live('click', function () {    
        var ind = $(this).attr("id").substring(4);
        var url = "/Home/CloseTab?tabIndex=" + ind;

        $.ajax({
            url: url,
            success: function (data) {
                $('#admtabscontainer').html(data);
            }
        });
        return false;
    });


    $('a.tablink').live('click', function () {  
        var tabid = $(this).attr("tabid");
        var url = "/Home/SwitchTab?tabIndex=" + tabid;

        $.ajax({
            url: url,
            success: function (data) {
                $('#admtabscontainer').html(data);
            }
        });
        return false;
    });

    function maxTabs() {
        var hfMaxTabs = $('#hfMaxTabs').val();
        $.modal({
            title: '',
            content: hfMaxTabs,
            contentAlign: 'center'
        });
    }
});