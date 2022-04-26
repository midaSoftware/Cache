
function DoTheMagic() {
    var pollSliderButtonPos = $('#pollSlider-button').css("margin-left");
    if (pollSliderButtonPos == "300px") {//closing effect
        $('.pollSlider').animate({ "margin-left": '-=300' });
        $('#pollSlider-button').animate({ "margin-left": '-=300' });

    }
    else {//open effect
        if (pollSliderButtonPos == "0px") {
            $('.pollSlider').animate({ "margin-left": '+=300' });
            $('#pollSlider-button').animate({ "margin-left": '+=300' });
            GetLastCandList();

        }
    }

}

function GetLastCandList() {
    $.ajax({
        url: "/QuickSearch/LastCandidateList?isForQuickSearch=true",
        type: "GET",
        beforeSend: function () {
            $("#loaderLastlistCandidate").fadeIn('fast');
        },
        error: function (result) {
            return;
        },
        success: function (data) {
            $("#listcontainerLastCandidate").html(data);
            $("#loaderlistCandidate").fadeOut('fast');
        },
        complete: function () {

        },
    });
}
