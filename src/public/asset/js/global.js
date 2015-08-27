$(document).ready(function () {



    window.intercomSettings = {
        app_id: "m9w2ywgr"
    };

    if (typeof env !== 'undefined' && env == 'production') {

        (function () {
            var w = window;
            var ic = w.Intercom;
            console.log(ic);
            if (typeof ic === "function") {
                ic('reattach_activator');
                ic('update', intercomSettings);
            } else {
                var d = document;
                var i = function () {
                    i.c(arguments)
                };
                i.q = [];
                i.c = function (args) {
                    i.q.push(args)
                };
                w.Intercom = i;

                function l() {
                    var s = d.createElement('script');
                    s.type = 'text/javascript';
                    s.async = true;
                    s.src = 'https://widget.intercom.io/widget/m9w2ywgr';
                    var x = d.getElementsByTagName('script')[0];
                    x.parentNode.insertBefore(s, x);
                    console.log(x);
                }
                if (w.attachEvent) {
                    w.attachEvent('onload', l);
                } else {
                    w.addEventListener('load', l, false);
                }
            }
        })()
    }

    if ($(window).width() < 776) {
        $("#mobile").css({
            "display": ""
        });
        $("#desktop").css({
            "display": "none"
        });
        $(document.body).find('#login-container').removeClass('login-page');
    } else if ($(window).width() > 776) {
        $("#mobile").css({
            "display": "none"
        });
        $("#desktop").css({
            "display": ""
        });
        $(document.body).find('#login-container').addClass("login-page");
    }


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


    $(window).on("resize", function () {
        /*
        if ($(window).width() > 767 && $('.navbar-toggle').is(':hidden')) {
            $(selected2).removeAttr('style');
            $(selected).removeClass('slide-active');
			$('#dashboard-menu').hide();
			$('#slide-menu').removeAttr('class');
			$('#slide-menu').addClass('collapse-icon glyphicon glyphicon-remove');
			$('#slide-menu').show();
            $('#sign_in_button').removeClass('button btn-block');
            $('#sign_in_button').addClass('button');
        }
		else if ($(window).width() < 767)
		{
			$('#dashboard-menu').hide();
			$('#slide-menu').hide();
			$('#navbar').show();
            $('#sign_in_button').addClass('btn-block');
		}
		*/

        if ($(window).width() < 776) {
            $("#mobile").css({
                "display": ""
            });
            $("#desktop").css({
                "display": "none"
            });
            $(".col-md-offset-4.col-md-5").removeClass("login-page");
        } else if ($(window).width() > 776) {
            $("#mobile").css({
                "display": "none"
            });
            $("#desktop").css({
                "display": ""
            });
            $(".col-md-offset-4.col-md-5").addClass("login-page");
        }

        if ($(window).width() > 990 && $(window).width() < 1600) {
            $("a#forgot_button").addClass("btn-block");
        } else {
            $("a#forgot_button").removeClass("btn-block");
        }

    });
    $('.collapse-icon').on("click", function () {
        if (isCollapse == false) {
            $('#slide-menu').removeAttr('class');
            $('#slide-menu').addClass('collapse-icon glyphicon glyphicon-menu-hamburger');
            $('.navbar').hide();
            $('#dashboard-menu').show();
            isCollapse = true;
        } else if (isCollapse == true) {
            isCollapse = false;
            $('#slide-menu').removeAttr('class');
            $('#slide-menu').addClass('collapse-icon glyphicon glyphicon-remove');
            $('.navbar').show();
            $('#dashboard-menu').hide();
        }
    });

    $('#school-history-close').on('click', function () {
        $('#academic').show();


    });

    $('#school-history-open').on('click', function () {

        $('#school-history').show();
    });

});

function hideContent(curr) {
    jQuery(curr).parent().find('div.data-content').hide();
    jQuery(curr).parent().find('#content-help').hide();
    jQuery(curr).parent().find('.menu-up').hide();
    jQuery(curr).parent().find('.menu-down').show();
}

function showContent(curr) {
    jQuery(curr).parent().find('div.data-content').show();
    jQuery(curr).parent().find('#content-help').show();
    jQuery(curr).parent().find('.menu-up').show();
    jQuery(curr).parent().find('.menu-down').hide();
}
