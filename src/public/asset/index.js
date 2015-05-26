'use strict';

var base_url = "/";
var image_url = "/";

var app = angular.module('CboPortal', ['ngRoute', 'ngCookies']);

app.config(function ($routeProvider) {

        $routeProvider.
            when('/', {
                templateUrl: 'asset/templates/home.html',
                controller: 'HomeController',
                access: { requiredAuthentication: true }
            }).
            when('/user', {
                templateUrl: 'asset/templates/user/list.html',
                controller: 'UserController',
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
        name: null
    };

    return auth;

});

app.factory('CookieStore', function ($rootScope, $window, $cookieStore, AuthenticationService)
{
    return {
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

        console.log($scope);
        $rootScope.doingResolve = false;

    }
]);

app.controller('ClientController', ['$rootScope', '$scope',
    function ($rootScope, $scope) {

        console.log($scope);
        $rootScope.doingResolve = false;

    }
]);

app.controller('HeartbeatController', ['$rootScope', '$scope',
    function ($rootScope, $scope) {

        console.log($scope);
        $rootScope.doingResolve = false;

    }
]);

app.controller('LoginController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.doingResolve = false;

        $scope.loginMe = function(username, password) {

            $scope.login.working = true;

            var sendData = {
                username: username,
                password: password
            };

            if( sendData.username == 'admin' && sendData.password == 'admin' )
            {
                CookieStore.setData(123456789, username);
                $location.path( "/" );
            }
            else
            {
                $scope.login.working = false;
                showError('Wrong username or password', 1);
            }

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