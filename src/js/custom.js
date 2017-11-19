// header main navigation
document.getElementById('main-nav').querySelector('ul').insertAdjacentHTML("beforebegin", "<span id='navbarTogglerIcon'><span>Menu</span></span>");
var navbarTogglerIcon = document.getElementById("navbarTogglerIcon");
var activeClass = "active"

navbarTogglerIcon.onclick = function (event) {
    navbarTogglerIcon.classList.toggle(activeClass);
    var element = document.querySelectorAll("#main-nav span.dropdown, #main-nav ul.dropdown");
    var i;

    for (i = 0; i < element.lenght; i++) {
        element[i].classList.remove(activeClass);
    }
    event.preventDefault();
};

var forEach = function (array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]);
    }
};

forEach(document.querySelectorAll("#main-nav span.dropdown"), function (index, value) {
    value.addEventListener('click', function() {
        if ( navbarTogglerIcon.offsetWidth > 0 && navbarTogglerIcon.offsetHeight > 0 ) {
            value.classList.toggle(activeClass);    
        }
    })
});

function hideMenu() {
    var element = document.querySelectorAll("#navbarTogglerIcon, #navbarTogglerIcon + ul, #main-nav span.dropdown, #main-nav ul.submenu");
    var i;
    for (i = 0; i < element.lenght; i++) {
        element[i].classList.remove(activeClass);
    }
}

document.addEventListener('click', function(e) {
    if ( navbarTogglerIcon.offsetWidth > 0 && navbarTogglerIcon.offsetHeight > 0 ) {
        var e=e? e : window.event;
        var event_element=e.target? e.target : e.srcElement;
        if (!event_element.closest("#main-nav")) {
            if (navbarTogglerIcon.classList.contains(activeClass)) {
                hideMenu();
            }
        }        
    }
}, false);

var resizeTimer;
window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        if ( navbarTogglerIcon.offsetWidth <= 0 && navbarTogglerIcon.offsetHeight <=  0 ) {
            hideMenu();
        }
    }, 250);
}, false);

// dropdown select toggle
forEach(document.querySelectorAll(".dropdown_list span.dropdown"), function (index, value) {
    value.addEventListener('click', function() {
        if ( !value.classList.contains(activeClass) ) {
            var el = document.querySelectorAll(".dropdown_list span.dropdown");
            var i;
            for (i = 0; i < el.length; i++) {
                el[i].classList.remove(activeClass);
            }
            value.classList.toggle(activeClass);
        } else
        if ( value.classList.contains(activeClass) ) {
            value.classList.remove(activeClass);
        }
    })
});

document.addEventListener('click', function(e) {
    // dropdown select toggle
    var el = document.querySelectorAll(".dropdown_list span.dropdown")
    var e=e? e : window.event;
    var event_element=e.target? e.target : e.srcElement;
    if (!event_element.closest(".dropdown_list")) {
        var i;
        for (i = 0; i < el.length; i++) {
            el[i],classList.remove(activeClass);
        }
    }
}, false);

// slider
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide");
    var circles = document.getElementsByClassName("circle");

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}

    for (i = 0; i < slides.length; i ++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < circles.length; i++) {
        circles[i].className = circles[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    circles[slideIndex-1].className += " active";
}