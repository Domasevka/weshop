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

// catalog slider
    $( function() {
       // var a = 0;
        $(".slider").each(function() {
            $(this).slider({
                range: true,
                min   : $(this).data('min'),
                max   : $(this).data('max'),
                step  : 1,
                //values : 15,
                values: [ 15, 300 ],
                slide : function (event, ui) {
                    //a = ui.value;
                    $(this).next().find('span.slider-value').html( ui.values[ 0 ] + "$  - " );
                    $(this).next().find('span.slider-value_second').html(ui.values[ 1 ] + "$");
                }
            });
        });

        $(".send").click(function () {
            alert("first -- " + $(".slider-value").first().text());
            alert("last -- " + $(".slider-value").last().text());
        });
       /* $( "#slider_price" ).slider({
            range: true,
            min: 0,
            max: 500,
            values: [ 15, 300 ],
            slide: function( event, ui ) {
                $( "#price" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
            }
        });
        $( "#price" ).val( "$" + $( "#slider_price" ).slider( "values", 0 ) +
            " - $" + $( "#slider_price" ).slider( "values", 1 ) );*/
    } );





    initServicesSlider();
    initHeaderSlider();
});

//catalog checked size

    $('.cat-nav__description').click(function() {
        if($(this).parent().find('input[type="checkbox"]').is(':checked'))
        {
            $(this).parent().find('input[type="checkbox"]').prop('checked', false);
        }
        else
        {
            $(this).parent().find('input[type="checkbox"]').prop('checked', true);
        }
    });


// pagination
    $(function () {
        window.pagObj = $('.js-pagination').twbsPagination({
            totalPages: 6,
            visiblePages: 5,
            first: '',
            prev: 'Prev',
            next: 'Next',
            last: '',
            onPageClick: function (event, page) {
                console.info(page + ' (from options)');
            }
        }).on('page', function (event, page) {
            console.info(page + ' (from event listening)');
        });
    });

// This button will increment the value
    $( function() {
        $('.btn_plus').click(function(e){
            // Stop acting like a button
            e.preventDefault();
            // Get the field name
            fieldName = $(this).attr('data-field');
            // Get its current value
            var currentVal = parseInt($('input[name='+fieldName+']').val());
            // If is not undefined
            if (!isNaN(currentVal)) {
                // Increment
                $('input[name='+fieldName+']').val(currentVal + 1);
            } else {
                // Otherwise put a 0 there
                $('input[name='+fieldName+']').val(0);
            }
        });

        // This button will decrement the value till 0
        $(".btn_minus").click(function(e) {
            // Stop acting like a button
            e.preventDefault();
            // Get the field name
            fieldName = $(this).attr('data-field');
            // Get its current value
            var currentVal = parseInt($('input[name='+fieldName+']').val());
            // If it isn't undefined or its greater than 0
            if (!isNaN(currentVal) && currentVal > 0) {
                // Decrement one
                $('input[name='+fieldName+']').val(currentVal - 1);
            } else {
                // Otherwise put a 0 there
                $('input[name='+fieldName+']').val(0);
            }

        } );
    } );
// header slider
function initHeaderSlider() {
    var mySwiper = new Swiper('.header-slider__container', {
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 50,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });
}


// Services slider
function initServicesSlider() {
    var mySwiper = new Swiper('.services-slider__container', {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 0,
        autoHeight: true,
        navigation: {
            nextEl: '.services-slider__next',
            prevEl: '.services-slider__prev'
        },

        breakpoints: {
            768: {
                slidesPerView: 1
            }
        }

    });
}



/*function initServicesSlider() {
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
}*/








