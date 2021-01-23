class Swipe {
    constructor(element) {
        this.xDown = null;
        this.yDown = null;
        this.element = typeof(element) === 'string' ? document.querySelector(element) : element;

        this.element.addEventListener('touchstart', function(evt) {
            this.xDown = evt.touches[0].clientX;
            this.yDown = evt.touches[0].clientY;
        }.bind(this), false);

    }

    onLeft(callback) {
        this.onLeft = callback;

        return this;
    }

    onRight(callback) {
        this.onRight = callback;

        return this;
    }

    onUp(callback) {
        this.onUp = callback;

        return this;
    }

    onDown(callback) {
        this.onDown = callback;

        return this;
    }

    handleTouchMove(evt) {
        if (!this.xDown || !this.yDown) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        this.xDiff = this.xDown - xUp;
        this.yDiff = this.yDown - yUp;

        if (Math.abs(this.xDiff) > Math.abs(this.yDiff)) { // Most significant.
            if (this.xDiff > 0) {
                this.onLeft();
            } else {
                this.onRight();
            }
        } else {
            if (this.yDiff > 0) {
                this.onUp();
            } else {
                this.onDown();
            }
        }

        // Reset values.
        this.xDown = null;
        this.yDown = null;
    }

    run() {
        this.element.addEventListener('touchmove', function(evt) {
            this.handleTouchMove(evt).bind(this);
        }.bind(this), false);
    }
}
var scrollLimit = 100;
var fait = false;
var mobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

const slides = document.querySelectorAll(".slider-item");
const slidesIndicators = document.querySelectorAll("#slider-nav li");
const nbSlides = slides.length;

var countSlide = 0;
var previousCount;
var pause = false;

function resetSlide(index, position) {
    slides[index].classList.add("notransition");
    slides[index].style.left = position;

    setTimeout(function() { slides[index].classList.remove("notransition"); }, 50);
}

function placeAt(index, position, prevpos) {

    resetSlide(index, position);

    setTimeout(function() {
        slides[previousCount].style.left = prevpos;
        slides[countSlide].classList.add("active");
        slidesIndicators[countSlide].classList.add("active");
        slides[countSlide].style.left = "0";
    }, 50);
}

function slideSuivante() {

    document.getElementById("slider-left").removeEventListener("click", slidePrecedente);
    document.getElementById("slider-right").removeEventListener("click", slideSuivante);

    document.querySelectorAll("#slider-nav li").forEach(item => {
        item.removeEventListener("click", handler, true);
    });

    //document.getElementById("slider-container").removeEventListener("touchmove", swipe, true);

    previousCount = countSlide;

    slidesIndicators[previousCount].classList.remove("active");
    slides[previousCount].classList.remove("active");
    slides[previousCount].style.left = "-100%";

    if (countSlide < nbSlides - 1) {
        countSlide++;
    } else {
        countSlide = 0;
    }

    if (countSlide == nbSlides - 1) {
        resetSlide(0, "100%");
    } else {
        resetSlide(countSlide + 1, "100%");
    }

    slides[countSlide].classList.add("active");
    slidesIndicators[countSlide].classList.add("active");
    slides[countSlide].style.left = "0";

    setTimeout(function() {
        document.getElementById("slider-left").addEventListener("click", slidePrecedente);
        document.getElementById("slider-right").addEventListener("click", slideSuivante);
        //document.getElementById("slider-container").addEventListener("touchmove", swipe, true);

        document.querySelectorAll("#slider-nav li").forEach(item => {
            item.addEventListener("click", handler, true);
        });
    }, 500);
}

function slidePrecedente() {
    document.getElementById("slider-left").removeEventListener("click", slidePrecedente);
    document.getElementById("slider-right").removeEventListener("click", slideSuivante);
    //document.getElementById("slider-container").removeEventListener("touchmove", swipe, true);

    document.querySelectorAll("#slider-nav li").forEach(item => {
        item.removeEventListener("click", handler, true);
    });

    previousCount = countSlide;

    slidesIndicators[previousCount].classList.remove("active");
    slides[previousCount].classList.remove("active");
    slides[previousCount].style.left = "100%";

    if (countSlide > 0) {
        countSlide--;
    } else {
        countSlide = nbSlides - 1;
    }

    if (countSlide > 0) {
        resetSlide(countSlide - 1, "-100%");
    } else {
        resetSlide(nbSlides - 1, "-100%");
    }

    slides[countSlide].classList.add("active");
    slidesIndicators[countSlide].classList.add("active");
    slides[countSlide].style.left = "0";

    setTimeout(function() {
        document.getElementById("slider-left").addEventListener("click", slidePrecedente);
        document.getElementById("slider-right").addEventListener("click", slideSuivante);
        //document.getElementById("slider-container").addEventListener("touchmove", swipe, true);

        document.querySelectorAll("#slider-nav li").forEach(item => {
            item.addEventListener("click", handler, true);
        });
    }, 500);
}

function slideX(index) {
    document.getElementById("slider-left").removeEventListener("click", slidePrecedente);
    document.getElementById("slider-right").removeEventListener("click", slideSuivante);
    //document.getElementById("slider-container").removeEventListener("touchmove", swipe, true);

    document.querySelectorAll("#slider-nav li").forEach(item => {
        item.removeEventListener("click", handler, true);
    });

    previousCount = countSlide;

    slidesIndicators[previousCount].classList.remove("active");
    slides[previousCount].classList.remove("active");

    countSlide = parseInt(index);

    if (countSlide != previousCount) {

        if (countSlide == nbSlides - 1) {
            if (previousCount == 0) {
                setTimeout(function() {
                    resetSlide(0, "100%");
                }, 550);
                resetSlide(countSlide - 1, "-100%");
            } else {
                resetSlide(0, "100%");
                setTimeout(function() {
                    resetSlide(countSlide - 1, "-100%");
                }, 550);
            }
        } else if (countSlide == 0) {
            if (previousCount == nbSlides - 1) {
                setTimeout(function() {
                    resetSlide(nbSlides - 1, "-100%");
                }, 550);
                resetSlide(countSlide + 1, "100%");
            } else {
                resetSlide(nbSlides - 1, "-100%");
                setTimeout(function() {
                    resetSlide(countSlide + 1, "100%");
                }, 550);
            }
        } else {
            setTimeout(function() {
                resetSlide(countSlide + 1, "100%");
                resetSlide(countSlide - 1, "-100%");
            }, 550);
        }

        if (countSlide < previousCount) {
            placeAt(countSlide, "-100%", "100%");
        } else {
            placeAt(countSlide, "100%", "-100%");
        }
    }

    setTimeout(function() {
        document.getElementById("slider-left").addEventListener("click", slidePrecedente);
        document.getElementById("slider-right").addEventListener("click", slideSuivante);
        //document.getElementById("slider-container").addEventListener("touchmove", swipe, true);

        document.querySelectorAll("#slider-nav li").forEach(item => {
            item.addEventListener("click", handler, true);
        });
    }, 500);

}



window.addEventListener("load", function() {

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
        $("header nav ul").find('.active').removeClass("active");
        $(this).addClass("active");
    });

    $("footer .second-nav-link").on("click", function() {
        $("header nav ul").find('.active').removeClass("active");

        var monElem = $(this).attr("href");

        $("header nav ul li a").each(function() {
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
                document.getElementById("menu").classList.remove("change");
                document.querySelector("html").style.overflowY = "auto";
            } else {
                $("#navigation").fadeIn(250);
                document.getElementById("menu").classList.add("change");
                document.querySelector("html").style.overflowY = "hidden";
            }
        }
    });

    document.getElementById("slider-left").addEventListener("click", slidePrecedente);
    document.getElementById("slider-right").addEventListener("click", slideSuivante);

    document.querySelectorAll("#slider-nav li").forEach(items => {
        items.addEventListener("click", handler, true);
    });

    setInterval(function() {
        if (!pause)
            slideSuivante();
    }, 3000);

    var slideBeforeEvent;

    document.getElementById("slider-container").addEventListener("mouseenter", function() {
        pause = true;
        slideBeforeEvent = countSlide;
    });
    document.getElementById("slider-container").addEventListener("mouseleave", function() {
        //user click to change slide
        if (slideBeforeEvent !== countSlide) {
            setTimeout(function() {
                pause = false;
            }, 3000);

        } else {
            pause = false;
        }
    });

    //document.getElementById("slider-container").addEventListener("touchmove", swipe, true);

    var swiper = new Swipe(document.getElementById('slider-container'));

    swiper.onLeft(function() {
        pause = true;
        slideSuivante();

        setTimeout(function() {
            pause = false;
        }, 3000);
    });

    swiper.onRight(function() {
        pause = true;
        slidePrecedente();

        setTimeout(function() {
            pause = false;
        }, 3000);
    });
    swiper.run();

});

var handler = function(e) {
    slideX(e.target.id);
}

window.addEventListener("resize", nav);
window.addEventListener("orientationchange", nav);

function nav() {

    if (window.matchMedia("(max-width: 991px)").matches) {
        if (!fait) {
            fait = true;
            $("#navigation").fadeOut(0);
            document.getElementById("menu").classList.remove("change");
            document.querySelector("html").style.overflowY = "auto";
        }
    } else {
        $("#navigation").show();
        fait = false;
    }

    if (!mobile) {
        $(".reseaux-sociaux i").mouseenter(function() {
            $(this).siblings("span").css("opacity", "1");

        }).mouseleave(function() {
            $(this).siblings("span").css("opacity", "0");
        });
    }

    if (window.matchMedia("(max-width: 400px)").matches) {
        var heightSlider = 0;

        document.querySelectorAll(".slider-description").forEach(items => {
            next = (items.querySelector(".slider-description h3").offsetHeight + items.querySelector(".slider-description ul").offsetHeight);
            if (next > heightSlider)
                heightSlider = next;
        });

        document.getElementById("slider-container").style.height = heightSlider + 80 /*marge pour afficher le ol */ +
            "px";
    } else {
        document.getElementById("slider-container").style.height = null;
    }

}