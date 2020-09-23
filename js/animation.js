var scrollLimit = 100;
var fait = false;
var mobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

$(document).ready(function() {

    $(".reseaux-sociaux span").fadeOut(0);

    AOS.init({
        duration: 750,
        disable: 'mobile',
        once: true,
    });

});

$(window).on("load", function() {

    setTimeout(function() {
        $("#loader").fadeOut(250);
        $("html").css("overflow-y", "auto");
    }, 250);

    nav();

    $(".nav-link").unbind().on("click", function() {
        $(".navbar-nav").find('.active').removeClass("active");
        $(this).addClass("active");
    });

    $("#menu, .nav-link").unbind().click(function() {
        if (window.matchMedia("(max-width: 968px)").matches) {
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

    if (!mobile) {
        $(".reseaux-sociaux i").mouseenter(function() {
            $(this).siblings("span").stop(true, false);
            $(this).siblings("span").fadeIn(250);
        }).mouseleave(function() {
            $(this).siblings("span").stop(true, false);
            $(this).siblings("span").fadeOut(250);
        });

    }
});

$(window).on("orientationchange resize", function() {
    nav();
});


function nav() {
    if (window.matchMedia("(max-width: 968px)").matches) {
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
};

$(window).scroll(function() {
    if (window.matchMedia("(min-width: 812px)").matches) {
        if (document.body.scrollTop > scrollLimit ||
            document.documentElement.scrollTop > scrollLimit) {
            $("#navigation").css("background-color", "rgba(38, 53, 71, 1)");
        } else {
            $("#navigation").css("background-color", "var(--primaryColorA)");
        }
    }

});