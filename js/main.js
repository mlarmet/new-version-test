var scrollLimit = 100;
var fait = false;
var mobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

function normalizeSlideHeights() {
    $('.carousel').each(function() {
        var items = $('.carousel-item', this);
        // reset the height
        $('.carousel-caption').css('min-height', 0);
        // set the height
        var maxHeight = Math.max.apply(null,
            items.map(function() {
                return $(this).outerHeight()
            }).get());
        $('.carousel-caption').css('min-height', maxHeight + 'px');
    });
}

//$(".reseaux-sociaux span").fadeOut(0);

$(window).on("load", function() {

    setTimeout(function() {
        $("html").scrollTop(0).css("scroll-behavior", "smooth").css("overflow-y", "auto");
    }, 10);
    setTimeout(function() {
        AOS.init({
            duration: 750,
            disable: function() {
                return (window.matchMedia("(max-width: 767.68px)").matches) || mobile
            },
            easing: 'ease-in-out',
            once: true,
            //box trigger - window trigger
            anchorPlacement: 'center-bottom'
        });
        $("#loader").fadeOut(250);
    }, 250);

    nav();

    $("header .nav-link").on("click", function() {
        $("header .navbar-nav").find('.active').removeClass("active");
        $(this).addClass("active");

        /*$("footer .navbar-nav").find('.active').removeClass("active");

        var monElem = $(this).attr("href");
        $("footer .navbar-nav li a").each(function() {

            if ($(this).attr("href") == monElem) {
                $(this).addClass("active");
            }
        });*/
    });

    $("footer .nav-link").on("click", function() {
        $("header .navbar-nav").find('.active').removeClass("active");

        var monElem = $(this).attr("href");
        $("header .navbar-nav li a").each(function() {

            if ($(this).attr("href") == monElem) {
                $(this).addClass("active");
            }
        });
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
            //$(this).siblings("span").fadeIn(250);
            //$(this).siblings("span").animate({ opacity: 1 });
            $(this).siblings("span").css("opacity", "1");


        }).mouseleave(function() {
            $(this).siblings("span").stop(true, false);
            //$(this).siblings("span").fadeOut(250);
            //$(this).siblings("span").animate({ opacity: 0 });
            $(this).siblings("span").css("opacity", "0");
        });
    }


    if (window.matchMedia("(max-width: 575.98px)").matches) {
        normalizeSlideHeights();
    } else {
        $('.carousel-caption').css('min-height', 0);
    }

};

/*$(window).scroll(function() {

});*/