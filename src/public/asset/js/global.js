'use strict';

$(document).ready(function () {


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


    $(window).on("resize", function () {

        if ($(window).width() > 767 && $('.navbar-toggle').is(':hidden')) {
            $(selected2).removeAttr('style');
            $(selected).removeClass('slide-active');
        }

    });
	$('.collapse-icon').on("click",function(){
		if(isCollapse == false){
			$(".navbar").animate({width:"45px"});
			$(".navbar-header").hide();
			$("#slidemenu").hide();
			isCollapse = true;
		}else if(isCollapse==true){
			$(".navbar").animate({width:"290px"});
			$(".navbar-header").show();
			$("#slidemenu").show();
			isCollapse = false;
		}
	});
	
	
});

function hideContent(curr)
{
    jQuery(curr).parent().find('div.data-content').hide();
    jQuery(curr).parent().find('.menu-up').hide();
    jQuery(curr).parent().find('.menu-down').show();
}

function showContent(curr)
{
    jQuery(curr).parent().find('div.data-content').show();
    jQuery(curr).parent().find('.menu-up').show();
    jQuery(curr).parent().find('.menu-down').hide();
}