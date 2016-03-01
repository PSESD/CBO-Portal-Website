var sidebarBtn;
var url;
var initial = true;
var screenWidth;
var sidebarStatus;
var status;
$(document).ready(function(){

    if(isMobile())
    {
        status = "mobile";
    }else if(!isMobile())
    {
        status = "desktop";
    }

    if(isLoggedIn())
    {
        $("body").removeClass("not-logged-in");
        $("body").addClass("logged-in");

    }else{
        $("body").removeClass("logged-in");
        $("body").addClass("not-logged-in");
    }
    if($("body").hasClass("opened")){
        xButton();
    }else if($("body").hasClass("closed")){
        hamburgerButton();
    }
    sidebarBtn = $("#sidebarBtn");
    sidebarBtn.on("click",function(){
        if($("body").hasClass("closed")){
            if(isMobile())
            {
                $("body").removeClass("closed");
                $("body").addClass("opened");
            }
            xButton();
        }else if($("body").hasClass("opened")){
            if(isMobile())
            {
                $("body").removeClass("opened");
                $("body").addClass("closed");
            }
            hamburgerButton();
        }
        if(!isMobile()){
            if($("body").hasClass("opened")){
                $(".navbar").addClass("close-sidebar");
                $("button.navbar-toggle").addClass("close-sidebar");
                $(".desktop").addClass("close-sidebar");
                $(".navbar-nav").addClass("close-sidebar");
                $("#footer").addClass("close-sidebar");
                $("body.logged-in").addClass("close-sidebar")
                $("body").removeClass("opened");
                $("body").addClass("closed");
            }else if($("body").hasClass("closed")){
                $(".navbar").removeClass("close-sidebar");
                $("button.navbar-toggle").removeClass("close-sidebar");
                $(".desktop").removeClass("close-sidebar");
                $(".navbar-nav").removeClass("close-sidebar");
                $("#footer").removeClass("close-sidebar");
                $("body.logged-in").removeClass("close-sidebar")
                $("body").removeClass("closed");
                $("body").addClass("opened");
            }

        }
    });
});

$(window).resize(function(){


    if(isLoggedIn())
    {
        $("body").removeClass("not-logged-in");
        $("body").addClass("logged-in");
    }else{
        $("body").removeClass("logged-in");
        $("body").addClass("not-logged-in");
        $("body").removeClass("opened");
        $("body").removeClass("closed");
    }
        if(isMobile()){
            sidebarStatus = "closed";
            //if(status === "desktop"){
            //    window.location.reload(true);
            //    status = "mobile";
            //}
            if($("#bs-example-navbar-collapse").hasClass("in")){
                xButton();
                sidebarStatus = "opened";
                $("body").removeClass("closed");
                $("body").addClass("opened");
            }else{
                hamburgerButton();
                sidebarStatus = "closed";
                $("body").removeClass("opened");
                $("body").addClass("closed");
            }
        }else
        {
            sidebarStatus = "opened";
            //if(status === "mobile"){
            //    window.location.reload(true);
            //    status = "desktop";
            //}
        }
        initial = false;

    if(!isMobile()){
            $(".navbar").removeClass("close-sidebar");
            $("button.navbar-toggle").removeClass("close-sidebar");
            $(".desktop").removeClass("close-sidebar");
            $(".navbar-nav").removeClass("close-sidebar");
            $("#footer").removeClass("close-sidebar");
            $("body.logged-in").removeClass("close-sidebar")
            $("body").removeClass("closed");
            $("body").addClass("opened");
            xButton();
    }

    if(sidebarStatus === "closed")
    {
        $("body").removeClass("opened");
        $("body").addClass("closed");
    }else if(sidebarStatus === "opened")
    {
        $("body").removeClass("closed");
        $("body").addClass("opened");
    }
    if($("body").hasClass("opened")){
        xButton();
    }else if($("body").hasClass("closed")){
        hamburgerButton();
    }
});

$(window).on('hashchange', function(e){
    if(isLoggedIn())
    {
        $("body").removeClass("not-logged-in");
        $("body").addClass("logged-in");
    }else{
        $("body").removeClass("logged-in");
        $("body").addClass("not-logged-in");
        $("body").removeClass("opened");
        $("body").removeClass("closed");
    }
    if(initial){
        if(isMobile()){
            sidebarStatus = "closed";
        }else
        {
            sidebarStatus = "opened";
        }
        initial = false;
    }

    if(sidebarStatus === "closed")
    {
        $("body").removeClass("opened");
        $("body").addClass("closed");
    }else if(sidebarStatus === "opened")
    {
        $("body").removeClass("closed");
        $("body").addClass("opened");
    }
    if($("body").hasClass("opened")){
        xButton();
    }else if($("body").hasClass("closed")){
        hamburgerButton();
        $("#bs-example-navbar-collapse").removeClass("in");
    }
});

function xButton()
{
    sidebarBtn.removeClass("glyphicon-menu-hamburger");
    sidebarBtn.addClass("glyphicon-remove");
}
function hamburgerButton()
{
    sidebarBtn.removeClass("glyphicon-remove");
    sidebarBtn.addClass("glyphicon-menu-hamburger");
}

function isLoggedIn()
{
    url = window.location.href;
    if(url.indexOf("login") > -1){
        return false;
    }else if(url.indexOf("forget") > -1){
        return false;
    }else{
        return true;
    }
}

function isMobile()
{
    screenWidth = $(window).width();
    if(screenWidth > 972)
    {
        return false;
    }else{
        return true;
    }
}