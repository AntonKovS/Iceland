$(document).ready(function () {
    'use strict';

    let headerMenu = $('#header-menu');

    $('#header-menu-hidden').click(() => {
        headerMenu.addClass('open');
    });

    $('#header-menu > *').click(() => {
        headerMenu.removeClass('open');
    });

    $('.block6-sched').slick({
        dots: false,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true
    });

    $('.block7-feedback').slick({
        dots: false,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true
    });

    let galery = $('.block8-gal');

    galery.slick({
        dots: true,
        infinite: true,
        speed: 500,
        cssEase: 'linear',
        variableWidth: true,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1499, // размер экрана 1024
                settings: {
                    variableWidth: false,
                    slidesToShow: 1, // тут меняем slidesToShow
                    slidesToScroll: 1
                }
            }
        ]
    });


    $(window).ready(function(){
        let route1 = $('.block3-route-svg-320');
        let route3 = $('.block3-route-svg');
        let windowWidth = $('body').innerWidth();
        if (windowWidth > 1700){route3.attr('viewBox', '0 0 1900 606');}
        else if (windowWidth < 1699 && windowWidth > 1500){route3.attr('viewBox', '100 0 1700 606');}
        else if (windowWidth < 1499 && windowWidth > 1300){route3.attr('viewBox', '200 0 1500 606');}
        else if (windowWidth < 1299 && windowWidth > 1100){route3.attr('viewBox', '300 0 1300 606');}
        else {route3.attr('viewBox', '370 0 1200 606');}
        if (windowWidth > 650){route1.attr('viewBox', '100 0 850 1073');}
        else if (windowWidth < 650 && windowWidth > 500){route1.attr('viewBox', '200 0 670 1073');}
        else if (windowWidth < 500 && windowWidth > 400){route1.attr('viewBox', '250 0 550 1073');}
        else {route1.attr('viewBox', '380 0 310 1073');route1.css('margin-top', '-80px');}
    });

    $(window).resize(function(){
        let route1 = $('.block3-route-svg-320');
        let route3 = $('.block3-route-svg');
        let windowWidth = $('body').innerWidth();
        if (windowWidth > 1700){route3.attr('viewBox', '0 0 1900 606');}
        else if (windowWidth < 1699 && windowWidth > 1500){route3.attr('viewBox', '100 0 1700 606');}
        else if (windowWidth < 1499 && windowWidth > 1300){route3.attr('viewBox', '200 0 1500 606');}
        else if (windowWidth < 1299 && windowWidth > 1100){route3.attr('viewBox', '300 0 1300 606');}
        else {route3.attr('viewBox', '370 0 1200 606');}
        if (windowWidth > 650){route1.attr('viewBox', '100 0 850 1073');}
        else if (windowWidth < 650 && windowWidth > 500){route1.attr('viewBox', '200 0 670 1073');}
        else if (windowWidth < 500 && windowWidth > 400){route1.attr('viewBox', '250 0 550 1073');}
        else {route1.attr('viewBox', '380 0 310 1073');route1.css('margin-top', '-80px');}
    });

    $('.block5-button').click(() => {
        $('.block5-cover').fadeOut();
        $('.block5-button').hide();
        $('.block5-vid')[0].src += "&autoplay=1";
    });

    galery.magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true,
            titleSrc: function (item) {
                return item.el.attr('title') + ' &middot; <a class="image-source-link" href="' + item.el.attr('data-source') + '" target="_blank">image source</a>';
            }
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function (element) {
                return element.find('img');
            }
        }
    });

    let phone = $('#phone');

    // phone.keydown((e) => {
    //     if (e.which === 8 || e.which === 46 || e.which === 37 || e.which === 39) {
    //     } else {
    //         if (isNaN(parseInt(e.key))) {
    //             return false;
    //         }
    //     }
    // });

phone.inputmask({"mask": "(999) 999-9999"});

$('#submit-1').click(function () {
        let hasError = false;
        let name = $('#name');
        let loader = $('.loader');

        $('.error-input').hide();
        $('.block9-form-input').css('border-color', 'unset');

        if (!name.val()) {
            name.css('border-color', 'red');
            name.next().show();
            hasError = true;
        }

        if (!phone.val()) {
            phone.css('border-color', 'red');
            phone.next().show();
            hasError = true;
        }

        if (!hasError) {
            loader.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: {name: name.val(), phone: phone.val()}
            })
                .done(function (msg) {
                    //             // console.log(msg);
                    loader.hide();
                    if (msg.success) {
                        //                 $('.block4-form').hide();
                        $('.block9-form-thx').css('display', 'flex');
                        name.val('');
                        phone.val('');
                    } else {
                        alert('Не получается оформить заказ, позвоните нам по телефону');
                    }
                });
        }
    });

});