var scrollLimit = 100;
var fait = false;
var mobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

$(document).ready(function() {

    $(".reseaux-sociaux span").fadeOut(0);
});

AOS.init({
    duration: 500,
    easing: 'ease-in-out-back',
    disable: 'mobile',
    once: true,
    //box trigger - window trigger
    anchorPlacement: 'center-bottom'
});

$(window).on("load", function() {

    setTimeout(function() {
        $("#loader").fadeOut(250);
        $("html").css("overflow-y", "auto");
    }, 250);

    nav();

    $(".nav-link").on("click", function() {
        $(".navbar-nav").find('.active').removeClass("active");
        $(this).addClass("active");
    });

    $("#menu, .nav-link").click(function() {
        if (window.matchMedia("(max-width: 991px)").matches) {
            fait = true;
            if ($("#navigation").is(":visible")) {
                $("#navigation").fadeOut(250);
                $("#menu").removeClass("change");
                $("html").css("overflow-y", "auto");
            } else {
                $("#navigation").fadeIn(250);
                $("#menu").addClass("change");
                $("html").css("overflow-y", "hidden");

            }
        }
    });


});

$(window).on("orientationchange resize", function() {
    nav();
});


function nav() {
    if (window.matchMedia("(max-width: 991px)").matches) {
        if (!fait) {
            fait = true;
            $("#navigation").fadeOut(0);
            $("#menu").removeClass("change");
            $("html").css("overflow-y", "auto");
        }
    } else {
        $("#navigation").show();
        fait = false;
    }

    if (!mobile) {
        $(".reseaux-sociaux i").mouseenter(function() {
            $(this).siblings("span").stop(true, false);
            $(this).siblings("span").fadeIn(250);
        }).mouseleave(function() {
            $(this).siblings("span").stop(true, false);
            $(this).siblings("span").fadeOut(250);
        });

    }


};

$(window).scroll(function() {

});

$(window).scroll(function() {

});