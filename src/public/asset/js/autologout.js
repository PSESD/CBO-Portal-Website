//    var oneHour = 1 * 60 * 60 * 1000;
var session_timeout = {
    //Logout Settings
    inactiveTimeout: 1 * 58 * 60 * 1000,     //(ms) The time until we display a warning message
    warningTimeout: 60 * 1000,      //(ms) The time until we log them out
//    inactiveTimeout: 5 * 1000,     //(ms) The time until we display a warning message
//    warningTimeout: 10 * 1000,      //(ms) The time until we log them out
    minWarning: 60 * 1000,           //(ms) If they come back to page (on mobile), The minumum amount, before we just log them out
    warningStart: null,         //Date time the warning was started
    warningTimer: null,         //Timer running every second to countdown to logout
    logout: function () {       //Logout function once warningTimeout has expired
        //window.location = settings.autologout.logouturl;
        jQuery(document).idleTimer("pause");
        clearInterval(session_timeout.warningTimer);
        clearInterval(session_timeout.keepaliveTimer);

    },
    logout2: function () {       //Logout function once warningTimeout has expired
        //window.location = settings.autologout.logouturl;
        jQuery(document).idleTimer("pause");
        clearInterval(session_timeout.warningTimer);
        clearInterval(session_timeout.keepaliveTimer);
        jQuery("#logoutSession").trigger('click');

    },
    login: function() {
        jQuery(document).idleTimer(session_timeout.inactiveTimeout);
    },

//Keepalive Settings
keepaliveTimer: null,
keepaliveUrl: "",
keepaliveInterval: 5000,     //(ms) the interval to call said url
keepAlive: function () {
    //console.log("keep alive trigger");
    }
};

jQuery( document ).on( "idle.idleTimer", function(event, elem, obj){
    // function you want to fire when the user goes idle
    //Get time when user was last active
    var diff = (+new Date()) - obj.lastActive - obj.timeout,
    warning = (+new Date()) - diff;
    if(diff <= 0)
    {
    diff = 0;
    }

//On mobile js is paused, so see if this was triggered while we were sleeping
if (diff >= session_timeout.warningTimeout || warning <= session_timeout.minWarning) {
    jQuery("#mdlLoggedOut").modal("show");
    } else {
    //Show dialog, and note the time
    jQuery('#sessionSecondsRemaining').html(Math.round((session_timeout.warningTimeout - diff) / 1000));
    jQuery("#myModal").modal("show");
    session_timeout.warningStart = (+new Date()) - diff;

    //Update counter downer every second
    session_timeout.warningTimer = setInterval(function () {
    var remaining = Math.round((session_timeout.warningTimeout / 1000) - (((+new Date()) - session_timeout.warningStart) / 1000));
    if (remaining >= 0) {
    jQuery('#sessionSecondsRemaining').html(remaining);
    } else {
        clearInterval(session_timeout.warningTimer);
        session_timeout.logout2();
    }
}, 1000)
}

});

// create a timer to keep server session alive, independent of idle timer
session_timeout.keepaliveTimer = setInterval(function () {
session_timeout.keepAlive();
}, session_timeout.keepaliveInterval);
