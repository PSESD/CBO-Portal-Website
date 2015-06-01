'use strict';

var auth_url = "https://auth.cbo.upward.st/api/";
var api_url = "https://api.cbo.upward.st/";
var globalConfig = {
    client_id: 'demo_localhost',
    client_secret: 'fc4e75fecf1b7fa2478aaaa19f32e865e2ddb77004363ebff2b60d0aa34b',
    response_type: 'code',
    grant_type: 'password',
    client_uri: 'http://localhost/CBO-Portal-Website/src/public/#/cb'
};
//var globalConfig = {
//    client_id: 'cbo_ut_new_1',
//    client_secret: '820540f39a6b33c90ce57601eac18eed1e9937069a594df3ae1d40e7bcd8',
//    response_type: 'code',
//    grant_type: 'password',
//    client_uri: 'https://any.cbo.upward.st/#/cb'
//};

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
        organization_id: null
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
        setData: function(token, organization_id) {
            $cookieStore.put('cboAdmin_cookie_token', token);
            $cookieStore.put('cboAdmin_cookie_organization_id', organization_id);

            AuthenticationService.isAuthenticated = true;
            AuthenticationService.token = $cookieStore.get('cboAdmin_cookie_token');
            AuthenticationService.organization_id = $cookieStore.get('cboAdmin_cookie_organization_id');
            $rootScope.showNavBar = true;

        },
        getData: function() {
            if( typeof $cookieStore.get('cboAdmin_cookie_token') !== 'undefined' && $cookieStore.get('cboAdmin_cookie_token') && typeof $cookieStore.get('cboAdmin_cookie_organization_id') !== 'undefined' && $cookieStore.get('cboAdmin_cookie_organization_id') )
            {
                AuthenticationService.isAuthenticated = true;
                AuthenticationService.token = $cookieStore.get('cboAdmin_cookie_token');
                AuthenticationService.organization_id = $cookieStore.get('cboAdmin_cookie_organization_id');
                $rootScope.showNavBar = true;
                return true;
            }
            else
            {
                AuthenticationService.isAuthenticated = false;
                AuthenticationService.token = null;
                AuthenticationService.organization_id = null;
                $rootScope.showNavBar = false;
                return false;
            }
        },
        clearData: function() {
            $cookieStore.remove('cboAdmin_cookie_token');
            $cookieStore.remove('cboAdmin_cookie_organization_id');
            AuthenticationService.isAuthenticated = false;
            AuthenticationService.token = null;
            AuthenticationService.organization_id = null;
            $rootScope.showNavBar = false;
            return true;
        }
    };
});



app.controller('BodyController', ['$rootScope', '$scope', '$http', '$location', 'CookieStore', 'AuthenticationService',
    function ($rootScope, $scope, $http, $location, CookieStore, AuthenticationService) {

        $scope.isActive = function(route) {

            return route === $location.path();

        };

        $scope.logoutMe = function() {

            var logout = {
                token: AuthenticationService.token
            };

            $http.post( auth_url+'logout', $.param(logout), {

            })
                .success( function (response) {

                    console.log(response);

                    CookieStore.clearData();
                    showError('Success Logout', 2);
                    $location.path("/login");

                })
                .error( function (response) {

                    console.log(response);
                    if( typeof response.message !== 'undefined' && response.message )
                    {
                        showError(response.message, 2);
                    }
                    else
                    {
                        showError(response, 1);
                    }

                    CookieStore.clearData();
                    showError('Success Logout', 2);
                    $location.path("/login");

                });

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

        $http.post( auth_url+'users', $.param(user), {
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

            $http.post( auth_url+'users', $.param(user), { })
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

            $http.post( auth_url+'clients', $.param(client), {
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

            $scope.login.working = true;

            var auth = base64_encode( globalConfig.client_id+':'+globalConfig.client_secret );
            var grant_type = encodeURIComponent( globalConfig.grant_type );
            var uri = auth_url+'oauth2/token';
            var send = {
                grant_type: grant_type,
                username: username,
                password: password
            };

            $http.post( uri , $.param(send), {
                headers: {
                    'Authorization': 'Basic '+auth
                }
            })
                .success(function(response) {

                    $http.get( api_url+'organizations' , {
                        headers: {
                            'Authorization': 'Bearer '+response.access_token
                        }
                    })
                        .success(function(responseClient) {

                            var get_hosting_name = $location.host();
                            var grand_access = false;
                            var get_id = false;

                            if(responseClient.length > 0)
                            {
                                for(var i=0; i<responseClient.length; i++)
                                {
                                    if(get_hosting_name == responseClient[i].url)
                                    {
                                        grand_access = true;
                                        get_id = responseClient[i]._id;
                                    }
                                }
                            }

                            if(grand_access)
                            {
                                CookieStore.setData( response.access_token, get_id );
                                $location.path( '/' );
                            }
                            else
                            {
                                showError("You don't have any permission to access this page", 1);
                                $scope.login.working = false;
                            }

                        })
                        .error(function(responseClient) {

                            $scope.login.working = false;

                        });

                })
                .error(function(response) {

                    showError('Failed to connect', 1);
                    $scope.login.working = false;

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