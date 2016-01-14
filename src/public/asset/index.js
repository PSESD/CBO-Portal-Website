var __i = false; if(typeof __local !== 'undefined') {__i = __local;}

var app = angular.module('CboPortal', ['anotherpit/angular-rollbar','ui.bootstrap','ui.router','ngLocationUpdate','ngRoute', 'ngCookies', 'ngPrettyJson', 'ui.date', 'anguFixedHeaderTable', 'scrollable-table', 'ngLocalize', 'ui.codemirror',
    'ngLocalize.Config'
]).value('localeConf', {
    basePath: 'languages',
    defaultLocale: 'en-US',
    sharedDictionary: 'general',
    fileExtension: '.lang.json',
    persistSelection: true,
    cookieName: 'COOKIE_LOCALE_LANG_',
    observableAttrs: new RegExp('^data-(?!ng-|i18n)'),
    delimiter: '::'
});

app.factory('headerInjector', [function () {
    'use strict';
    var headerInjector = {
        request: function (config) {
            config.headers['X-Cbo-Client-Url'] = __local;
            return config;
        }
    };
    return headerInjector;
}]);

app.config(['$httpProvider', function ($httpProvider) {
    'use strict';
    //Reset headers to avoid OPTIONS request (aka preflight)
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.get = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.common.Accept = '*/*';
    if (__i){$httpProvider.interceptors.push('headerInjector');}
    $httpProvider.defaults.timeout = 15000;

    //$httpProvider.interceptors.push(function ($rootScope, $q,$rollbar,$interval) {
    //    return {
    //        request: function (config) {
    //
    //        },
    //        responseError: function (rejection) {
    //            switch (rejection.status){
    //                case 408 :
    //                    $rollbar.error('connection timed out');
    //                    showError('connection timed out',1);
    //                    break;
    //            }
    //            return $q.reject(rejection);
    //        }
    //    }
    //});

}]);

app.config(['$rollbarProvider', function($rollbarProvider) {
    $rollbarProvider.config.accessToken = '20ac49c365454dd186678ec15b56b13a';
    $rollbarProvider.config.captureUncaught = true;
    $rollbarProvider.config.payload = {
        environment : rollbar_env
    };
}]);

app.run(['$window', '$rootScope', '$route',
function ($window, $rootScope) {
    'use strict';
        $rootScope.goBack = function () {
            $window.history.back();
        };
        $rootScope.data_content = "asset/templates/desktop.html";
        //var element = angular.element("#login-container");
        if ($window.innerWidth > 767) {
            $rootScope.loginClass = "col-md-offset-4 col-md-4 login-page";
            $rootScope.data_content = "asset/templates/desktop.html";
        } else if ($window.innerWidth < 767) {
            $rootScope.loginClass = "col-md-offset-4 col-md-4 login-page-mobile";
            $rootScope.data_content = "asset/templates/mobile.html";
        }

}]);



app.run(function ($state, $stateParams,$rootScope, $http, $location, $window, AuthenticationService, CookieStore, locale) {
    'use strict';
    var returnData = CookieStore.getData();
    var checkCookie = CookieStore.checkCookie();

    locale.ready('general').then(function () {
        $rootScope.lang = {
            you_dont_have_any_permission_page: locale.getString('general.you_dont_have_any_permission_page'),
            success_logout: locale.getString('general.success_logout'),
            password_not_match: locale.getString('general.password_not_match')
        };
    });

    $rootScope.$on("$routeChangeStart", function (event, nextRoute) {
        //redirect only if both isAuthenticated is false and no token is set
        $rootScope.doingResolve = true;
        if (nextRoute !== null && /*nextRoute.access !== null &&  nextRoute.access.requiredAuthentication */nextRoute.requiredAuthentication && !AuthenticationService.isAuthenticated && !$window.sessionStorage.token) {
            if(nextRoute.originalPath === "/login")
            {
                return;
            }
            if(checkCookie === true)
            {
                $location.path("/loading");
            }
            else
            {
                $location.path("/login");
            }
            $rootScope.showNavBar = false;
        }

        if (nextRoute !== null && /*nextRoute.access !== null && nextRoute.access.requiredAdmin*/nextRoute.requiredAdmin && (AuthenticationService.role+'').indexOf('case-worker') !== -1) {
            showError($rootScope.lang.you_dont_have_any_permission_page, 1);
            event.preventDefault();
        }

        if(nextRoute.$$route.originalPath !== '/login' && $rootScope.doingResolve === true){
            $rootScope.showFooter = false;

        }


        if('$$route' in nextRoute){
            var intended_url = '';
            if(nextRoute.$$route.originalPath === '/login'){
                $rootScope.is_logged_in = false;
            }

            if(nextRoute.$$route.originalPath !== '/login' && nextRoute.$$route.originalPath !== '/forget'){
                $rootScope.is_logged_in = true;
                $rootScope.showFooter = true;

                intended_url = _.get(nextRoute.$$route, 'originalPath');

                if(intended_url === '/program/students/:program_id'){
                    intended_url = '/program/students/'+ _.get(nextRoute.params,'program_id');
                }else if(intended_url === '/student/backpacks/:student_id'){
                    intended_url = '/student/backpacks/'+_.get(nextRoute.params,'student_id');
                }else if(intended_url === '/student/detail/:student_id'){
                    intended_url = '/student/detail/'+_.get(nextRoute.params,'student_id');
                }else if(intended_url === '/student/detail/:student_id/:tab_id'){
                    intended_url = '/student/detail/'+_.get(nextRoute.params,'student_id')+'/'+_.get(nextRoute.params,'tab_id');
                }else if(intended_url === '/student/edit/:student_id'){
                    intended_url = '/student/edit/'+_.get(nextRoute.params,'student_id');
                }else if(intended_url ==='/student/programs/:student_id/add'){
                    intended_url = '/student/programs/'+_.get(nextRoute.params,'student_id')+'/add';
                }else if(intended_url ==='/student/programs/:student_id'){
                    intended_url = '/student/programs/'+_.get(nextRoute.params,'student_id');
                }else if(intended_url ==='/program/detail/:program_id'){
                    intended_url = '/program/detail/'+_.get(nextRoute.params,'program_id');
                }else if(intended_url ==='/program/edit/:program_id'){
                    intended_url = '/program/edit/'+_.get(nextRoute.params,'program_id');
                }else if(intended_url ==='/program/students/:program_id/add'){
                    intended_url = '/program/students/'+_.get(nextRoute.params,'program_id')+'/add';
                }else if(intended_url ==='/program/students/:program_id/edit/:student_id'){
                    intended_url = '/program/students/'+_.get(nextRoute.params,'program_id')+'/edit/'+_.get(nextRoute.params,'student_id');
                }else if(intended_url ==='/program/students/:program_id'){
                    intended_url = '/program/students/'+_.get(nextRoute.params,'program_id');
                }else if(intended_url ==='/tag/edit/:tag_id'){
                    intended_url = '/tag/edit/'+_.get(nextRoute.params,'tag_id');
                }else if(intended_url ==='/user/group/:user_id/add'){
                    intended_url = '/user/group/'+_.get(nextRoute.params,'user_id')+'/add';
                }else if(intended_url ==='/user/group/:user_id'){
                    intended_url = '/user/group/'+_.get(nextRoute.params,'user_id');
                }else if(intended_url ==='/user/assign/:user_id'){
                    intended_url = '/user/assign/'+_.get(nextRoute.params,'user_id');
                }else if(intended_url ==='/user/edit/:user_id'){
                    intended_url = '/user/edit/'+_.get(nextRoute.params,'user_id');
                }else if(intended_url ==='/user/detail/:user_id'){
                    intended_url = '/user/detail/'+_.get(nextRoute.params,'user_id');
                }else if(intended_url === '/loading'){
                    $location.path('/student');
                }

                localStorage.setItem('intended_url',intended_url);
            }
            else{
                $location.path("/login");
            }

        }
        if (returnData) {
            start_time_idle();
        }
        if($location.$$path === '/login'){
            $rootScope.showNavBar = false;
        }
    });
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
        $state.previous = fromState;
    });
});

app.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
    'use strict';
    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };
}]);


function showError(message, alert) {
    'use strict';
    var passingClass = 'alert-danger error-color';
    var messages = "";
    var sidebar_width = 0;
    sidebar_width = $("#desktop-nav").width() + "px";
    if (alert === 2) {
        passingClass = 'alert-success';
    }
    if(message.hasOwnProperty("error")){
        if(message.error.hasOwnProperty("message"))
        {
            messages = message.error.message;
        }
        else
        {
            messages = message.error;
        }

    }else if( message.hasOwnProperty("message"))
    {
        messages = message.message;
    }
    else{
        messages = message;
    }
    var message_alert = '<div style="margin-left:'+sidebar_width+'" class="alert ' + passingClass + ' alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' + messages + '</div>';

    if(message !== null) {
        if (window.location.href.indexOf('/login') === -1) {
            jQuery(".error-container.visible-on").append(message_alert);
            setTimeout(function () {
               jQuery('.alert').remove();
            }, 9000);
        } else {
            jQuery("#login-error-message").append(message_alert);
            setTimeout(function () {
               jQuery('.alert').remove();
            }, 9000);
        }
    }
}

function base64_encode(data) {
    'use strict';
    var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        enc = '',
        tmp_arr = [];

    if (!data) {
        return data;
    }

    do { // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);

        bits = o1 << 16 | o2 << 8 | o3;

        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;

        // use hexets to index into b64, and append result to encoded string
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);

    enc = tmp_arr.join('');

    var r = data.length % 3;

    return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
}


function start_time_idle() {
    'use strict';
    session_timeout.login();
}

function stop_time_idle() {
    'use strict';
    session_timeout.logout();
}