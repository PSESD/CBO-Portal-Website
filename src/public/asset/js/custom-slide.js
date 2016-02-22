$(document).ready(function(){
    var url = window.location.href;
    if(url.indexOf("login") > -1)
    {
        $("body").addClass("login");
    }else if( url.indexOf("forget") > -1)
    {
        $("body").addClass("forget");
    }
    if($(window).width()<992)
    {
        $("body").addClass("closed");
        if( $("button.navbar-toggle").hasClass("glyphicon glyphicon-remove")){
            $("button.navbar-toggle").removeClass("glyphicon glyphicon-remove");
            $("button.navbar-toggle").addClass("glyphicon glyphicon-menu-hamburger");
        }
    }else if($(window).width()>992)
    {
        $("body").addClass("opened");
        if( $("button.navbar-toggle").hasClass("glyphicon glyphicon-menu-hamburger")){

            $("button.navbar-toggle").removeClass("glyphicon glyphicon-menu-hamburger");
            $("button.navbar-toggle").addClass("glyphicon glyphicon-remove");
        }
    }
    $("button.navbar-toggle").on("click",function(){
        if( $("body").hasClass("closed")){

            $("button.navbar-toggle").removeClass("glyphicon-remove");
            $("button.navbar-toggle").addClass("glyphicon-menu-hamburger");
        }else{

            $("button.navbar-toggle").removeClass("glyphicon-menu-hamburger");
            $("button.navbar-toggle").addClass("glyphicon-remove");
        }
        if($(window).width()>992){
            if($("body").hasClass("opened")) {
                $("body.logged-in").addClass("close-sidebar");
                $("button.navbar-toggle").addClass("close-sidebar");
                $(".desktop").addClass("close-sidebar");
                $(".navbar").addClass("close-sidebar");
                $(".navbar-nav").addClass("close-sidebar");
                $(".footer").addClass("close-sidebar");
                $("body").removeClass("opened");
                $("body").addClass("closed");
            }else if($("body").hasClass("closed")) {
                $("body.logged-in").removeClass("close-sidebar");
                $("button.navbar-toggle").removeClass("close-sidebar");
                $(".navbar-nav").removeClass("close-sidebar");
                $(".desktop").removeClass("close-sidebar");
                $(".footer").removeClass("close-sidebar");
                $(".navbar").removeClass("close-sidebar");
                $("body").removeClass("closed");
                $("body").addClass("opened");
            }
        }
    });
});
$(window).resize(function () {
    var url = window.location.href;
    if($(window).width()<992)
    {
        if( $("button.navbar-toggle").hasClass("glyphicon-remove")){
            $("button.navbar-toggle").removeClass("glyphicon-remove");
            $("button.navbar-toggle").addClass("glyphicon-menu-hamburger");
        }
    }else if($(window).width()>992)
    {
        if( $("button.navbar-toggle").hasClass("glyphicon-menu-hamburger")){

            $("button.navbar-toggle").removeClass("glyphicon-menu-hamburger");
            $("button.navbar-toggle").addClass("glyphicon-remove");
        }
    }
    $("button.navbar-toggle").on("click",function(){
        if( $("button.navbar-toggle").hasClass("glyphicon-remove")){

            $("button.navbar-toggle").removeClass("glyphicon-remove");
            $("button.navbar-toggle").addClass("glyphicon-menu-hamburger");
        }else if( $("button.navbar-toggle").hasClass("glyphicon-menu-hamburger")){

            $("button.navbar-toggle").removeClass("glyphicon-menu-hamburger");
            $("button.navbar-toggle").addClass("glyphicon-remove");
        }
    });
})
$(window).on('hashchange', function(e){
    var url = window.location.href;
    if(url.indexOf("login") > -1)
    {
        $("body").addClass("login");
    }else if( url.indexOf("forget") > -1)
    {
        $("body").addClass("forget");
    }else{
        $("body").addClass("logged-in");
        if($(window).width()<992)
        {
            if( $("button.navbar-toggle").hasClass("glyphicon-remove")){
                $("button.navbar-toggle").removeClass("glyphicon-remove");
                $("button.navbar-toggle").addClass("glyphicon-menu-hamburger");
            }
        }else if($(window).width()>992)
        {

            if( $("button.navbar-toggle").hasClass("glyphicon-menu-hamburger")){

                $("button.navbar-toggle").removeClass("glyphicon-menu-hamburger");
                $("button.navbar-toggle").addClass("glyphicon-remove");
            }

        }
        $("button.navbar-toggle").on("click",function(){
            if( $("button.navbar-toggle").hasClass("glyphicon-remove")){

                $("button.navbar-toggle").removeClass("glyphicon-remove");
                $("button.navbar-toggle").addClass("glyphicon-menu-hamburger");
            }else if( $("button.navbar-toggle").hasClass("glyphicon-menu-hamburger")){

                $("button.navbar-toggle").removeClass("glyphicon-menu-hamburger");
                $("button.navbar-toggle").addClass("glyphicon-remove");
            }
        });
    }

});
//var screenWidth;
//var mobile = false;
//var url;
//var isLoogedIn = false;
//var status = "open";
//$(document).ready(function () {
//    'use strict';
//    $("#button-close-open").on("click", function () {
//        if(status === "open")
//        {
//            closeState();
//            setDesktopClosePadding();
//            setDesktopNavCloseState();
//            status = "close";
//        }else{
//            openState();
//            setDesktopOpenPadding();
//            setDesktopNavOpenState();
//            status = "open";
//        }
//    });
//
//});
//$(window).on('hashchange', function(e){
//    checkUrl();
//    if(isLoogedIn === false) {
//        setNormalPadding();
//    }
//});
//function isMobile()
//{
//    getScreenWidth();
//    if(screenWidth < 992)
//    {
//        mobile = true;
//    }else if(screenWidth > 992){
//        mobile = false;
//    }
//}
//
//function setNormalPadding()
//{
//    $("body").css({"padding":"initial"});
//}
//
//function removeMobileNavBar()
//{
//    $(".top-toolbar").hide();
//}
//
//function setMobilePadding(){
//    $("body").css({"padding-left":"initial"});
//    $("body").css({"padding-top":"47px"});
//}
//
//function setDesktopOpenPadding(){
//    $("body").css({"padding-left":"220px"});
//    $("body").css({"padding-top":"initial"});
//}
//function setDesktopClosePadding(){
//    $("body").css({"padding-left":"0px"});
//    $("body").css({"padding-top":"initial"});
//}
//
//function setDesktopNavOpenState(){
//    $("#button-close-open").css({"left":"175px"});
//    $("#desktop-nav").show();
//    openState();
//}
//
//function setDesktopNavCloseState(){
//    $("#button-close-open").css({"left":"0"});
//    $("#desktop-nav").hide();
//    closeState();
//}
//
//function setMobileNavOpenState(){
//    $("#desktop-nav").slideDown();
//    openState();
//}
//function setMobileNavCloseState(){
//    $("#desktop-nav").slideUp();
//    closeState();
//}
//
//function checkUrl()
//{
//    url = window.location.href;
//    if(url.indexOf("login") === -1 && url.indexOf("forget") === -1){
//        isLoogedIn = true;
//    }else if(url.indexOf("login") > -1){
//        isLoogedIn = false;
//    }else if(url.indexOf("forget")>-1){
//        isLoogedIn = false;
//    }
//}
//
//function getScreenWidth()
//{
//    screenWidth = $(window).width();
//}
//
//function closeState(){
//    $("#button-close-open span").removeClass("glyphicon glyphicon-remove");
//    $("#button-close-open span").addClass("glyphicon  glyphicon-menu-hamburger");
//}
//
//function openState(){
//    $("#button-close-open span").removeClass("glyphicon  glyphicon-menu-hamburger");
//    $("#button-close-open span").addClass("glyphicon glyphicon-remove");
//}