'use strict';

var base_url = "https://auth.cbo.upward.st/api/";

var globalConfig = {
    client_id: 'cbo_ut',
    client_secret: 'd3ecbfeab20d0be323bb069ff6bee7ccccefefcc80a8f9d2b62c6b81909d',
    response_type: 'code',
    client_uri: 'https://any.cbo.upward.st#/cb'
};

var app = angular.module('CboPortal', ['ngRoute', 'ngCookies']);

app.config(['$httpProvider', function ($httpProvider) {
    //Reset headers to avoid OPTIONS request (aka preflight)
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.get = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.common['Accept'] = '*/*';

}]);

app.config(function ($routeProvider) {

        $routeProvider.
            when('/', {
                templateUrl: 'asset/templates/home.html',
                controller: 'HomeController',
                access: { requiredAuthentication: true }
            }).
            when('/user/add', {
                templateUrl: 'asset/templates/user/add.html',
                controller: 'UserAddController',
                access: { requiredAuthentication: true }
            }).
            when('/user', {
                templateUrl: 'asset/templates/user/list.html',
                controller: 'UserController',
                access: { requiredAuthentication: true }
            }).
            when('/client/add', {
                templateUrl: 'asset/templates/client/add.html',
                controller: 'ClientAddController',
                access: { requiredAuthentication: true }
            }).
            when('/client', {
                templateUrl: 'asset/templates/client/list.html',
                controller: 'ClientController',
                access: { requiredAuthentication: true }
            }).
            when('/heartbeat', {
                templateUrl: 'asset/templates/heartbeat/list.html',
                controller: 'HeartbeatController',
                access: { requiredAuthentication: true }
            }).
            when('/cb', {
                templateUrl: 'asset/templates/cb.html',
                controller: 'CbController'
            }).
            when('/login', {
                templateUrl: 'asset/templates/login.html',
                controller: 'LoginController'
            }).
            otherwise({
                redirectTo: '/'
            });

});


app.run(function($rootScope, $http, $location, $window, AuthenticationService, CookieStore) {

    CookieStore.getData();

    $rootScope.$on("$routeChangeStart", function(event, nextRoute) {
        //redirect only if both isAuthenticated is false and no token is set
        if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredAuthentication && !AuthenticationService.isAuthenticated && !$window.sessionStorage.token) {
            $location.path("/login");
        }
    });
});


app.factory('AuthenticationService', function()
{
    var auth = {
        isAuthenticated: false,
        token: null,
        name: null,
        username: null,
        password: null
    };

    return auth;

});

app.factory('CookieStore', function ($rootScope, $window, $cookieStore, AuthenticationService)
{
    return {
        put: function(name, value)
        {
            $cookieStore.put(name, value);
        },
        get: function(name)
        {
            $cookieStore.get(name);
        },
        setData: function(token, name) {
            $cookieStore.put('cboAdmin_cookie_token', token);
            $cookieStore.put('cboAdmin_cookie_name', name);

            AuthenticationService.isAuthenticated = true;
            AuthenticationService.name = $cookieStore.get('cboAdmin_cookie_name');
            AuthenticationService.token = $cookieStore.get('cboAdmin_cookie_token');
            $rootScope.showNavBar = true;

        },
        getData: function() {
            if( typeof $cookieStore.get('cboAdmin_cookie_token') !== 'undefined' && $cookieStore.get('cboAdmin_cookie_token') && typeof $cookieStore.get('cboAdmin_cookie_name') !== 'undefined' && $cookieStore.get('cboAdmin_cookie_name') )
            {
                AuthenticationService.isAuthenticated = true;
                AuthenticationService.name = $cookieStore.get('cboAdmin_cookie_name');
                AuthenticationService.token = $cookieStore.get('cboAdmin_cookie_token');
                $rootScope.showNavBar = true;
                return true;
            }
            else
            {
                AuthenticationService.isAuthenticated = false;
                AuthenticationService.name = null;
                AuthenticationService.token = null;
                $rootScope.showNavBar = false;
                return false;
            }
        },
        clearData: function() {
            $cookieStore.remove('cboAdmin_cookie_token');
            $cookieStore.remove('cboAdmin_cookie_name');
            AuthenticationService.isAuthenticated = false;
            AuthenticationService.name = null;
            AuthenticationService.token = null;
            $rootScope.showNavBar = false;
            return true;
        }
    };
});



app.controller('BodyController', ['$rootScope', '$scope', '$location', 'CookieStore',
    function ($rootScope, $scope, $location, CookieStore) {

        $scope.isActive = function(route) {

            return route === $location.path();

        };

        $scope.logoutMe = function() {

            CookieStore.clearData();
            showError('Success Logout', 2);
            $location.path("/login");

        };

        $rootScope.doingResolve = true;

    }
]);

app.controller('HomeController', ['$rootScope', '$scope',
    function ($rootScope, $scope) {

        console.log($scope);
        $rootScope.doingResolve = false;

    }
]);

app.controller('UserController', ['$rootScope', '$scope',
    function ($rootScope, $scope) {

        $rootScope.doingResolve = false;

        var auth = base64_encode( AuthenticationService.username+':'.AuthenticationService.password );

        $http.post( base_url+'users', $.param(user), {
            headers: {
                'Authorization': 'Basic '+auth
            }
        })
            .success(function(response) {

                if( typeof response.id !== 'undefined' && response.id )
                {
                    // Success to get user
                    $scope.working = false;
                    $location.path( "/user" );
                }
                else
                {
                    console.log(response);
                    $scope.working = false;
                    showError(response.message, 1);
                }
            })
            .error(function(response) {
                $scope.working = false;
                showError('Failed to connect', 1);
            });

    }
]);

app.controller('UserAddController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService',
    function ($rootScope, $scope, $http, $location, AuthenticationService) {

        $rootScope.doingResolve = false;
        $scope.working = false;

        $scope.addUser = function (user) {

            $scope.working = true;

            $http.post( base_url+'users', $.param(user), { })
                .success(function(response) {

                    if( typeof response.id !== 'undefined' && response.id )
                    {
                        // Success go to user
                        $location.path( "/user" );
                    }
                    else
                    {
                        console.log(response);
                        $scope.working = false;
                        showError(response.message, 1);
                    }
                })
                .error(function(response) {
                    $scope.working = false;
                    showError('Failed to connect', 1);
                });

        }

    }
]);

app.controller('ClientController', ['$rootScope', '$scope',
    function ($rootScope, $scope) {

        console.log($scope);
        $rootScope.doingResolve = false;

    }
]);

app.controller('ClientAddController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService',
    function ($rootScope, $scope, $http, $location, AuthenticationService) {

        $rootScope.doingResolve = false;
        $scope.working = false;

        $scope.addClient = function (client) {

            $scope.working = true;

            var auth = base64_encode( AuthenticationService.username+':'.AuthenticationService.password );

            $http.post( base_url+'clients', $.param(client), {
                headers: {
                    'Authorization': 'Basic '+auth
                }
            })
                .success(function(response) {

                    console.log(response);

                })
                .error(function(response) {
                    $scope.working = false;
                    showError('Failed to connect', 1);
                });

        }

    }
]);

app.controller('HeartbeatController', ['$rootScope', '$scope',
    function ($rootScope, $scope) {

        console.log($scope);
        $rootScope.doingResolve = false;

    }
]);

app.controller('CbController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.doingResolve = false;
        var code = $location.search();
        var absUrl = $location.absUrl();
        if(typeof code.code !== 'undefined' && code.code)
        {
            CookieStore.setData( code.code, 'demo' );
        }
        else
        {
            var getFirst = absUrl.indexOf("code");
            var getLast = absUrl.indexOf("#");
            var getCodeString = absUrl.substring(getFirst, getLast);
            var getCode = getCodeString.replace('code=', '');
            CookieStore.setData( getCode, "demo" );
        }

        $location.path( '/' );

    }
]);

app.controller('LoginController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.doingResolve = false;

        $scope.loginMe = function(username, password) {

            var auth = base64_encode( username+':'+password );
            var client_id = encodeURIComponent( globalConfig.client_id );
            var response_type = encodeURIComponent( globalConfig.response_type );
            var redirect_uri = encodeURIComponent( globalConfig.client_uri );
            var uri = base_url+'oauth2/authorize?client_id='+client_id+'&response_type='+response_type+'&redirect_uri='+redirect_uri;

            $http.get( uri , {
                headers: {
                    'Authorization': 'Basic '+auth
                }
            })
                .success(function(response) {

                    console.log(response);
                    if( typeof response.id !== 'undefined' && response.id )
                    {
                        // Success go to user
                        $location.path( "/" );
                    }
                    else
                    {
                        console.log(response);
                        if(response.indexOf('<') > -1)
                        {

                            window.location = base_url+'oauth2/authorize?client_id='+client_id+'&response_type='+response_type+'&redirect_uri='+redirect_uri;

                        }
                        else
                        {
                            showError(response, 1);
                        }

                    }


                })
                .error(function(response) {

                    console.log(response);
                    showError('Failed to connect', 1);

                });

        }

    }
]);


function showError(message, alert)
{
    var passingClass = 'alert-danger';
    if(alert == 2)
    {
        passingClass = 'alert-success'
    }

    var message_alert = '<div class="alert '+passingClass+' alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+message.toString()+'</div>';
    jQuery("#error-container").append(message_alert);
    setTimeout(function() {
        jQuery('.alert').remove();
    }, 3000);

}

function base64_encode(data) {
    //  discuss at: http://phpjs.org/functions/base64_encode/
    // original by: Tyler Akins (http://rumkin.com)
    // improved by: Bayron Guevara
    // improved by: Thunder.m
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Rafał Kukawski (http://kukawski.pl)
    // bugfixed by: Pellentesque Malesuada
    //   example 1: base64_encode('Kevin van Zonneveld');
    //   returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
    //   example 2: base64_encode('a');
    //   returns 2: 'YQ=='

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