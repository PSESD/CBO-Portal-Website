var screenWidth;
var mobile = false;
var url;
var isLoogedIn = false;
var status = "open";
$(document).ready(function () {
    'use strict';
    $("#button-close-open").on("click", function () {
        if(status === "open")
        {
            closeState();
            setDesktopClosePadding();
            setDesktopNavCloseState();
            status = "close";
        }else{
            openState();
            setDesktopOpenPadding();
            setDesktopNavOpenState();
            status = "open";
        }
    });

});
$(window).on('hashchange', function(e){
    checkUrl();
    if(isLoogedIn === false) {
        setNormalPadding();
    }
});
function isMobile()
{
    getScreenWidth();
    if(screenWidth < 992)
    {
        mobile = true;
    }else if(screenWidth > 992){
        mobile = false;
    }
}

function setNormalPadding()
{
    $("body").css({"padding":"initial"});
}

function removeMobileNavBar()
{
    $(".top-toolbar").hide();
}

function setMobilePadding(){
    $("body").css({"padding-left":"initial"});
    $("body").css({"padding-top":"47px"});
}

function setDesktopOpenPadding(){
    $("body").css({"padding-left":"220px"});
    $("body").css({"padding-top":"initial"});
}
function setDesktopClosePadding(){
    $("body").css({"padding-left":"0px"});
    $("body").css({"padding-top":"initial"});
}

function setDesktopNavOpenState(){
    $("#button-close-open").css({"left":"175px"});
    $("#desktop-nav").show();
    openState();
}

function setDesktopNavCloseState(){
    $("#button-close-open").css({"left":"0"});
    $("#desktop-nav").hide();
    closeState();
}

function setMobileNavOpenState(){
    $("#desktop-nav").slideDown();
    openState();
}
function setMobileNavCloseState(){
    $("#desktop-nav").slideUp();
    closeState();
}

function checkUrl()
{
    url = window.location.href;
    if(url.indexOf("login") === -1 && url.indexOf("forget") === -1){
        isLoogedIn = true;
    }else if(url.indexOf("login") > -1){
        isLoogedIn = false;
    }else if(url.indexOf("forget")>-1){
        isLoogedIn = false;
    }
}

function getScreenWidth()
{
    screenWidth = $(window).width();
}

function closeState(){
    $("#button-close-open span").removeClass("glyphicon glyphicon-remove");
    $("#button-close-open span").addClass("glyphicon  glyphicon-menu-hamburger");
}

function openState(){
    $("#button-close-open span").removeClass("glyphicon  glyphicon-menu-hamburger");
    $("#button-close-open span").addClass("glyphicon glyphicon-remove");
}