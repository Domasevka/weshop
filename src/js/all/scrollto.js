$(document).ready(function() {

    $(window).scroll(function(){
        if ($(this).scrollTop() > 200) {
            $('.js-to-top').fadeIn();
        } else {
            $('.js-to-top').fadeOut();
        }
    });

    //Click event to scroll to top
    $('.js-to-top').click(function(){
        $('html, body').animate({scrollTop : 0},800);
        event.preventDefault();
    });

});
