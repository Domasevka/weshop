"use strict";
$(document).ready(function () {


//mobile menu
//bower install jquery-nav-scroll

   /* $('.main-nav').navScroll({
        mobileDropdown: true,
        mobileBreakpoint: 768
    });

    $('.main-nav').on('click', '.main-nav__mobile', function (e) {
        e.preventDefault();
        $('.main-nav__list').slideToggle('fast');
    });*/



// Product slider

    $('.product__slider-single').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: false,
        adaptiveHeight: true,
        infinite: false,
        useTransform: true,
        speed: 400,
        cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)'
    });

    $('.product__slider-nav')
        .on('init', function(event, slick) {
            $('.product__slider-nav .slick-slide.slick-current').addClass('is-active');
        })
        .slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: false,
            focusOnSelect: false,
            infinite: false,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 420,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });

    $('.product__slider-single').on('afterChange', function(event, slick, currentSlide) {
        $('.showcase__slider-nav').slick('slickGoTo', currentSlide);
        var currrentNavSlideElem = '.showcase__slider-nav .slick-slide[data-slick-index="' + currentSlide + '"]';
        $('.product__slider-nav .slick-slide.is-active').removeClass('is-active');
        $(currrentNavSlideElem).addClass('is-active');
    });

    $('.product__slider-nav').on('click', '.slick-slide', function(event) {
        event.preventDefault();
        var goToSingleSlide = $(this).data('slick-index');

        $('.product__slider-single').slick('slickGoTo', goToSingleSlide);
    });


// Product tabs
    $( function() {
        var tabs = document.getElementsByClassName('tabs__item');
        var contents = document.getElementsByClassName('tabs__pane');


        for (let i = 0; i < tabs.length; i++) {
            tabs[i].addEventListener('click' ,function(){

                document.querySelector('.tabs_active').classList.remove('tabs_active');
                contents[i].classList.add("tabs_active")
            });

        }

        for (let i = 0; i < tabs.length; i++) {
            tabs[i].addEventListener('click', function () {

                document.querySelector('.tabs__item_active').classList.remove('tabs__item_active');
                tabs[i].classList.add("tabs__item_active")
            })
        }
    } );

    // shop slider
    $( function() {
        $( "#slider-range" ).slider({
            range: true,
            min: 0,
            max: 500,
            values: [ 75, 300 ],
            slide: function( event, ui ) {
                $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
            }
        });
        $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
            " - $" + $( "#slider-range" ).slider( "values", 1 ) );
    } );


    initServicesSlider();
    //initProductSlider();
});


// Services slider
function initServicesSlider() {
    var $slider = $('.products__column-wrap'),
        settings = {
            slidesToShow: 4,
            slidesToScroll: 4,
            prevArrow     : '<button class="btn btn_left">' +
            '<svg class="svg-arrow"><use xlink:href="#left-arrow"></use></svg></button>',
            nextArrow     : '<button class="btn btn_right">' +
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








