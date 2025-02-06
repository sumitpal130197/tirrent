/*------------------------------------------------------------------
jQuery document ready
-------------------------------------------------------------------*/
$(document).ready(function() {
    "use strict";
    // GET PAGE ID
    var pageid = $('.page').data("page");

    // LOAD PANEL LEFT
    $("#panel-left").load("panel-left.html", function() {
        var swipersubnav = new Swiper('.panel__navigation', {
            direction: 'horizontal',
            effect: 'slide',
            slidesPerView: 1,
            slidesPerGroup: 1
        });
        swipersubnav.on('slideChangeTransitionEnd', function() {
            $(".panel").animate({
                scrollTop: 0
            }, "slow");
        });
        $(".opensubnav").on('click', function(e) {
            swipersubnav.slideNext();
        });
        $(".backtonav").on('click', function(e) {
            swipersubnav.slidePrev();
        });
        $(".closepanel").on('click', function(e) {
            $('.header__icon--menu').removeClass('open');
            $('.panel--left').css({
                display: ''
            }).removeClass('active');
            $(".body-overlay").css({
                display: ''
            }).removeClass('active');
            $('body').addClass('panel-closing').removeClass('with-panel-left-reveal');
        });
    });


    //LOAD SOCIAL POPUP
    $("#popup-social").load("popup-social.html");

    //LOAD ALERT POPUP
    $("#popup-alert").load("popup-alert.html");

    //LOAD NOTIFICATIONS POPUP
    $("#popup-notifications").load("popup-notifications.html");

    //LOAD BOTTOM NAVIGATION
    $("#bottom-toolbar").load("bottom-navigation.html", function() {
        var swipernav = new Swiper('.swiper-toolbar', {
            direction: 'horizontal',
            effect: 'slide',
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 0,
            /* 			pagination: {
            			el: '.bottom-navigation__pagination'
            			}, */
            on: {
                reachEnd: function() {
                    $('.bottom-navigation__more').hide();
                },
                reachBeginning: function() {
                    $('.bottom-navigation__more').show();
                },
            }
        });
        $(".bottom-navigation").on('click', '.bottom-navigation__more', function() {
            swipernav.slideNext();
        });
    });



    //OPEN PANEL ACTION
    $(document).on('click', '.open-panel', function() {
        var panelPosition = $(this).data("panel");
        var panel = $('.panel--' + panelPosition);
        var bodyOverlay = $('.body-overlay');
        panel.addClass('active');
        bodyOverlay.css({
            display: 'block'
        }).addClass('active');
        $('body').addClass('with-panel-' + panelPosition + '-reveal');
        $(".body-overlay").on('click', function(e) {
            $('.header__icon--menu').removeClass('open');
            panel.css({
                display: ''
            }).removeClass('active');
            $(this).css({
                display: ''
            }).removeClass('active');
            $('body').addClass('panel-closing').removeClass('with-panel-' + panelPosition + '-reveal');
        });

    });

    //OPEN POPUP ACTION
    $(document).on('click', '.open-popup', function() {
        var popupdata = $(this).data("popup");
        var popup = $('.popup--' + popupdata);
        popup.css({
            display: 'block'
        }).addClass('active');
    });
    //
    $(document).on('click', '.close-popup', function() {
        var popupdataclose = $(this).data("popup");
        var popupclose = $('.popup--' + popupdataclose);
        popupclose.removeClass('active');
    });


    $(document).on('click', '.header__icon--menu', function() {
        $(this).toggleClass('open');
    });

    $(".page__content").scroll(function() {
        var topposition = $(this).position().top;
        if ($(this).scrollTop() > topposition) {
            $('.header--change').addClass('header--page');
        } else {
            $('.header--change').removeClass('header--page');
        }
    });

    /*-------------- Page Index----------- */
    if (pageid == 'intro') {
        var swiperslider = new Swiper('.slider-intro', {
            direction: 'horizontal',
            effect: 'slide',
            parallax: true,
            pagination: {
                el: '.swiper-pagination'
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 2000,
            }
        });

    }

    /*-------------- Page Login----------- */
    if (pageid == 'login') {
        $("#LoginForm").validate();

    }

    /*-------------- Page sliders----------- */
    if (pageid == 'sliders') {
        var galleryLinks = new Swiper('.slider-init-top', {
            direction: 'horizontal',
            spaceBetween: 10,
            slidesPerView: "auto",
            slideToClickedSlide: true,
            centeredSlides: true,
        });

        var galleryImages = new Swiper('.slider-init-bottom', {
            spaceBetween: 0,
            slidesPerView: 1,
            pagination: {
                el: '.slider-init-bottom__pagination',
                type: "bullets",
            },

        });

        galleryLinks.controller.control = galleryImages;
        galleryImages.controller.control = galleryLinks;

    }

    /*-------------- Page Blog Single----------- */
    if (pageid == 'blogsingle') {
        var swipersliderpage = new Swiper('.swiper-container-pages', {
            direction: 'horizontal',
            effect: 'slide',
            parallax: true,
            pagination: {
                el: '.swiper-pagination'
            }
        });

    }


    /*-------------- Page Shop Cart----------- */
    if (pageid == 'buy') {

        $("#popup-success").load("popup-success.html");


        $('input:radio[name="payment"]').change(function() {
            $('.option-hidden').removeClass("show");
            if ($(this).val() == 'creditcard') {
                $('#show-credit-cards').addClass("show");
            }
            if ($(this).val() == 'paypal') {
                $('#show-paypal-info').addClass("show");
            }
        });


    }
    /*-------------- Page Contact----------- */
    if (pageid == 'contact') {
        $("#ContactForm").validate({
            submitHandler: function(form) {
                ajaxContact(form);
                return false;
            }
        });
    }

});


const inputs = document.querySelectorAll('.otp-input input');
const timerDisplay = document.getElementById('timer');
const resendLink = document.querySelector('.resend-link');
const emailSpan = document.getElementById('email');
let timeLeft = 120; // 2 minutes in seconds
let timerId;
let canResend = true;

// Simulating an email for demonstration
emailSpan.textContent = "user@example.com";

function startTimer() {
    timerId = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerId);
            timerDisplay.textContent = "Code expired";
            timerDisplay.classList.add('expired');
            inputs.forEach(input => input.disabled = true);
            canResend = false;
        } else {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerDisplay.textContent = `(${minutes}:${seconds.toString().padStart(2, '0')})`;
            timeLeft--;
        }
    }, 1000);
}

function resendOTP() {
    if (canResend) {
        alert("New OTP sent!");
        timeLeft = 120;
        inputs.forEach(input => {
            input.value = '';
            input.disabled = false;
        });
        inputs[0].focus();
        clearInterval(timerId);
        timerDisplay.classList.remove('expired');
        startTimer();
    } else {
        alert("Cannot resend code. Time has expired.");
    }
}

inputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        if (e.target.value.length > 1) {
            e.target.value = e.target.value.slice(0, 1);
        }
        if (e.target.value.length === 1) {
            if (index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.value) {
            if (index > 0) {
                inputs[index - 1].focus();
            }
        }
        if (e.key === 'e') {
            e.preventDefault();
        }
    });
});

function verifyOTP() {
    const otp = Array.from(inputs).map(input => input.value).join('');
    if (otp.length === 6) {
        if (timeLeft > 0) {
            alert(`Verifying OTP: ${otp}`);
        } else {
            alert('OTP has expired. Please request a new one.');
        }
    } else {
        alert('Please enter a 6-digit OTP');
    }
}

startTimer();