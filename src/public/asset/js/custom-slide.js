$(document).ready(function () {
    'use strict';
    var status = 'open';
    var mobile_menu_status = "close";
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


        };
    }

    $("#mobile-button").on("click",function(){
        if(mobile_menu_status === "close"){
            $("ul.vertical-menu").slideDown( "slow" );
            mobile_menu_status = "open";
        }else{
            $("ul.vertical-menu").slideUp();
            mobile_menu_status = "close";
        }

    });
    $("li.vertical-menu-item").on("click",function(){
        $("ul.vertical-menu").slideUp();
    });
});
