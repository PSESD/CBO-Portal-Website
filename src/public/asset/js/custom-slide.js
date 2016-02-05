$(document).ready(function () {
    'use strict';
    var status = 'open';
    var menuLeft = document.getElementById('cbp-spmenu-s1'),
        showLeftPush = document.getElementById('showLeftPush'),
        sidebarmenu = document.getElementById('collapse-sidebarmenu'),
        body = document.body;
    if (showLeftPush) {
        showLeftPush.onclick = function () {
            var icon = $("#showLeftPush").attr('class');
            classie.toggle(this, 'active');
            classie.toggle(body, 'cbp-spmenu-push-toright');
            classie.toggle(menuLeft, 'cbp-spmenu-open');
            if (icon === "glyphicon glyphicon-menu-hamburger") {
                $("#showLeftPush").attr('class', 'glyphicon glyphicon-remove');
            } else if (icon === "glyphicon glyphicon-remove") {
                $("#showLeftPush").attr('class', 'glyphicon glyphicon-menu-hamburger');
            }
        };
    }
    if (sidebarmenu) {
        sidebarmenu.onclick = function () {

            //if (status === 'open') {
                $('#collapse-sidebarmenu').removeClass('glyphicon glyphicon-remove');
                $('#collapse-sidebarmenu').addClass('glyphicon glyphicon-menu-hamburger');
                $('#side-panel').addClass('hide');
                $('.link-nav').css({
                    'display': 'none'
                });
                $('#border').css({
                    'display': 'none'
                });
                //$('#desktop-nav').css({
                //    'width': '3%'
                //});
                $('#collapse-sidebarmenu').addClass('icon-collapse-menu');
                //$('#center-panel').css({
                //    'margin-left': '0px'
                //});
                $('#rootDoc').removeClass('center-panel');
                status = 'close';
                $('#footer').addClass('hide');
                $('.confidentiality-footer').css({'margin-left':'0px'});
                $('.version').css({'margin-left':'0px'});
                $('#sidebar-open-btn').css({'z-index':'999'});

            //} else if (status === 'close') {
            //
            //    $('#collapse-sidebarmenu').removeClass('glyphicon glyphicon-menu-hamburger');
            //    $('#collapse-sidebarmenu').addClass('glyphicon glyphicon-remove');
            //    $('.link-nav').css({
            //        'display': ''
            //    });
            //    $('#border').css({
            //        'display': ''
            //    });
            //    $('#desktop-nav').css({
            //        'width': '15%'
            //    });
            //    $('#desktop-nav').css({
            //        'position': 'fixed'
            //    });
            //    $('#desktop-nav').css({
            //        'height': '100%'
            //    });
            //    $('#collapse-sidebarmenu').removeClass('icon-collapse-menu');
            //    $('#collapse-sidebarmenu').addClass('icon-sidebarmenu');
            //    $('#center-panel').css({
            //        'margin-left': '15%'
            //    });
            //    status = 'open';
            //    $('#footer').removeClass('hide');
            //    $('.confidentiality-footer').css({'margin-left':'15.8%'});
            //    $('.version').css({'margin-left':'15.8%'});
            //    $('#sidebar-open-btn').css({'z-index':'-999'});
            //}

        };
    }
});
