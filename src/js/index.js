"use strict";
$(document).ready(function () {


//mobile menu
//bower install jquery-nav-scroll

    $('.main-nav').navScroll({
        mobileDropdown: true,
        mobileBreakpoint: 768
    });

    $('.main-nav').on('click', '.main-nav__mobile', function (e) {
        e.preventDefault();
        $('.main-nav__list').slideToggle('fast');
    });

    initServicesSlider();
});


// Services slider

function initServicesSlider() {
    var $slider = $(''),
        settings = {
            slidesToShow: 3,
            slidesToScroll: 3,
            prevArrow     : '<button class="services__btn services__btn_left">' +
            '<svg class="svg-arrow"><use xlink:href="#left-arrow"></use></svg></button>',
            nextArrow     : '<button class="services__btn services__btn_right">' +
            '<svg class="svg-arrow"><use xlink:href="#left-arrow"></use></svg></button>',
            arrows: true,
            dots: true,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        dots: false,
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 769,
                    settings: {
                        dots: false,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 544,
                    settings: {
                        arrows: false,
                        dots: false,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
    $slider.slick(settings);
}








