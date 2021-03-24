class Swipe {
    constructor(element) {
        this.xDown = null;
        this.yDown = null;
        this.element = typeof(element) === 'string' ? document.querySelector(element) : element;

        this.element.addEventListener('touchstart', function(evt) {
            this.xDown = evt.touches[0].clientX;
            this.yDown = evt.touches[0].clientY;
        }.bind(this), { passive: false });

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
        }.bind(this), { passive: false });
    }
}

const scrollLimit = 100;
const mobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

const slides = document.querySelectorAll(".slider-item");
const slidesIndicators = document.querySelectorAll("#slider-nav li");
const nbSlides = slides.length;

var countSlide = 0;
var previousCount;

var fait = false;
var pause = false;
var readyLeft = true;
var readyRight = true;

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

    readyLeft = false;
    readyRight = false;

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

        readyLeft = true;
        readyRight = true;
    }, 500);
}

function slidePrecedente() {
    document.getElementById("slider-left").removeEventListener("click", slidePrecedente);
    document.getElementById("slider-right").removeEventListener("click", slideSuivante);
    //document.getElementById("slider-container").removeEventListener("touchmove", swipe, true);

    document.querySelectorAll("#slider-nav li").forEach(item => {
        item.removeEventListener("click", handler, true);
    });

    readyLeft = false;
    readyRight = false;

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

        readyLeft = true;
        readyRight = true;

    }, 500);
}

function slideX(index) {
    document.getElementById("slider-left").removeEventListener("click", slidePrecedente);
    document.getElementById("slider-right").removeEventListener("click", slideSuivante);
    //document.getElementById("slider-container").removeEventListener("touchmove", swipe, true);

    document.querySelectorAll("#slider-nav li").forEach(item => {
        item.removeEventListener("click", handler, true);
    });

    readyLeft = false;
    readyRight = false;

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

        setTimeout(() => {
            readyLeft = true;
            readyRight = true;
        }, 100);

    }, 500);

}

function nav() {

    if (window.matchMedia("(max-width: 991px)").matches) {
        if (!fait) {
            fait = true;

            document.getElementById("navigation").classList.remove("fadeIn");
            document.getElementById("navigation").style.animationDuration = "0s";
            document.getElementById("navigation").classList.add("fadeOut");

            //prevent fadeOut on resize
            setTimeout(function() {
                document.getElementById("navigation").style.animationDuration = "250ms";
            }, 250);

            document.getElementById("menu").classList.remove("change");
            document.querySelector("html").style.overflowY = "auto";
        }
    } else {
        document.getElementById("navigation").style.display = null;
        document.getElementById("navigation").classList.remove("fadeOut");
        document.getElementById("navigation").classList.remove("fadeIn");
        fait = false;
    }

    if (!mobile) {

        document.querySelectorAll(".reseaux-sociaux i").forEach(reseauTag => {
            reseauTag.addEventListener("mouseenter", function() {
                reseauTag.parentNode.children[1].classList.remove("fadeOut");
                reseauTag.parentNode.children[1].classList.add("fadeIn");
            });

            reseauTag.addEventListener("mouseleave", function() {
                reseauTag.parentNode.children[1].classList.remove("fadeIn");
                reseauTag.parentNode.children[1].classList.add("fadeOut");
            });
        });
    }

    if (window.matchMedia("(max-width: 400px)").matches) {
        var heightSlider = 0;

        document.querySelectorAll(".slider-description").forEach(items => {
            next = (items.querySelector(".slider-description h3").offsetHeight + items.querySelector(".slider-description ul").offsetHeight);
            if (next > heightSlider)
                heightSlider = next;
        });

        document.getElementById("slider-container").style.height = heightSlider + 80 /*marge pour afficher le ol */ + "px";
    } else {
        document.getElementById("slider-container").style.height = null;
    }
}

function showNav() {
    if (window.matchMedia("(max-width: 991px)").matches) {
        fait = true;
        if (document.getElementById("navigation").classList.contains("fadeIn")) { //.style.display !== "none") {
            document.getElementById("navigation").classList.add("fadeOut");
            document.getElementById("navigation").classList.remove("fadeIn");

            document.getElementById("menu").classList.remove("change");
            document.querySelector("html").style.overflowY = "auto";
        } else {
            document.getElementById("navigation").classList.add("fadeIn");
            document.getElementById("navigation").classList.remove("fadeOut");
            document.getElementById("menu").classList.add("change");
            document.querySelector("html").style.overflowY = "hidden";
        }
    }
}

var handler = function(e) {
    slideX(e.target.id);
}

document.getElementById("menu").addEventListener("click", showNav);
document.getElementById("slider-left").addEventListener("click", slidePrecedente);
document.getElementById("slider-right").addEventListener("click", slideSuivante);

var swiper = new Swipe(document.getElementById('slider-container'));

swiper.onLeft(function() {

    if (readyLeft) {
        pause = true;
        slideSuivante();

        setTimeout(function() {
            pause = false;
        }, 3000);
    }
});

swiper.onRight(function() {
    if (readyRight) {
        pause = true;
        slidePrecedente();

        setTimeout(function() {
            pause = false;
        }, 3000);
    }
});

document.querySelectorAll("header .nav-link").forEach(link => {
    link.addEventListener("click", function() {
        document.querySelectorAll("header nav ul").forEach(item => {
            item.querySelector(".active").classList.remove("active");
        });

        this.classList.add("active");
    });
});

document.querySelectorAll("footer .second-nav-link").forEach(link => {
    link.addEventListener("click", function() {
        document.querySelectorAll("header nav ul").forEach(headerItem => {
            headerItem.querySelector(".active").classList.remove("active");
        });

        var clickedLink = this;
        document.querySelectorAll("header nav ul li a").forEach(item => {
            if (item.href == clickedLink.href) {
                item.classList.add("active");
            }
        });
    });
});

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", showNav);
});

document.querySelectorAll("#slider-nav li").forEach(link => {
    link.addEventListener("click", handler, true);
});

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

window.addEventListener("load", function() {

    //timeout 10ms pour attendre que la page est refresh pour scroll to top
    setTimeout(function() {
        document.querySelector("html").scrollTop = 0;
        document.querySelector("html").style.scrollBehavior = "smooth";
        document.querySelector("html").style.overflowY = "auto";
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

        document.getElementById("loader").classList.add("fadeOut");
    }, 250);

    nav();

    swiper.run();

    //si animation sur le slider, attendre qu'il apparaisse pour commencer l'auto swipe
    if (window.matchMedia("(min-width: 768px)").matches) {
        document.addEventListener('aos:in', ({ detail }) => {
            if (detail.id === "slider-container") {
                setInterval(function() {
                    if (!pause)
                        slideSuivante();
                }, 3000);
            }
        });
    } else {
        setInterval(function() {
            if (!pause)
                slideSuivante();
        }, 3000);
    }

});

window.addEventListener("resize", nav);
window.addEventListener("orientationchange", nav);