$(document).ready(function () {
    var l = $('.loading');
    l.ajaxStart(function () {
       l.addClass("loadinganimation");
   })
    .ajaxStop(function () {
        l.removeClass("loadinganimation");
    });

    $("body").click(function (event) {
        var $target = $(event.target);

        var $menuhidden = $("body").hasClass("menu-visible");


        if (($target.is("#open-menu") || $target.is("#midastart")) && !$menuhidden) {
            $("body").find("#menu").show();
            $("body").addClass("menu-visible");


            if ($('#pollSlider-button').css("margin-right") == "300px") {   //closing effect
                $('.pollSlider').animate({ "margin-right": '-=300' });
                $('#pollSlider-button').animate({ "margin-right": '-=300' });
                //$('#MainView').animate({ "margin-right": '-=300' });
            }

            if ($('#pollSlider-button').css("margin-left") == "300px") {    //closing effect
                $('.pollSlider').animate({ "margin-left": '-=300' });
                $('#pollSlider-button').animate({ "margin-left": '-=300' });
                //$('#MainView').animate({ "margin-right": '-=300' });
            }

        }



        if ($menuhidden && ($target.is(".big-menu li .big-menu li a") || (!$target.is("#menu") && !$target.parents().is("#menu")))) {
            $("body").removeClass("menu-visible");
            $("body").find("#menu").hide();
        }
    });
});

function toShortDateString(s) {
    return s.substring(0, 10);
}


$(function () {
    $("#midastart").rotate({
        bind: {
            mouseover: function () {
                $(this).rotate({ animateTo: 60 })
            },
            mouseout: function () {
                $(this).rotate({ animateTo: 0 })
            }
        }
    });
});

function abbreviateText(originalText, maxLength) {
    if (!originalText)
        return originalText;
    if (originalText.length > maxLength)
        return originalText.substring(0, maxLength - 1) + "...";
    else
        return originalText;
}


