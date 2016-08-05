var screen = '';
var global_redirect_url = '/';
var userStatus="";
$(document).ready(function () {
    'use strict';
    var screen_w = $(window).width();
    var urlPath = window.location.href;

    $(".dropdown-menu").mouseout(function(){
        $(".dropdown-menu").hide();
    });

    $('#dashboard-menu').hide();

    //stick in the fixed 100% height behind the navbar but don't wrap it
    $('#navbar.navbar-inverse').after($('<div class="inverse" id="navbar-height-col"></div>'));

    $('#navbar.navbar-default').after($('<div id="navbar-height-col"></div>'));

    // Enter your ids or classes
    var toggler = '.navbar-toggle';
    var pagewrapper = '#page-content';
    var navigationwrapper = '.navbar-header';
    var menuwidth = '100%'; // the menu inside the slide menu itself
    var slidewidth = '80%';
    var menuneg = '-200%';
    var slideneg = '-80%';
    var isCollapse = false;


    $("#navbar").on("click", toggler, function (e) {

        var selected = $(this).hasClass('slide-active');

        $('#slidemenu').stop().animate({
            left: selected ? menuneg : '0px'
        });

        $('#navbar-height-col').stop().animate({
            left: selected ? slideneg : '0px'
        });

        $(pagewrapper).stop().animate({
            left: selected ? '0px' : slidewidth
        });

        $(navigationwrapper).stop().animate({
            left: selected ? '0px' : slidewidth
        });


        $(this).toggleClass('slide-active', !selected);
        $('#slidemenu').toggleClass('slide-active');


        $('#page-content, .navbar, body, .navbar-header').toggleClass('slide-active');

    });

    var selected = '#slidemenu, #page-content, body, .navbar, .navbar-header, .navbar-toggle';
    var selected2 = '.navbar-header, #slidemenu, #navbar-height-col, #page-content';

    $(document).on('click.nav','.navbar-collapse.in',function(e) {
        if( $(e.target).is('a') ) {
            $(this).removeClass('in').addClass('collapse');
        }
    });

    $('#school-history-close').on('click', function () {
        $('#academic').show();
    });

    $('#school-history-open').on('click', function () {
        $('#school-history').show();
    });

});