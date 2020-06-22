//scroll reveal animation

// new W0W().init();

$(function(){
    $('.menu-toggle, .fa-times').on('click', function(){
        $('nav').toggleClass('active');
        $('.overlay2').toggleClass('menu-open');
    });
    $('.overlay').on('click', function(){
        $('nav').removeClass('active');
        $('this').removeClass('menu-open');
    });
});


// form start

// fort end