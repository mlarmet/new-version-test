var scrollLimit = 75;
var dots = 0;
var fait = false;

$(document).ready(function() {

    setInterval(function() {
        if (dots < 3) {
            $('#loader h2').append('.');

            dots++;
        } else {
            while ($('#loader h2').text().indexOf(".") >= 0) {
                $('#loader h2').text($('#loader h2').text().replace('.', ''));
            }
            dots = 0;
        }
    }, 600);



});

var x = 0;
var progress = setInterval(function() {
    if (x < 100) {
        $('.progress-bar').css("width", x + "%");
        $("#loader-content p").text(x + "%");
        $("#loader-content p").css("margin-left", "calc(" + x + "% - 25px)");
        x++;
    } else {
        clearInterval(progress);
        $('.progress-bar').css("width", "100%");
        $('#loader-content p').text("100%");
        $("#loader-content p").css("margin-left", "calc(100% - 25px)");
    }

}, 100);

$(window).on("load", function() {

    clearInterval(progress);
    $('.progress-bar').css("width", "100%");
    $('#loader-content p').text("100%");
    $("#loader-content p").css("margin-left", "calc(100% - 25px)");
    setTimeout(function() {
        $("#loader").fadeOut(250);
        $("html").css("overflow-y", "scroll");
    }, 250);

    //nav();

    /*var $children = $("#h-menu-links .nav-link").on("click", function() {

        $("#h-menu-links .nav").find('.active').removeClass("active");
        $(this).addClass("active");

        $("nav .nav").find('.active').removeClass("active");
        $("nav .nav li").children().eq($children.index(this)).addClass("active");

        $("#h-menu-icon").removeClass("change");
        $("#h-menu-links").slideUp(250);
    });*/

    var $children2 = $("nav .nav-link").on("click", function() {

        $("nav .navbar-nav").find('.active').removeClass("active");
        $(this).addClass("active");

        /*$("#h-menu-links .nav").find('.active').removeClass("active");
        $("#h-menu-links .nav li").children().eq($children2.index(this)).addClass("active");*/
    });

    $("#h-menu-icon").click(function() {
        fait = true;
        if ($("#h-menu-links").is(":visible")) {
            $("#h-menu-links").slideUp(250);
            $("#h-menu-icon").removeClass("change");
        } else {
            $("#h-menu-links").slideDown(250);
            $("#h-menu-icon").addClass("change");

        }
    });

    /*cacher img pizza si click sur autre chose que l'img*/
    /*$(document).click(function(evt) {
        var inside = document.querySelector("#popup img");

        if (evt.target.className == "popup") {
            evt.preventDefault();
            inside.src = evt.target.getAttribute("href");
            inside.alt = evt.target.getAttribute("alt");
            inside.title = evt.target.getAttribute("title");
            $("#popup-container").fadeIn(250);
            $("html").css("overflow-y", "hidden");

        } else if (evt.target != inside) {
            $("#popup-container").fadeOut(250);

            setTimeout(function() {
                inside.src = "";
                inside.alt = "";
                inside.title = "";
            }, 250);

            //.inside.alt = "".inside.title = "";
            $("html").css("overflow-y", "scroll");
        }
    });*/

});

$(window).on("orientationchange resize", function() {

    /*if ($("header nav .nav").is(":hidden")) {
        if (!fait) {
            $("#h-menu-links").slideUp(0);
            $("#h-menu-icon").removeClass("change");
            fait = true;
        }
    } else {
        fait = false;
    }
    nav();*/
});


/*function nav() {

    if (window.matchMedia("(min-width: 992px)").matches) {
        if ($("nav").is(":visible")) {
            if (document.body.scrollTop > scrollLimit ||
                document.documentElement.scrollTop > scrollLimit) {
                $("header img").css("width", "96px");
                $("header").css("height", "4.5em");
            } else {
                $("header img").css("width", "164px");
                $("header").css("height", "6.5em");
            }
        }
    } else {
        $("header img").css("width", "96px");
        $("header").css("height", "4em");
    }

};*/

/*$(window).scroll(function() {
    nav();
});*/