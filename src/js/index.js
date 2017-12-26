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
//product specs

$(".js-product-specs__btn").on("click", function (e) {
    var $button = $(this);
    var oldValue = $button.parent().find('.js-product-btn').val();
    $button.parent().find('.js-product-specs__btn[data-action="decrease"]').removeClass('js-btn_active');
    if ($button.data('action') == "increase") {
        var newVal = parseFloat(oldValue) + 1;
    } else {
        // Don't allow decrementing below 1
        if (oldValue > 1) {
            var newVal = parseFloat(oldValue) - 1;
        } else {
            newVal = 1;
            $button.addClass('js-btn_active');
        }
    }
    $button.parent().find('.js-product-btn').val(newVal);
    e.preventDefault();
});

//product slider

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
        var tabs = document.getElementsByClassName('js-tabs__item');
        var contents = document.getElementsByClassName('js-tabs__pane');


        for (let i = 0; i < tabs.length; i++) {
            tabs[i].addEventListener('click' ,function(){

                document.querySelector('.js-tabs_active').classList.remove('js-tabs_active');
                contents[i].classList.add("js-tabs_active")
            });
        }

        for (let i = 0; i < tabs.length; i++) {
            tabs[i].addEventListener('click', function () {

                document.querySelector('.js-tabs__item_active').classList.remove('js-tabs__item_active');
                tabs[i].classList.add("js-tabs__item_active")
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




    initHeaderSlider();
    initServicesSlider();
    initCategorySlider();
    initProductSlider();
    initBrandsSlider();
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

// Header slider
function initHeaderSlider() {
    var mySwiper = new Swiper('.header-slider__container', {
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 50,
        navigation: {
            nextEl: '.header-button__next',
            prevEl: '.header-button__prev'
        }
    });
}


// Services slider
function initServicesSlider() {
    var mySwiper = new Swiper('.services-slider__container', {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 0,
        navigation: {
            nextEl: '.services-button__next',
            prevEl: '.services-button__prev'
        },

        breakpoints: {
            768: {
                slidesPerView: 1
            }
        }

    });
}

// Category-slider
function initCategorySlider() {
    var swiper = new Swiper('.category-slider__container', {
        //loop: true,
        slidesPerView: 4,
        spaceBetween: 0,
        navigation: {
            nextEl: '.category-button__next',
            prevEl: '.category-button__prev'
        },

        breakpoints: {
            768: {
                slidesPerView: 1
            }
        }
    });
}

// Product-slider
function initCategorySlider() {
    var swiper = new Swiper('.category-slider__container', {
        //loop: true,
        slidesPerView: 4,
        spaceBetween: 0,
        navigation: {
            nextEl: '.category-button__next',
            prevEl: '.category-button__prev'
        },

        breakpoints: {
            768: {
                slidesPerView: 1
            }
        }
    });
}

function initProductSlider() {
    var galleryTop = new Swiper('.gallery-top', {
        spaceBetween: 0,
        navigation: {
            nextEl: '.product-button__next',
            prevEl: '.product-button__prev'
        }
    });
    var galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 3,
        touchRatio: 0.2,
        slideToClickedSlide: true
    });
    galleryTop.controller.control = galleryThumbs;
    galleryThumbs.controller.control = galleryTop;
}

function initBrandsSlider() {
    var mySwiper = new Swiper('.svg-slider__container', {
        slidesPerView: 6,
        spaceBetween: 0,
        centeredSlides: false,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        },
       /* pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },*/

        breakpoints: {
            768: {
                slidesPerView: 2
            }
        }
    });
}







