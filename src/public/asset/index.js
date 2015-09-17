'use strict';

//var auth_url = "https://auth.cbo.upward.st/api/";
//var api_url = "https://api.cbo.upward.st/";
//
//var globalConfig = {
//    client_id: 'cbo_client_demo',
//    client_secret: '7e98a24f4fe91535348f6e87cde866dca9134b50fc029abefdc7278369f2',
//    response_type: 'code',
//    grant_type: 'password'
//};

var is_logged_in = false;

var __i = false; if(typeof __local !== 'undefined') __i = __local;

var global_redirect_url = '/';

var app = angular.module('CboPortal', ['ui.bootstrap','ui.router','ngLocationUpdate','ngRoute', 'ngCookies', 'ngPrettyJson', 'ui.date', 'anguFixedHeaderTable', 'scrollable-table', 'ngLocalize',
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

app.factory('headerInjector', [function (SessionService) {
    var headerInjector = {
        request: function (config) {
            config.headers['X-Cbo-Client-Url'] = __local;
            return config;
        }
    };
    return headerInjector;
}]);

app.config(['$httpProvider', function ($httpProvider) {
    //Reset headers to avoid OPTIONS request (aka preflight)
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.get = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.common['Accept'] = '*/*';
    if (__i) $httpProvider.interceptors.push('headerInjector');

}]);

app.config(function ($routeProvider) {

    $routeProvider.
    when('/', {
        templateUrl: 'asset/templates/student/list.html',
        controller: 'StudentController',
        access: {
            requiredAuthentication: true
        }
    }).
    when('/student/add', {
        templateUrl: 'asset/templates/student/add.html',
        controller: 'StudentAddController',
        access: {
            requiredAuthentication: true
        }
    }).
    when('/student/backpacks/:student_id', {
        templateUrl: 'asset/templates/student/backpacks.html',
        controller: 'StudentBackpackController',
        access: {
            requiredAuthentication: true
        }
    }).
    when('/student/detail/:student_id', {
        templateUrl: 'asset/templates/student/detail.html',
        controller: 'StudentDetailController',
        access: {
            requiredAuthentication: true
        }
    }).
    when('/student/detail/:student_id/:tab_id', {
        templateUrl: 'asset/templates/student/detail.html',
        controller: 'StudentDetailController',
        access: {
            requiredAuthentication: true
        }
    }).
    when('/student/edit/:student_id', {
        templateUrl: 'asset/templates/student/edit.html',
        controller: 'StudentEditController',
        access: {
            requiredAuthentication: true
        }
    }).
    when('/student/programs/:student_id/add', {
        templateUrl: 'asset/templates/student/program_add.html',
        controller: 'StudentProgramAddController',
        access: {
            requiredAuthentication: true
        }
    }).
    when('/student/programs/:student_id', {
        templateUrl: 'asset/templates/student/program_list.html',
        controller: 'StudentProgramController',
        access: {
            requiredAuthentication: true
        }
    }).
    when('/student', {
        templateUrl: 'asset/templates/student/list.html',
        controller: 'StudentController',
        access: {
            requiredAuthentication: true
        }
    }).
    when('/profile/edit', {
        templateUrl: 'asset/templates/profile/edit.html',
        controller: 'ProfileEditController',
        access: {
            requiredAuthentication: true
        }
    }).
    when('/profile', {
        templateUrl: 'asset/templates/profile/detail.html',
        controller: 'ProfileController',
        access: {
            requiredAuthentication: true
        }
    }).
    when('/program/add', {
        templateUrl: 'asset/templates/program/add.html',
        controller: 'ProgramAddController',
        access: {
            requiredAuthentication: true
        }
    }).
    when('/program/detail/:program_id', {
        templateUrl: 'asset/templates/program/detail.html',
        controller: 'ProgramDetailController',
        access: {
            requiredAuthentication: true
        }
    }).
    when('/program/edit/:program_id', {
        templateUrl: 'asset/templates/program/edit.html',
        controller: 'ProgramEditController',
        access: {
            requiredAuthentication: true
        }
    }).
    when('/program/students/:program_id/add', {
        templateUrl: 'asset/templates/program/student_add.html',
        controller: 'ProgramStudentAddController',
        access: {
            requiredAuthentication: true
        }
    }).
    when('/program/students/:program_id/edit/:student_id', {
        templateUrl: 'asset/templates/program/student_edit.html',
        controller: 'ProgramStudentEditController',
        access: {
            requiredAuthentication: true
        }
    }).
    when('/program/students/:program_id', {
        templateUrl: 'asset/templates/program/student_list.html',
        controller: 'ProgramStudentController',
        access: {
            requiredAuthentication: true
        }
    }).
    when('/program', {
        templateUrl: 'asset/templates/program/list.html',
        controller: 'ProgramController',
        access: {
            requiredAuthentication: true
        }
    }).
    when('/tag/add', {
        templateUrl: 'asset/templates/tag/add.html',
        controller: 'TagAddController',
        access: {
            requiredAuthentication: true,
            requiredAdmin: true
        }
    }).
    when('/tag/edit/:tag_id', {
        templateUrl: 'asset/templates/tag/edit.html',
        controller: 'TagEditController',
        access: {
            requiredAuthentication: true,
            requiredAdmin: true
        }
    }).
    when('/tag', {
        templateUrl: 'asset/templates/tag/list.html',
        controller: 'TagController',
        access: {
            requiredAuthentication: true,
            requiredAdmin: true
        }
    }).
    when('/user/invite', {
        templateUrl: 'asset/templates/user/invite.html',
        controller: 'UserInviteController',
        access: {
            requiredAuthentication: true,
            requiredAdmin: true
        }
    }).
    when('/user/group/:user_id/add', {
        templateUrl: 'asset/templates/user/group_add.html',
        controller: 'UserGroupAddController',
        access: {
            requiredAuthentication: true,
            requiredAdmin: true
        }
    }).
    when('/user/group/:user_id', {
        templateUrl: 'asset/templates/user/group.html',
        controller: 'UserGroupController',
        access: {
            requiredAuthentication: true,
            requiredAdmin: true
        }
    }).
    when('/user/assign/:user_id', {
        templateUrl: 'asset/templates/user/assign.html',
        controller: 'UserAssignController',
        access: {
            requiredAuthentication: true,
            requiredAdmin: true
        }
    }).
    when('/user/edit/:user_id', {
        templateUrl: 'asset/templates/user/edit.html',
        controller: 'UserEditController',
        access: {
            requiredAuthentication: true,
            requiredAdmin: true
        }
    }).
    when('/user/detail/:user_id', {
        templateUrl: 'asset/templates/user/detail.html',
        controller: 'UserDetailController',
        access: {
            requiredAuthentication: true
        }
    }).
    when('/user', {
        templateUrl: 'asset/templates/user/list.html',
        controller: 'UserController',
        access: {
            requiredAuthentication: true,
            requiredAdmin: true
        }
    }).
    when('/heartbeat', {
        templateUrl: 'asset/templates/heartbeat/list.html',
        controller: 'HeartbeatController',
        access: {
            requiredAuthentication: true
        }
    }).
    when('/login', {
        templateUrl: 'asset/templates/login.html',
        controller: 'LoginController'
    }).
    when('/forget', {
        templateUrl: 'asset/templates/forget.html',
        controller: 'LoginController'
    }).
    otherwise({
        redirectTo: '/'
    });

});

app.run(['$window', '$rootScope', '$route',
function ($window, $rootScope, locale) {
        $rootScope.goBack = function () {
            $window.history.back();
        };
        $rootScope.data_content = "asset/templates/desktop.html";
        var element = angular.element("#login-container");
        if ($window.innerWidth > 767) {
            $rootScope.loginClass = "col-md-offset-4 col-md-4 login-page";
            $rootScope.data_content = "asset/templates/desktop.html";
        } else if ($window.innerWidth < 767) {
            $rootScope.loginClass = "col-md-offset-4 col-md-4 login-page-mobile";
            $rootScope.data_content = "asset/templates/mobile.html";
        }

}]);

app.run(function ($state, $stateParams,$rootScope, $http, $location, $window, AuthenticationService, CookieStore, locale) {

    var returnData = CookieStore.getData();
    locale.ready('general').then(function () {
        $rootScope.lang = {
            you_dont_have_any_permission_page: locale.getString('general.you_dont_have_any_permission_page'),
            success_logout: locale.getString('general.success_logout'),
            password_not_match: locale.getString('general.password_not_match')
        };
    });

    $rootScope.$on("$routeChangeStart", function (event, nextRoute) {
        //redirect only if both isAuthenticated is false and no token is set
        if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredAuthentication && !AuthenticationService.isAuthenticated && !$window.sessionStorage.token) {
            $location.path("/login");
            $rootScope.showNavBar = false;
        }

        if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredAdmin && (AuthenticationService.role+'').indexOf('case-worker') !== -1) {
            showError($rootScope.lang.you_dont_have_any_permission_page, 1);
            event.preventDefault();
        }



        if('$$route' in nextRoute){
            var intended_url = '';
            if(nextRoute.$$route.originalPath == '/login'){
                $rootScope.showFooter = false;
            }

            if(nextRoute.$$route.originalPath != '/login' && nextRoute.$$route.originalPath != '/forget'){
                $rootScope.showFooter = true;
                if($rootScope.doingResolve == true){
                    $rootScope.showFooter = false;
                }
                if($rootScope.doingResolve == false){
                    $rootScope.showFooter = true;
                }
                intended_url = _.get(nextRoute.$$route, 'originalPath');
                if(intended_url == '/program/students/:program_id'){
                    intended_url = '/program/students/'+ _.get(nextRoute.params,'program_id');
                }else if(intended_url == '/student/backpacks/:student_id'){
                    intended_url = '/student/backpacks/'+_.get(nextRoute.params,'student_id');
                }else if(intended_url == '/student/detail/:student_id'){
                    intended_url = '/student/detail/'+_.get(nextRoute.params,'student_id');
                }else if(intended_url == '/student/detail/:student_id/:tab_id'){
                    intended_url = '/student/detail/'+_.get(nextRoute.params,'student_id')+'/'+_.get(nextRoute.params,'tab_id');
                }else if(intended_url == '/student/edit/:student_id'){
                    intended_url = '/student/edit/'+_.get(nextRoute.params,'student_id');
                }else if(intended_url =='/student/programs/:student_id/add'){
                    intended_url = '/student/programs/'+_.get(nextRoute.params,'student_id')+'/add';
                }else if(intended_url =='/student/programs/:student_id'){
                    intended_url = '/student/programs/'+_.get(nextRoute.params,'student_id');
                }else if(intended_url =='/program/detail/:program_id'){
                    intended_url = '/program/detail/'+_.get(nextRoute.params,'program_id');
                }else if(intended_url =='/program/edit/:program_id'){
                    intended_url = '/program/edit/'+_.get(nextRoute.params,'program_id');
                }else if(intended_url =='/program/students/:program_id/add'){
                    intended_url = '/program/students/'+_.get(nextRoute.params,'program_id')+'/add';
                }else if(intended_url =='/program/students/:program_id/edit/:student_id'){
                    intended_url = '/program/students/'+_.get(nextRoute.params,'program_id')+'/edit/'+_.get(nextRoute.params,'student_id');
                }else if(intended_url =='/program/students/:program_id'){
                    intended_url = '/program/students/'+_.get(nextRoute.params,'program_id');
                }else if(intended_url =='/tag/edit/:tag_id'){
                    intended_url = '/tag/edit/'+_.get(nextRoute.params,'tag_id');
                }else if(intended_url =='/user/group/:user_id/add'){
                    intended_url = '/user/group/'+_.get(nextRoute.params,'user_id')+'/add';
                }else if(intended_url =='/user/group/:user_id'){
                    intended_url = '/user/group/'+_.get(nextRoute.params,'user_id');
                }else if(intended_url =='/user/assign/:user_id'){
                    intended_url = '/user/assign/'+_.get(nextRoute.params,'user_id');
                }else if(intended_url =='/user/edit/:user_id'){
                    intended_url = '/user/edit/'+_.get(nextRoute.params,'user_id');
                }else if(intended_url =='/user/detail/:user_id'){
                    intended_url = '/user/detail/'+_.get(nextRoute.params,'user_id');
                }

                localStorage.setItem('intended_url',intended_url);
            }

        }
        //($stateParams);
        //if('$$route' in nextRoute){
        //
        //    if(nextRoute.$$route.originalPath != '/login'){
        //        if(nextRoute.$$route.keys.length == 0){
        //            localStorage.setItem('url_intended',nextRoute.$$route.originalPath);
        //        }else{
        //
        //        }
        //    }else {
        //        localStorage.setItem('url_intended','/login');
        //    }
        //}

        if (returnData) {
            start_time_idle();
        }
        if($location.$$path == '/login'){
            $rootScope.showNavBar = false;
        }
    });
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
        $state.previous = fromState;
        //console.log(fromState);
    });
});


app.factory('AuthenticationService', function () {
    var auth = {
        isAuthenticated: false,
        token: null,
        refresh_token: null,
        organization_id: null,
        redirect_url: null,
        user_id: null,
        email: null,
        name: null,
        role: null,
        keep_email: false
    };

    return auth;

});

app.factory('CookieStore', function ($rootScope, $window, $cookieStore, AuthenticationService) {
    return {
        put: function (name, value) {
            $cookieStore.put(name, value);
        },
        get: function (name) {
            return $cookieStore.get(name);
        },
        put_remember: function (value) {
            $cookieStore.put('cboAdmin_cookie_remember', value);
        },
        setData: function (token, refresh_token, organization_id, redirect_url, user_id, email, name, role, organization_name) {
            $cookieStore.put('cboAdmin_cookie_token', token);
            $cookieStore.put('cboAdmin_cookie_refresh_token', refresh_token);
            $cookieStore.put('cboAdmin_cookie_organization_id', organization_id);
            $cookieStore.put('cboAdmin_cookie_redirect_url', redirect_url);
            $cookieStore.put('cboAdmin_cookie_user_id', user_id);
            $cookieStore.put('cboAdmin_cookie_email', email);
            $cookieStore.put('cboAdmin_cookie_name', name);
            $cookieStore.put('cboAdmin_cookie_role', role);
            $cookieStore.put('cboAdmin_cookie_organization_name', organization_name)

            AuthenticationService.isAuthenticated = true;
            AuthenticationService.token = $cookieStore.get('cboAdmin_cookie_token');
            AuthenticationService.refresh_token = $cookieStore.get('cboAdmin_cookie_refresh_token');
            AuthenticationService.organization_id = $cookieStore.get('cboAdmin_cookie_organization_id');
            AuthenticationService.redirect_url = $cookieStore.get('cboAdmin_cookie_redirect_url');
            AuthenticationService.user_id = $cookieStore.get('cboAdmin_cookie_user_id');
            AuthenticationService.email = $cookieStore.get('cboAdmin_cookie_email');
            AuthenticationService.name = $cookieStore.get('cboAdmin_cookie_name');
            AuthenticationService.role = $cookieStore.get('cboAdmin_cookie_role');
            AuthenticationService.organization_name = $cookieStore.get('cboAdmin_cookie_organization_name');
            $rootScope.showNavBar = true;
            $rootScope.completeName = AuthenticationService.name;

        },
        getData: function () {
            if (typeof $cookieStore.get('cboAdmin_cookie_token') !== 'undefined' && $cookieStore.get('cboAdmin_cookie_token') && typeof $cookieStore.get('cboAdmin_cookie_organization_id') !== 'undefined' && $cookieStore.get('cboAdmin_cookie_organization_id')) {
                AuthenticationService.isAuthenticated = true;
                AuthenticationService.token = $cookieStore.get('cboAdmin_cookie_token');
                AuthenticationService.refresh_token = $cookieStore.get('cboAdmin_cookie_refresh_token');
                AuthenticationService.organization_id = $cookieStore.get('cboAdmin_cookie_organization_id');
                AuthenticationService.redirect_url = $cookieStore.get('cboAdmin_cookie_redirect_url');
                AuthenticationService.user_id = $cookieStore.get('cboAdmin_cookie_user_id');
                AuthenticationService.email = $cookieStore.get('cboAdmin_cookie_email');
                AuthenticationService.name = $cookieStore.get('cboAdmin_cookie_name');
                AuthenticationService.role = $cookieStore.get('cboAdmin_cookie_role');
                $rootScope.showNavBar = true;
                $rootScope.completeName = AuthenticationService.name;
                return true;
            } else {
                var remember = $cookieStore.get('cboAdmin_cookie_remember');
                if (remember == true) {

                } else {
                    AuthenticationService.email = null;
                }

                AuthenticationService.isAuthenticated = false;
                AuthenticationService.token = null;
                AuthenticationService.refresh_token = null;
                AuthenticationService.organization_id = null;
                AuthenticationService.redirect_url = null;
                AuthenticationService.user_id = null;
                AuthenticationService.name = null;
                AuthenticationService.role = null;
                $rootScope.showNavBar = false;
                $rootScope.completeName = false;
                return false;
            }
        },
        clearData: function () {

            var remember = $cookieStore.get('cboAdmin_cookie_remember');
            if (remember == true) {

            } else {
                $cookieStore.remove('cboAdmin_cookie_email');
                AuthenticationService.email = null;
            }

            $cookieStore.remove('cboAdmin_cookie_token');
            $cookieStore.remove('cboAdmin_cookie_refresh_token');
            $cookieStore.remove('cboAdmin_cookie_organization_id');
            $cookieStore.remove('cboAdmin_cookie_redirect_url');
            $cookieStore.remove('cboAdmin_cookie_user_id');
            $cookieStore.remove('cboAdmin_cookie_name');
            $cookieStore.remove('cboAdmin_cookie_role');
            AuthenticationService.isAuthenticated = false;
            AuthenticationService.token = null;
            AuthenticationService.refresh_token = null;
            AuthenticationService.organization_id = null;
            AuthenticationService.redirect_url = null;
            AuthenticationService.user_id = null;
            AuthenticationService.name = null;
            AuthenticationService.role = null;
            $rootScope.showNavBar = false;
            $rootScope.completeName = false;

            stop_time_idle();

            return true;
        }
    };
});



app.controller('BodyController', ['$rootScope', '$scope', '$http', '$location', 'CookieStore', 'AuthenticationService',
    function ($rootScope, $scope, $http, $location, CookieStore, AuthenticationService, locale) {
        var location = window.location.hash;
        if (location.indexOf('login') == -1) {
            $rootScope.show_footer = true;
        }


        $rootScope.full_screen = false;
        $rootScope.organization_name = CookieStore.get('cboAdmin_cookie_organization_name');
        if (CookieStore.get('cboAdmin_cookie_role') == 'admin') {
            $rootScope.users_link = true;
            $rootScope.tags_link = true;
        } else {
            $rootScope.users_link = false;
            $rootScope.tags_link = false;
        }
        $scope.isActive = function (route) {

            var route_length = route.length;
            var path = $location.path();
            var new_path = path.substr(0, route_length);
            return route === new_path;

        };


        $scope.logoutMe = function () {
            $rootScope.show_footer = false;
            var logout = {
                token: AuthenticationService.token
            };

            $http.post(auth_url + 'logout', $.param(logout), {

                })
                .success(function (response) {
                    $rootScope.showNavBar = true;
                    CookieStore.clearData();
                    showError($rootScope.lang.success_logout, 2);
                    localStorage.setItem('url_intended','');
                    //console.log(localStorage);
                    $location.path("/login");

                })
                .error(function (response, status) {

                    var myEl = angular.element(document.querySelector('body'));
                    myEl.removeClass('cbp-spmenu-push');
                    //console.log(response);
                    //console.log(status);

                    CookieStore.clearData();
                    showError($rootScope.lang.success_logout, 2);
                    $location.path("/login");

                });

        };

        $scope.refreshMe = function () {

            var auth = base64_encode(globalConfig.client_id + ':' + globalConfig.client_secret);
            var grant_type = encodeURIComponent(globalConfig.grant_type);
            var uri = auth_url + 'oauth2/token';
            var send = {
                grant_type: 'refresh_token',
                refresh_token: AuthenticationService.refresh_token
            };

            $http.post(uri, $.param(send), {
                    headers: {
                        'Authorization': 'Basic ' + auth
                    }
                })
                .success(function (response) {

                    clearTimeout(session_timeout.warningTimer);

                    CookieStore.put('cboAdmin_cookie_token', response.access_token);
                    CookieStore.put('cboAdmin_cookie_refresh_token', response.refresh_token);
                    AuthenticationService.token = response.access_token;
                    AuthenticationService.refresh_token = response.refresh_token;

                })
                .error(function (response, status) {

                    //console.log('fail');
                    //console.log(response);
                    //console.log(status);

                    CookieStore.clearData();
                    showError(response.message, 2);
                    $location.path("/login");

                });

        };

        $rootScope.doingResolve = true;

    }
]);

app.controller('HomeController', ['$rootScope', '$scope',
    function ($rootScope, $scope) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;

    }
]);


app.controller('StudentAddController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore) {
        var schoolDistrict = {};
        var relationship = {};
        $scope.schoolDistricts = [];
        $scope.relationships = [];
        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;

        $.each(schoolDistricts, function (key, value) {
            schoolDistrict = {
                "id": key,
                "name": value
            };
            $scope.schoolDistricts.push(schoolDistrict);
        });
        $.each(relationships, function (key, value) {
            relationship = {
                "id": key,
                "name": value
            };
            $scope.relationships.push(relationship);
        });

        $scope.addStudent = function (student) {
            if (student) {
                $scope.working = true;
                $http.post(api_url + AuthenticationService.organization_id + '/students', $.param(student), {
                        headers: {
                            'Authorization': 'Bearer ' + AuthenticationService.token
                        }
                    })
                    .success(function (response) {

                        if (response.success == true) {
                            showError(response.message, 2);
                            $location.path('/student');
                        } else {
                            showError(response.message, 1);
                        }
                        $scope.working = false;

                    })
                    .error(function (response, status) {

                        //console.log(response);
                        //console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if (status == 401) {
                            $rootScope.show_footer = false;
                            CookieStore.clearData();
                            $rootScope.show_footer = false;
                            $location.path('/login');
                        }

                    });
            }
        };

    }
]);


app.controller('StudentBackpackController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $scope.student = {};

        var student_id = $routeParams.student_id;

        $http.get(api_url + AuthenticationService.organization_id + '/students/' + student_id + '/xsre', {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {
                $scope.student = response;
                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

    }
]);


app.controller('StudentEditController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $scope.student = {};
        var schoolDistrict = {};
        var relationship = {};
        $scope.schoolDistricts = [];
        $scope.relationships = [];

        var student_id = $routeParams.student_id;

        $.each(schoolDistricts, function (key, value) {
            schoolDistrict = {
                "id": key,
                "name": value
            };
            $scope.schoolDistricts.push(schoolDistrict);
        });
        $.each(relationships, function (key, value) {
            relationship = {
                "id": key,
                "name": value
            };
            $scope.relationships.push(relationship);
        });

        $scope.editStudent = function (student) {
            if (student) {
                $scope.working = true;
                $http.put(api_url + AuthenticationService.organization_id + '/students/' + student_id, $.param(student), {
                        headers: {
                            'Authorization': 'Bearer ' + AuthenticationService.token
                        }
                    })
                    .success(function (response) {

                        if (response.success == true) {
                            showError(response.message, 2);
                            $location.path('/student');
                        } else {
                            showError(response.message, 1);
                        }
                        $scope.working = false;

                    })
                    .error(function (response, status) {

                        //console.log(response);
                        //console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if (status == 401) {
                            $rootScope.show_footer = false;
                            CookieStore.clearData();
                            $location.path('/login');
                        }

                    });
            }
        };

        $http.get(api_url + AuthenticationService.organization_id + '/students/' + student_id, {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {
                //                $.each(schoolDistricts, function (key, value) {
                //                    if (key == response.school_district) {
                //                        response.school_district = value;
                //                    }
                //                });
                $scope.student = response;
                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

    }
]);


app.controller('StudentDetailController', ['$route','$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore','$sce',
    function ($route,$rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore,$sce) {
        if($rootScope.doingResolve == true){
            $rootScope.showFooter = false;
        }
        if($rootScope.doingResolve == false){
            $rootScope.showFooter = true;
        }
        $rootScope.full_screen = false;
        $scope.student = {};
        $scope.programs = [];
        $scope.list_programs = [];
        $scope.icon_legend = true;
        $scope.open_button = false;

        $scope.close = function () {
            $scope.open_button = true;
            $scope.icon_legend = false;
        };
        $scope.open = function () {
            $scope.icon_legend = true;
            $scope.open_button = false;
        };
        var student_id = $routeParams.student_id;
        var tab = $routeParams.tab_id;
        var groupValue = "_INVALID_GROUP_VALUE_";
        $scope.sch_history = false;
        $scope.academic = true;

        $scope.attendance = "col-md-3";
        $scope.attendance_table = false;
        $scope.attendance_expand_btn = true;
        $scope.attendance_close_btn = false;

        $scope.behavior = "col-md-3";
        $scope.behavior_table = false;
        $scope.behavior_expand_btn = true;
        $scope.behavior_close_btn = false;

        $scope.courses = "col-md-3";
        $scope.courses_table = false;
        $scope.courses_expand_btn = true;
        $scope.courses_close_btn = false;

        $scope.program = "col-md-3";
        $scope.program_table = false;
        $scope.program_expand_btn = true;
        $scope.program_close_btn = false;

        $scope.expandAttendance = function () {
            $scope.attendance = "col-md-6";
            $scope.attendance_table = true;
            $scope.attendance_expand_btn = false;
            $scope.attendance_close_btn = true;
        };

        $scope.closeAttendance = function () {
            $scope.attendance = "col-md-3";
            $scope.attendance_table = false;
            $scope.attendance_expand_btn = true;
            $scope.attendance_close_btn = false;
        };

        $scope.expandBehavior = function () {
            $scope.behavior = "col-md-6";
            $scope.behavior_table = true;
            $scope.behavior_expand_btn = false;
            $scope.behavior_close_btn = true;
        };

        $scope.closeBehavior = function () {
            $scope.behavior = "col-md-3";
            $scope.behavior_table = false;
            $scope.behavior_expand_btn = true;
            $scope.behavior_close_btn = false;
        };

        $scope.expandCourses = function () {
            $scope.courses = "col-md-6";
            $scope.courses_table = true;
            $scope.courses_expand_btn = false;
            $scope.courses_close_btn = true;
        };

        $scope.closeCourses = function () {
            $scope.courses = "col-md-3";
            $scope.courses_table = false;
            $scope.courses_expand_btn = true;
            $scope.courses_close_btn = false;
        };

        $scope.expandProgram = function () {
            $scope.program = "col-md-6";
            $scope.program_table = true;
            $scope.program_expand_btn = false;
            $scope.program_close_btn = true;
        };

        $scope.closeProgram = function () {
            $scope.program = "col-md-3";
            $scope.program_table = false;
            $scope.program_expand_btn = true;
            $scope.program_close_btn = false;
        };

        $scope.showSchoolHistory = function () {
            $scope.sch_history = true;

        };

        $scope.closeSchoolHistory = function () {
            $scope.sch_history = false;


        };

        $scope.hideIcon = function (event) {

            var li = $(event.target).parent()[0];
            var attendance_header = $(li).parent()[0];
            var attendance_detail = $(attendance_header).siblings()[0];

            $(attendance_detail).removeClass('hide');
            $(attendance_header).addClass('hide');

            /*
            var ul = $(event.target).parentsUntil('h4')[1];
            var next = $(event.target).parentsUntil('h4');
            var tgt = $(next).next()[0];
            $(tgt).removeClass('hide');
            var target = $(ul);
            target.addClass('hide');
            */
        };
        $scope.showIcon = function (event) {
            /*
            var ul = $(event.target).parentsUntil('h4')[4];
            //console.log(ul);
            var header = $(ul).find('ul.attendance-behavior')[0];
            //console.log(header);
            $(header).removeClass('hide');

            var detail = $(ul).find('.attendance-detail')[0];
            //console.log(detail);
            $(detail).addClass('hide');
            */
            var id = $(event.target).prop('id');
            var attendance_legend = $(event.target).parent()[0];
            var panel_body = $(attendance_legend).parent()[0];
            var panel_collapse = $(panel_body).parent()[0];
            var panel_heading = $($(panel_collapse).siblings(), id);
            var h4 = $(panel_heading).children()[0];
            var attendance_header = $(h4).children()[0];
            var attendance_detail = $(h4).children()[1];
            if ($(attendance_header).hasClass('hide')) {
                $(attendance_header).removeClass('hide');
            }

            $(attendance_detail).addClass('hide');

        };
        if(tab){
            $('[data-target="#'+tab+'"]').tab('show');
        }
        $('[data-toggle="tab"]').on('show.bs.tab', function(e){

            $location.update_path('/student/detail/'+student_id+'/' + $(this).data('target').replace('#', ''),true);

        });
        $http.get(api_url + AuthenticationService.organization_id + '/students/' + student_id, {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {
                $.each(schoolDistricts, function (key, value) {
                    if (key == response.school_district) {
                        response.school_district = value;
                    }
                });

                $scope.student = response;

                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });
        var getXsre = function () {
            $scope.loading_icon = false;
            $('.loading-icon').removeClass('hide');
            $http.get(api_url + AuthenticationService.organization_id + '/students/' + student_id + '/xsre', {
                    headers: {
                        'Authorization': 'Bearer ' + AuthenticationService.token
                    }
                })
                .success(function (response) {
                    var embedUsers = {};
                    var embedPrograms = [];
                    $scope.attendanceBehavior = [];
                    $scope.xsreLastUpdated = null;
                    if (response.success != false && response.info) {
                        $('.loading-icon').addClass('hide');
                        response = response.info;
                        console.log(response);
                        $scope.loading_icon = true;
                        $scope.studentdetails = response;
                        $scope.case_workers = response._embedded.users;
                        embedUsers = ('users' in response._embedded) ? response._embedded.users : {};
                        embedPrograms = ('programs' in response._embedded) ? response._embedded.programs : [];

                        $scope.case_workers = response._embedded.users;
                        if (typeof response.attendance.summaries !== 'undefined' && response.attendance.summaries) {
                            $scope.daysAttendance = parseInt(response.attendance.summaries.summary.daysInAttendance);
                            $scope.daysAbsent = parseInt(response.attendance.summaries.summary.daysAbsent);
                        }


                        if(response.attendanceBehaviors) {
                            angular.forEach(response.attendanceBehaviors, function (behavior) {
                                Object.keys(behavior).forEach(function (key) {
                                    var columnHtml = {};
                                    angular.forEach(behavior[key].detailColumns, function (column, i) {

                                        if (i !== 'periods' && i !== 'weeklyChange') {
                                            var xhtml = [];
                                            var x = 1;
                                            var cls = '';
                                            var html = "";

                                            angular.forEach(column, function (item, n) {
                                                if (n > 0) {
                                                    cls = (x % 2 === 0) ? ' light' : '';
                                                    x++;
                                                    html = '<div class="grid-item n_a ' + cls + '"></div>';
                                                    if (typeof item === 'object' && item.event !== null) {
                                                        html = '<div class="grid-item ' + item.slug + cls + '">';
                                                        html += '<div class="descriptor">';
                                                        html += '<div class="descriptor-title ' + item.slug + '-font-color">';
                                                        html += item.slug.toUpperCase();
                                                        html += '</div>';
                                                        html += "<div>";
                                                        html += item.event.calendarEventDate;
                                                        html += '<br> ' + item.event.attendanceStatusTitle;
                                                        html += '</div>';
                                                        html += '</div>';
                                                        html += '</div>';
                                                    } else {
                                                    }
                                                    xhtml.push(html);
                                                }
                                            });

                                            for (; x < 7; x++) xhtml.push('<div class="grid-item"></div>');
                                            html = '<div class="grid-item"></div>';

                                            var items = behavior[key].behaviors[i];

                                            if (items.length > 0) {
                                                html += '<div class="grid-item unexcused">';
                                                html += '<div class="descriptor">';
                                                angular.forEach(items, function (item, i) {

                                                    if (typeof item === 'object') {
                                                        if (typeof item.incidentCategoryTitle !== 'undefined' && item.incidentCategoryTitle !== "") {
                                                            html += '<div class="descriptor-title unexcused-font-color">';
                                                            html += (item.incidentCategoryTitle+'').toUpperCase();
                                                            html += '</div>';
                                                        }
                                                        html += '<div>';
                                                        html += item.incidentDate;
                                                        html += '<br> ' + item.description;
                                                        html += '</div>';
                                                    }
                                                });

                                                html += '</div>';
                                                html += '</div>';
                                            } else {
                                                html += '<div class="grid-item n_a"></div>';
                                            }
                                            xhtml.push(html);
                                            columnHtml[i] = xhtml.join("\n");
                                            behavior[key].columnHtml = columnHtml;
                                            if (behavior[key].detailColumns.periods.length < 7) {
                                                for (var i = 7; i > behavior[key].detailColumns.periods.length; i--) behavior[key].detailColumns.periods.push("");
                                            }
                                        }

                                    });
                                    behavior[key].columnHtml = columnHtml;

                                    $scope.attendanceBehavior.push(behavior[key]);
                                });
                            });
                        }
                        $scope.academicInfo = {
                            currentSchool: 'N/A',
                            expectedGraduationYear: 'N/A',
                            gradeLevel: 'N/A',
                            languageSpokenAtHome: 'N/A',
                            iep: 'N/A',
                            s504: 'N/A',
                            freeReducedLunch: 'N/A'
                        };

                        if(response.programs){

                            $scope.academicInfo.iep = _.get(response.programs, 'specialEducation.services[0].service.ideaIndicator') || _.get(response.programs, 'specialEducation.services.service.ideaIndicator') || 'N/A';
                            $scope.academicInfo.s504 = _.get(response.programs, 'specialEducation.section504Status') || 'N/A';
                            var eligibilityStatus = _.get(response.programs, 'foodService.eligibilityStatus');
                            var enrollmentStatus = _.get(response.programs, 'foodService.enrollmentStatus');
                            if(eligibilityStatus && enrollmentStatus) {
                                $scope.academicInfo.freeReducedLunch = enrollmentStatus;
                            }
                        }
                        $scope.academicInfo.gradeLevel = _.get(response, 'enrollment.gradeLevel') || 'N/A';
                        $scope.academicInfo.expectedGraduationYear = _.get(response, 'enrollment.projectedGraduationYear') || 'N/A';
                        $scope.academicInfo.languageSpokenAtHome = _.get(response, 'languages.language[1].code') || 'N/A';
                        $scope.academicInfo.currentSchool = _.get(response, 'enrollment.school.schoolName') || 'N/A';
                        $scope.transcripts = response.transcripts || {};
                        $scope.total_data = _.size(response.transcripts.subject);
                        $scope.transcripts.subjectOrder = [];
                        _.each($scope.transcripts.subject, function(item, key){
                            $scope.transcripts.subjectOrder.push({ name: key, value: item });
                        });
                        _.each($scope.transcripts.details, function(item, key){
                            item.transcriptsOrder = [];
                            _.each(item.transcripts, function(i, k){
                                item.transcriptsOrder.push({ name: k, value: i })
                            });
                        });

                        $scope.xsreLastUpdated = response.lastUpdated;


                        angular.forEach(embedPrograms, function (v) {
                            var program = {
                                "years": new Date(v.participation_start_date).getFullYear(),
                                "name": v.program_name,
                                "start_date": v.participation_start_date,
                                "end_date": new Date(v.participation_end_date) >= Date.now() ? 'Present' : v.participation_end_date,
                                "active": v.active ? "Active" : "Inactive",
                                "cohorts": v.cohort
                            };
                            $scope.programs.push(program);
                        });
                        $scope.programs.sort(function (a, b) {
                            if (a['years'] >= b['years']) {
                                return (-1);
                            }
                            return (1);
                        });



                        for (var i = 0; i < $scope.programs.length; i++) {
                            var program = $scope.programs[i];
                            // Should we create a new group?
                            if (program['years'] !== groupValue) {
                                var group = {
                                    years: program['years'],
                                    programs: []
                                };
                                groupValue = group.years;
                                $scope.list_programs.push(group);
                            }

                            group.programs.push(program);
                        }

                    } else {
                        showError(response.error, 1);
                    }
                    $rootScope.doingResolve = false;
                })
                .error(function (response, status) {

                    //console.log(response);
                    //console.log(status);
                    showError(response, 1);
                    $rootScope.doingResolve = false;
                    if (status == 401) {
                        $rootScope.show_footer = false;
                        CookieStore.clearData();
                        $location.path('/login');
                    }

                });
        };

        getXsre();

        /**
         * Update Now, remove cache and reload the page content
         */
        $scope.updateNow = function () {
            $http.delete(api_url + AuthenticationService.organization_id + '/students/' + student_id + '/xsre', {
                    headers: {
                        'Authorization': 'Bearer ' + AuthenticationService.token
                    }
                })
                .success(function (response) {
                    getXsre();
                    //console.log(response);
                })
                .error(function (response, status) {

                    //console.log(response);
                    //console.log(status);
                    showError(response, 1);
                    $rootScope.doingResolve = false;
                    if (status == 401) {
                        $rootScope.show_footer = false;
                        CookieStore.clearData();
                        $location.path('/login');
                    }

                });
        };

}]).filter('flattenRows', function () {
    return function (transcriptTerm) {
        var flatten = [];
        var subrows = "";
        angular.forEach(transcriptTerm, function (row) {
            subrows = row.courses.course;
            flatten.push(row);
            if (subrows) {
                angular.forEach(subrows, function (subrow) {
                    flatten.push(angular.extend(subrow, {
                        subrow: true
                    }));
                });
            }
        });
        return flatten;

    }
});


app.controller('ProfileEditController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore) {
        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;
        $scope.editProfile = function (user) {
            if (user) {


                $scope.working = true;
                $http.put(api_url + 'user', $.param(user), {
                        headers: {
                            'Authorization': 'Bearer ' + AuthenticationService.token
                        }
                    })
                    .success(function (response) {

                        if (response.success == true) {
                            showError(response.message, 2);
                            var complete_name = '';
                            if (typeof user.first_name !== 'undefined' && user.first_name) {
                                complete_name += user.first_name + ' ';
                            }
                            if (typeof user.last_name !== 'undefined' && user.last_name) {
                                complete_name += user.last_name;
                            }

                            $rootScope.completeName = complete_name;
                            $location.path('/profile');

                        } else {
                            showError(response.message, 1);
                        }
                        $scope.working = false;

                    })
                    .error(function (response, status) {

                        //console.log(response);
                        //console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if (status == 401) {
                            $rootScope.show_footer = false;
                            CookieStore.clearData();
                            $location.path('/login');
                        }

                    });
            }
        };
        $http.get(api_url + 'user', {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {

                $scope.user = response;
                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

    }

]);


app.controller('ProfileController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;
        $rootScope.editable = false;

        $scope.activateEditable = function () {
            $rootScope.editable = true;
        };

        $http.get(api_url + 'user/', {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {
                $scope.user = response;
                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

        $scope.editProfile = function (data) {
            if (data) {
                $scope.working = true;
                if (data.password != data.retype_password) {

                    showError($rootScope.lang.password_not_match, 1);
                    $scope.working = false;
                } else {
                    var user = {
                        "email": data.email,
                        "first_name": data.first_name,
                        "middle_name": data.middle_name,
                        "last_name": data.last_name,
                        "password": data.password,
                        "retype_password": data.retype_password
                    };
                    $scope.working = true;
                    //$http.put( api_url+AuthenticationService.organization_id+'/users/'+AuthenticationService.user_id, $.param(user), {

                    $http.put(api_url + 'user/', $.param(user), {
                            headers: {
                                'Authorization': 'Bearer ' + AuthenticationService.token
                            }
                        })
                        .success(function (response) {

                            if (response.success == true) {
                                $scope.working = false;
                                $location.path('/profile');
                                //console.log("Successfully updated");
                                $rootScope.doingResolve = false;
                                showError(response.message, 2);
                                var complete_name = '';
                                if (typeof user.first_name !== 'undefined' && user.first_name) {
                                    complete_name += user.first_name + ' ';
                                }
                                if (typeof user.last_name !== 'undefined' && user.last_name) {
                                    complete_name += user.last_name;
                                }

                                $rootScope.completeName = complete_name;

                            } else {
                                showError(response.message, 1);
                            }
                            $scope.working = false;

                        })
                        .error(function (response, status) {

                            //console.log(response);
                            //console.log(status);
                            showError(response, 1);
                            $scope.working = false;
                            if (status == 401) {
                                $rootScope.show_footer = false;
                                CookieStore.clearData();
                                $location.path('/login');
                            }

                        });
                }
            }
        };

    }
]);


app.controller('StudentProgramAddController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;

        var student_id = $routeParams.student_id;

        $scope.program = {
            active: true
        };

        $scope.addProgramStudent = function (program) {
            if (program) {
                $scope.working = true;
                $http.post(api_url + AuthenticationService.organization_id + '/students/' + student_id + '/programs', $.param(program), {
                        headers: {
                            'Authorization': 'Bearer ' + AuthenticationService.token
                        }
                    })
                    .success(function (response) {
                        //console.log(response);
                        if (response.success == true) {
                            showError(response.message, 2);
                            $location.path('/login');

                        } else {
                            showError(response.error.message, 1);
                        }
                        $scope.working = false;

                    })
                    .error(function (response, status) {

                        //console.log(response);
                        //console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if (status == 401) {
                            $rootScope.show_footer = false;
                            CookieStore.clearData();
                            $location.path('/login');
                        }

                    });
            }
        };

        $http.get(api_url + AuthenticationService.organization_id + '/students/' + student_id, {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {

                $scope.student = response;
                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

        $http.get(api_url + AuthenticationService.organization_id + '/tags', {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {

                var availableTags = [];
                for (var i = 0; i < response.data.length; i++) {
                    availableTags.push(response.data[i].name);
                }


                jQuery("#cohort").tagit({
                    availableTags: availableTags
                });


                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

        $http.get(api_url + AuthenticationService.organization_id + '/programs', {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {

                if (response.success == true && response.total > 0) {
                    $scope.list_program = response.data;
                } else {
                    showError(response.error.message, 1);
                }
                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

    }
]);


app.controller('StudentProgramController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;

        var student_id = $routeParams.student_id;
        var list_program = [];

        $http.get(api_url + AuthenticationService.organization_id + '/students/' + student_id, {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {

                $scope.student = response;
                $rootScope.doingResolve = false;
            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

        $http.get(api_url + AuthenticationService.organization_id + '/programs', {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {

                if (response.success == true && response.total > 0) {
                    list_program = response.data;

                    $http.get(api_url + AuthenticationService.organization_id + '/students/' + student_id + '/programs', {
                            headers: {
                                'Authorization': 'Bearer ' + AuthenticationService.token
                            }
                        })
                        .success(function (response) {

                            for (var i = 0; i < response.data.length; i++) {
                                for (var j = 0; j < list_program.length; j++) {
                                    if (response.data[i].program == list_program[j]._id) {
                                        response.data[i].name = list_program[j].name;
                                    }
                                }
                            }

                            $scope.programs = response.data;
                            $rootScope.doingResolve = false;
                        })
                        .error(function (response, status) {

                            //console.log(response);
                            //console.log(status);
                            showError(response, 1);
                            $rootScope.doingResolve = false;
                            if (status == 401) {
                                $rootScope.show_footer = false;
                                CookieStore.clearData();
                                $location.path('/login');
                            }

                        });

                } else {
                    showError(response.error.message, 1);
                }
                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

    }
]);

app.controller('ProgramStudentEditController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;

        var student_id = $routeParams.student_id;
        var program_id = $routeParams.program_id;
        var cohort = '';
        var active_status = '';
        var start_date = '';
        var end_date = '';

        $http.get(api_url + AuthenticationService.organization_id + '/programs/' + program_id, {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {
                $scope.program = response;
            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

        $http.get(api_url + AuthenticationService.organization_id + '/programs/' + program_id + '/students/' + student_id, {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {
                //console.log(response);
                angular.forEach(response.programs, function (v, k) {

                    if (program_id == v.program) {
                        active_status = v.active;
                        start_date = v.participation_start_date;
                        end_date = v.participation_end_date;
                        cohort = v.cohort.join();
                    }

                });

                $scope.student = {
                    "_id": response._id,
                    "name": response.first_name + ' ' + response.last_name,
                    "active": active_status,
                    "participation_start_date": start_date,
                    "participation_end_date": end_date,
                    "cohort": cohort
                };


                $http.get(api_url + AuthenticationService.organization_id + '/tags', {
                        headers: {
                            'Authorization': 'Bearer ' + AuthenticationService.token
                        }
                    })
                    .success(function (responseTag) {

                        var availableTags = [];
                        for (var i = 0; i < responseTag.data.length; i++) {
                            availableTags.push(responseTag.data[i].name);
                        }


                        jQuery("#cohort").tagit({
                            availableTags: availableTags
                        });


                    })
                    .error(function (responseTag, statusTag) {

                        //console.log(responseTag);
                        //console.log(statusTag);
                        showError(responseTag, 1);
                        $rootScope.doingResolve = false;
                        if (status == 401) {
                            $rootScope.show_footer = false;
                            CookieStore.clearData();
                            $location.path('/login');
                        }

                    });

                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });


        $scope.editProgramStudent = function (student) {
            if (student) {
                $scope.working = true;

                $http.put(api_url + AuthenticationService.organization_id + '/programs/' + program_id + '/students/' + student_id, $.param(student), {
                        headers: {
                            'Authorization': 'Bearer ' + AuthenticationService.token
                        }
                    })
                    .success(function (response) {

                        showError(response.message, 2);
                        $scope.working = false;
                        $location.path('/program/students/' + program_id);
                    })
                    .error(function (response, status) {

                        //console.log(response);
                        //console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if (status == 401) {
                            $rootScope.show_footer = false;
                            CookieStore.clearData();
                            $location.path('/login');
                        }

                    });
            }

            $rootScope.editable = false;
        };
    }
]);


app.controller('StudentController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore', 'locale', '$timeout',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore, locale, $timeout) {
        var districtOption = {};
        var options = [];
        var school_options = [];
        var schoolOptions = {};
        $rootScope.full_screen = false;
        $scope.students = [];
        $scope.districtData = [];
        $scope.schoolNameData = [];
        $scope.selected_districts = [];
        $scope.selected_schools = [];
        $scope.filterSettings = {
            scrollableHeight: '250px',
            scrollable: true
        };

        $scope.filterDistrict = function () {
            return function (p) {
                if($scope.selected_districts != '') {
                    for (var i in $scope.selected_districts) {
                        if (p.school_district == $scope.selected_districts[i]) {
                            return true;
                        }
                    }
                }else{
                    return true;
                }

            };
        };
        $scope.filterSchools = function () {
            return function (p) {
                if($scope.selected_schools != '') {
                    for (var i in $scope.selected_schools) {
                        if (p.schoolName == $scope.selected_schools[i]) {
                            return true;
                        }
                    }
                }else{
                    return true;
                }

            };
        };

        $scope.deleteStudent = function (id, index) {
            if (id) {
                $scope.working = true;
                $http.delete(api_url + AuthenticationService.organization_id + '/students/' + id, {
                        headers: {
                            'Authorization': 'Bearer ' + AuthenticationService.token
                        }
                    })
                    .success(function (response) {

                        $scope.students.splice(index, 1);
                        $scope.working = false;

                    })
                    .error(function (response, status) {

                        //console.log(response);
                        //console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if (status == 401) {
                            $rootScope.show_footer = false;
                            CookieStore.clearData();
                            $location.path('/login');
                        }

                    });
            }
        };

        var pullXsreStudents = function(studentKeys){

            angular.forEach($scope.students, function(student){
                student.gradeLevel = locale.getString('general.retrieving');
                student.schoolYear = locale.getString('general.retrieving');
                student.schoolName = locale.getString('general.retrieving');
                student.attendance = locale.getString('general.retrieving');
                student.behavior = locale.getString('general.retrieving');
                student.onTrackGraduate = locale.getString('general.retrieving');

                $http.get(api_url + AuthenticationService.organization_id + '/students/'+student._id+'?xsre=1', {
                    headers: {
                        'Authorization': 'Bearer ' + AuthenticationService.token
                    }
                })
                .success(function (student) {

                    if(student._id in studentKeys){
                        var onTrack = _.get(student,'xsre.onTrackToGraduate');
                        if(onTrack === 'Y'){
                            onTrack = locale.getString('general.on_track');
                        } else if(onTrack === 'N') {
                            onTrack = locale.getString('general.off_track');
                        } else {
                            onTrack = locale.getString('general.unavailable');
                        }
                        $scope.students[studentKeys[student._id]].gradeLevel = _.get(student, 'xsre.gradeLevel') || locale.getString('general.unavailable');
                        $scope.students[studentKeys[student._id]].schoolYear = _.get(student,'xsre.schoolYear') || locale.getString('general.unavailable');
                        $scope.students[studentKeys[student._id]].schoolName = _.get(student,'xsre.schoolName') || locale.getString('general.unavailable');
                        $scope.students[studentKeys[student._id]].attendance = _.get(student,'xsre.attendance') ? locale.getString('general.day_missed', [_.get(student,'xsre.attendance')]) : locale.getString('general.unavailable');
                        $scope.students[studentKeys[student._id]].behavior = _.get(student,'xsre.behavior') ? locale.getString('general.incidents', [_.get(student,'xsre.behavior')]) : locale.getString('general.unavailable');
                        $scope.students[studentKeys[student._id]].onTrackGraduate = onTrack;

                    } else {

                        $scope.students[studentKeys[student._id]].gradeLevel = locale.getString('general.unavailable');
                        $scope.students[studentKeys[student._id]].schoolYear = locale.getString('general.unavailable');
                        $scope.students[studentKeys[student._id]].schoolName = locale.getString('general.unavailable');
                        $scope.students[studentKeys[student._id]].attendance = locale.getString('general.unavailable');
                        $scope.students[studentKeys[student._id]].behavior = locale.getString('general.unavailable');
                        $scope.students[studentKeys[student._id]].onTrackGraduate = locale.getString('general.unavailable');

                    }

                })
                .error(function (response, status) {

                    //console.log(response);
                    //console.log(status);
                    showError(response, 1);
                    if (status == 401) {
                        $rootScope.show_footer = false;
                        CookieStore.clearData();
                        $location.path('/login');
                    } else if(status >= 500){
                        $scope.students[studentKeys[student._id]].gradeLevel = locale.getString('general.unavailable');
                        $scope.students[studentKeys[student._id]].schoolYear = locale.getString('general.unavailable');
                        $scope.students[studentKeys[student._id]].schoolName = locale.getString('general.unavailable');
                        $scope.students[studentKeys[student._id]].attendance = locale.getString('general.unavailable');
                        $scope.students[studentKeys[student._id]].behavior = locale.getString('general.unavailable');
                        $scope.students[studentKeys[student._id]].onTrackGraduate = locale.getString('general.unavailable');
                    }

                });
            });

        };

        $http.get(api_url + AuthenticationService.organization_id + '/students', {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {

                if (response.success == true && response.total > 0) {
                    var embedData = [];
                    embedData = ('data' in response) ? response.data : [];
                    var data = [];
                    var o = 0;
                    var studentKeys = {};
                    angular.forEach(embedData, function (student) {

                        $.each(schoolDistricts, function (key, value) {
                            if (key == student.school_district || value == student.school_district) {
                                student.school_district = value;
                           }
                        });
                        student.gradeLevel = locale.getString('general.not_ready');
                        student.schoolYear = locale.getString('general.not_ready');
                        student.schoolName = locale.getString('general.not_ready');
                        student.attendance = locale.getString('general.not_ready');
                        student.behavior = locale.getString('general.not_ready');
                        student.onTrackGraduate = locale.getString('general.not_ready');
                        $scope.students.push(student);
                        studentKeys[student._id] = o;
                        o++;
                        if(options.indexOf(student.school_district) == -1){
                            options.push(student.school_district);
                        }
                        if(school_options.indexOf(student.schoolName) == -1 && student.schoolName != undefined ){
                            school_options.push(student.schoolName);
                        }

                    });
                    /**
                     * Get XSRE
                     */
                    $timeout( function(){ pullXsreStudents(studentKeys); }, 3000);

                    angular.forEach(school_options,function(value){
                        schoolOptions ={
                            id:value,
                            name:value
                        };
                        $scope.schoolNameData.push(schoolOptions);
                    });
                    angular.forEach(options,function(value){
                        districtOption = {
                            id:value,
                            name:value
                        };
                        $scope.districtData.push(districtOption);
                    });

                } else {
                    showError(response.error.message, 1);
                }
                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

    }
]);

app.directive('dropdownMultiselect', function(){
    return {
        restrict: 'E',
        scope:{
            model: '=',
            options: '=',
            title:'@'
        },
        template: "<div class='btn-group' data-ng-class='{open: open}'>"+
        "<button class='filter-btn button dropdown-toggle' data-ng-click='open=!open;openDropdown()'>{{title}} <span class='filter-caret caret'></span></button>"+
        //"<button class='btn btn-small dropdown-toggle' data-ng-click='open=!open;openDropdown()'><span class='caret'></span></button>"+
        "<ul class='filter-btn dropdown-menu' aria-labelledby='dropdownMenu'>" +
        //"<li><a data-ng-click='selectAll()'><i class='icon-ok-sign'></i>  Check All</a></li>" +
        //"<li><a data-ng-click='deselectAll();'><i class='icon-remove-sign'></i>  Uncheck All</a></li>" +
        //"<li class='divider'></li>" +
        "<li data-ng-repeat='option in options'> <a data-ng-click='setSelectedItem()'>{{option.name}}<span data-ng-class='isChecked(option.id)'></span></a></li>" +
        "</ul>" +
        "</div>" ,
        controller: function($scope){

            $scope.openDropdown = function(){
                $scope.selected_items = [];
                //for(var i=0; i<$scope.pre_selected.length; i++){
                //    $scope.selected_items.push($scope.pre_selected[i].id);
                //}
            };

            $scope.selectAll = function () {
                $scope.model = _.pluck($scope.options, 'id');
                console.log($scope.model);
            };
            $scope.deselectAll = function() {
                $scope.model=[];
                console.log($scope.model);
            };
            $scope.setSelectedItem = function(){
                var id = this.option.id;
                if (_.contains($scope.model, id)) {
                    $scope.model = _.without($scope.model, id);
                } else {
                    $scope.model.push(id);
                }
                return false;
            };
            $scope.isChecked = function (id) {
                if (_.contains($scope.model, id)) {
                    return 'icon-ok pull-right';
                }
                return false;
            };
        }
    }
});

function unique_array(){
    var newArr = [],
        origLen = origArr.length,
        found, x, y;

    for (x = 0; x < origLen; x++) {
        found = undefined;
        for (y = 0; y < newArr.length; y++) {
            if (origArr[x] === newArr[y]) {
                found = true;
                break;
            }
        }
        if (!found) {
            newArr.push(origArr[x]);
        }
    }
    return newArr;
}


app.controller('ProgramAddController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;

        $scope.addProgram = function (program) {
            if (program) {
                program.redirect_url = AuthenticationService.redirect_url;

                $scope.working = true;
                $http.post(api_url + AuthenticationService.organization_id + '/programs', $.param(program), {
                        headers: {
                            'Authorization': 'Bearer ' + AuthenticationService.token
                        }
                    })
                    .success(function (response) {
                        if (response.success) {
                            showError(response.message, 2);
                            $scope.working = false;
                            $location.path('/program');
                        } else {
                            showError(response.message, 1);
                            $scope.working = false;
                        }


                    })
                    .error(function (response, status) {

                        //console.log(response);
                        //console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if (status == 401) {
                            $rootScope.show_footer = false;
                            CookieStore.clearData();
                            $location.path('/login');
                        }

                    });
            }
        };

    }
]);


app.controller('ProgramDetailController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;
        $rootScope.editable = false;

        var program_id = $routeParams.program_id;

        $scope.activateEditable = function () {
            $rootScope.editable = true;
        };

        $scope.editProgram = function (program) {
            if (program) {
                program.redirect_url = AuthenticationService.redirect_url;

                $scope.working = true;
                $http.put(api_url + AuthenticationService.organization_id + '/programs/' + program_id, $.param(program), {
                        headers: {
                            'Authorization': 'Bearer ' + AuthenticationService.token
                        }
                    })
                    .success(function (response) {

                        showError(response.message, 2);
                        $scope.working = false;
                        $location.path('program/detail/' + program_id);
                    })
                    .error(function (response, status) {

                        //console.log(response);
                        //console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if (status == 401) {
                            $rootScope.show_footer = false;
                            CookieStore.clearData();
                            $location.path('/login');
                        }

                    });
            }

            $rootScope.editable = false;
        };

        $scope.deleteProgram = function (id, index) {
            if (id) {
                $scope.working = true;
                $http.delete(api_url + AuthenticationService.organization_id + '/programs/' + id, {
                        headers: {
                            'Authorization': 'Bearer ' + AuthenticationService.token
                        }
                    })
                    .success(function (response) {
                        $scope.working = false;
                        $location.path('/program')

                    })
                    .error(function (response, status) {

                        //console.log(response);
                        //console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if (status == 401) {
                            $rootScope.show_footer = false;
                            CookieStore.clearData();
                            $location.path('/login');
                        }

                    });
            }
        };

        $http.get(api_url + AuthenticationService.organization_id + '/programs/' + program_id, {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {

                $scope.program = response;
                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

    }
]);


app.controller('ProgramEditController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;

        var program_id = $routeParams.program_id;

        $scope.editProgram = function (program) {
            if (program) {
                program.redirect_url = AuthenticationService.redirect_url;

                $scope.working = true;
                $http.put(api_url + AuthenticationService.organization_id + '/programs/' + program_id, $.param(program), {
                        headers: {
                            'Authorization': 'Bearer ' + AuthenticationService.token
                        }
                    })
                    .success(function (response) {

                        showError(response.message, 2);
                        $scope.working = false;
                        $location.path('/program');
                    })
                    .error(function (response, status) {

                        //console.log(response);
                        //console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if (status == 401) {
                            $rootScope.show_footer = false;
                            CookieStore.clearData();
                            $location.path('/login');
                        }

                    });
            }
        };

        $http.get(api_url + AuthenticationService.organization_id + '/programs/' + program_id, {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {

                $scope.program = response;
                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }
                ds

            });

    }
]);


app.controller('ProgramStudentAddController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore) {
        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;
        var rawCohart = '';
        var program_id = $routeParams.program_id;


        $http.get(api_url + AuthenticationService.organization_id + '/programs/' + program_id, {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {
                $scope.program = response;
                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

        $http.get(api_url + AuthenticationService.organization_id + '/tags', {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {

                var availableTags = [];
                for (var i = 0; i < response.data.length; i++) {
                    availableTags.push(response.data[i].name);
                }


                jQuery("#cohort").tagit({
                    availableTags: availableTags
                });


                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

        $http.get(api_url + AuthenticationService.organization_id + '/students', {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {

                if (response.success == true && response.total > 0) {
                    $scope.list_student = response.data;
                } else {
                    showError(response.error.message, 1);
                }
                $rootScope.doingResolve = false;
                $scope.program ? $scope.program.active = true : $scope.program = {
                    active: true
                };
            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });
        $scope.addProgramStudent = function (program) {
            if (program) {
                if (program.cohort != null) {
                    rawCohart = program.cohort.split(',');
                } else if (program.cohort == 'undefined' || program.cohort == 'undefined') {
                    rawCohart = '';
                }
                program.cohort = rawCohart;
                $scope.working = true;
                $http.post(api_url + AuthenticationService.organization_id + '/programs/' + program_id + '/students', $.param(program), {
                        headers: {
                            'Authorization': 'Bearer ' + AuthenticationService.token
                        }
                    })
                    .success(function (response) {
                        if (response.success == false) {
                            $scope.working = false;
                            showError(response.error, 1);
                        } else {
                            showError(response.message, 2);
                            $location.path('/program/students/' + program_id);

                            $scope.working = false;
                        }


                    })
                    .error(function (response, status) {

                        //console.log(response);
                        //console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if (status == 401) {
                            $rootScope.show_footer = false;
                            CookieStore.clearData();
                            $location.path('/login');
                        }

                    });
            }
        };

    }
]);


app.controller('ProgramStudentController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;
        var program_id = $routeParams.program_id;
        var active_status = '';
        var start_date = '';
        var end_date = '';
        var cohort = '';
        $scope.students = [];
        $http.get(api_url + AuthenticationService.organization_id + '/programs/' + program_id, {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {
                $scope.program = response;
                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

        $http.get(api_url + AuthenticationService.organization_id + '/programs/' + program_id + '/students', {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {
                //console.log(response);
                if (response.success == true && response.total > 0) {

                    angular.forEach(response.data, function (value, key) {

                        cohort = '';
                        angular.forEach(value.programs, function (v, k) {
                            if (v.program == program_id) {
                                active_status = v.active;
                                start_date = v.participation_start_date;
                                end_date = v.participation_end_date;
                                cohort = v.cohort.join();
                                var student = {
                                    "_id": value._id,
                                    "name": value.first_name + ' ' + value.last_name,
                                    "active": active_status,
                                    "start_date": start_date,
                                    "end_date": end_date,
                                    "cohort": cohort
                                };
                                $scope.students.push(student);
                            }
                        });



                    });
                }
                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

        $scope.deleteStudent = function (id, index) {
            if (id) {
                $scope.working = true;
                $http.delete(api_url + AuthenticationService.organization_id + '/programs/' + program_id + '/students/' + id, {
                        headers: {
                            'Authorization': 'Bearer ' + AuthenticationService.token
                        }
                    })
                    .success(function (response) {

                        if (response.success) {
                            $scope.students.splice(index, 1);
                            $scope.working = false;
                            $location.path('/program/students/' + program_id)
                        }

                    })
                    .error(function (response, status) {

                        //console.log(response);
                        //console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if (status == 401) {
                            $rootScope.show_footer = false;
                            CookieStore.clearData();
                            $location.path('/login');
                        }

                    });

            }
        };

    }
]);


app.controller('ProgramController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore) {
        $rootScope.full_screen = false;
        $scope.programs = [];

        $scope.deleteProgram = function (id, index) {

            if (id) {
                $scope.working = true;
                $http.delete(api_url + AuthenticationService.organization_id + '/programs/' + id, {
                        headers: {
                            'Authorization': 'Bearer ' + AuthenticationService.token
                        }
                    })
                    .success(function (response) {
                        showError(response.message, 2);
                        $scope.programs.splice(index, 1);
                        $scope.working = false;
                        $location.path('/program')

                    })
                    .error(function (response, status) {

                        //console.log(response);
                        //console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if (status == 401) {
                            $rootScope.show_footer = false;
                            CookieStore.clearData();
                            $location.path('/login');
                        }

                    });
            }
        };

        $http.get(api_url + AuthenticationService.organization_id + '/programs', {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {

                if (response.success == true && response.total > 0) {
                    $scope.programs = response.data;
                } else {
                    showError(response.error.message, 1);
                }
                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

    }
]);


app.controller('UserInviteController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;

        $scope.user = {
            role: 'case-worker-restricted'
        };


        $scope.inviteUser = function (user) {
            user.caseWorkerRestricted = !user.caseWorkerRestricted;

            if (user) {
                user.redirect_url = AuthenticationService.redirect_url;

                $scope.working = true;
                $http.post(auth_url + '/user/invite', $.param(user), {
                        headers: {
                            'Authorization': 'Bearer ' + AuthenticationService.token
                        }
                    })
                    .success(function (response) {
                        if (response.success == true) {
                            showError(response.message, 2);

                            $location.path('/user');
                        } else {
                            showError(response.message, 1);
                        }
                        $scope.working = false;

                    })
                    .error(function (response, status) {

                        //console.log(response);
                        //console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if (status == 401) {
                            $rootScope.show_footer = false;
                            CookieStore.clearData();
                            $location.path('/login');
                        }

                    });
            }
        };

    }
]);


app.controller('UserGroupAddController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;

        var user_id = $routeParams.user_id;

        $scope.students = [];
        $scope.new_student = false;

        $scope.addUserStudent = function (student, new_student) {
            //console.log(student);
            //console.log(new_student);
            if (student) {
                $scope.working = true;
                if (new_student == true) {
                    $http.post(api_url + AuthenticationService.organization_id + '/users/' + user_id + '/students', $.param(student), {
                            headers: {
                                'Authorization': 'Bearer ' + AuthenticationService.token
                            }
                        }).success(function (response) {

                            $scope.working = false;
                            if (response.success) {
                                showError(response.message, 2);
                                $location.path('/user/group/' + user_id);
                            } else {
                                showError(response.message, 1);
                            }

                        })
                        .error(function (response, status) {

                            //console.log(response);
                            //console.log(status);
                            showError(response, 1);
                            $scope.working = false;
                            if (status == 401) {
                                $rootScope.show_footer = false;
                                CookieStore.clearData();
                                $location.path('/login');
                            }

                        });
                } else {
                    $http.put(api_url + AuthenticationService.organization_id + '/users/' + user_id + '/students/' + student.student_id, {}, {
                            headers: {
                                'Authorization': 'Bearer ' + AuthenticationService.token
                            }
                        }).success(function (response) {

                            $scope.working = false;
                            if (response.success) {
                                showError(response.message, 2);
                                $location.path('/user/group/' + user_id);
                            } else {
                                showError(response.message, 1);
                            }

                        })
                        .error(function (response, status) {

                            //console.log(response);
                            //console.log(status);
                            showError(response, 1);
                            $scope.working = false;
                            if (status == 401) {
                                $rootScope.show_footer = false;
                                CookieStore.clearData();
                                $location.path('/login');
                            }

                        });
                }
            }
        };

        $http.get(api_url + AuthenticationService.organization_id + '/users/' + user_id, {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {

                $scope.user = response;
                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

        $http.get(api_url + AuthenticationService.organization_id + '/students', {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {

                if (response.success == true && response.total > 0) {
                    $scope.list_student = response.data;
                } else {
                    showError(response.error.message, 1);
                }
                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

    }
]);


app.controller('UserGroupController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;
        if(!$scope.user) $scope.user = { full_name: "" };

        var user_id = $routeParams.user_id;

        $scope.deleteStudent = function (student_id, index) {
            $http.delete(api_url + AuthenticationService.organization_id + '/users/' + user_id + '/students/' + student_id, {
                    headers: {
                        'Authorization': 'Bearer ' + AuthenticationService.token
                    }
                })
                .success(function (response) {

                    //console.log(response);
                    $scope.students.splice(index, 1);
                    $scope.working = false;

                })
                .error(function (response, status) {

                    //console.log(response);
                    //console.log(status);
                    showError(response, 1);
                    $scope.working = false;
                    if (status == 401) {
                        $rootScope.show_footer = false;
                        CookieStore.clearData();
                        $location.path('/login');
                    }

                });
        };

        $http.get(api_url + AuthenticationService.organization_id + '/users/' + user_id, {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {

                $scope.user = response;
                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

        $http.get(api_url + AuthenticationService.organization_id + '/users/' + user_id + '/students', {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {

                //console.log(response);
                if (response.success) {
                    $scope.students = response.data;
                    $rootScope.doingResolve = false;
                }


            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

    }
]);

app.controller('UserAssignController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;

        var user_id = $routeParams.user_id;

        $scope.addUserStudent = function (student, index) {
            //console.log(user_id);
            //console.log(student);
            if (student) {
                $scope.working = true;
                $http.put(api_url + AuthenticationService.organization_id + '/users/' + user_id + '/students/' + student, {}, {
                        headers: {
                            'Authorization': 'Bearer ' + AuthenticationService.token
                        }
                    }).success(function (response) {
                        //console.log(response);
                        $scope.working = false;
                        if (response.success) {
                            $scope.unassigned_students.splice(index, 1);
                            showError(response.message, 2);
                            $location.path('/user/assign/' + user_id);
                        } else {
                            showError(response.message, 1);
                        }

                    })
                    .error(function (response, status) {

                        //console.log(response);
                        //console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if (status == 401) {
                            $rootScope.show_footer = false;
                            CookieStore.clearData();
                            $location.path('/login');
                        }

                    });
            }

        };


        $scope.deleteStudent = function (student_id, index) {
            $http.delete(api_url + AuthenticationService.organization_id + '/users/' + user_id + '/students/' + student_id, {
                    headers: {
                        'Authorization': 'Bearer ' + AuthenticationService.token
                    }
                })
                .success(function (response) {


                    $scope.assigned_students.splice(index, 1);
                    $scope.working = false;

                })
                .error(function (response, status) {

                    //console.log(response);
                    //console.log(status);
                    showError(response, 1);
                    $scope.working = false;
                    if (status == 401) {
                        $rootScope.show_footer = false;
                        CookieStore.clearData();
                        $location.path('/login');
                    }

                });
        };

        var user = {

            userId: user_id
        }

        $http.post(api_url + AuthenticationService.organization_id + '/students?unassigned=true', $.param(user), {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {
                //console.log(response.data);
                $scope.unassigned_students = response.data;
                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

        $http.get(api_url + AuthenticationService.organization_id + '/users/' + user_id + '/students', {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {
                //console.log(response.data);
                $scope.assigned_students = response.data;
                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

    }
]);


app.controller('UserEditController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;
        $scope.disable_select = false;
        var user_id = $routeParams.user_id;
        if (user_id == CookieStore.get('cboAdmin_cookie_user_id')) {
            $scope.disable_select = true;
            $scope.working = true;
        }
        $scope.editUser = function (user) {
            if (user) {
                $scope.working = true;

                var passing_data = {
                    role: user.role
                };

                $http.put(api_url + AuthenticationService.organization_id + '/users/' + user_id, $.param(passing_data), {
                        headers: {
                            'Authorization': 'Bearer ' + AuthenticationService.token
                        }
                    })
                    .success(function (response) {

                        if (response.success == true) {
                            showError(response.message, 2);
                            $location.path('/user');
                        } else {
                            showError(response.message, 1);
                        }
                        $scope.working = false;

                    })
                    .error(function (response, status) {

                        //console.log(response);
                        //console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if (status == 401) {
                            $rootScope.show_footer = false;
                            CookieStore.clearData();
                            $location.path('/login');
                        }

                    });
            }
        };

        $http.get(api_url + AuthenticationService.organization_id + '/users/' + user_id, {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {

                var set_role = response.role;

                $scope.user = {
                    role: set_role,
                    first_name: response.first_name,
                    last_name: response.last_name,
                    full_name: response.full_name
                };
                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

    }
]);


app.controller('UserDetailController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;

        var user_id = $routeParams.user_id;

        $http.get(api_url + AuthenticationService.organization_id + '/users/' + user_id, {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {

                $scope.user = response;
                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

    }
]);


app.controller('UserController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore) {
        $rootScope.full_screen = false;
        $scope.users = [];
        $scope.deleteUser = function (id, index) {
            if (AuthenticationService.user_id == id) {
                showError('Cannot Remove your own data', 1);
            } else if ((AuthenticationService.role+'').indexOf('case-worker') !== -1) {
                showError($rootScope.lang.you_dont_have_any_permission_page, 1);
            } else if (id) {
                $scope.working = true;
                $http.delete(api_url + AuthenticationService.organization_id + '/users/' + id, {
                        headers: {
                            'Authorization': 'Bearer ' + AuthenticationService.token
                        }
                    })
                    .success(function (response) {

                        $scope.users.splice(index, 1);
                        $scope.working = false;

                    })
                    .error(function (response, status) {

                        //console.log(response);
                        //console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if (status == 401) {
                            $rootScope.show_footer = false;
                            CookieStore.clearData();
                            $location.path('/login');
                        }

                    });
            }
        };

        $http.get(api_url + AuthenticationService.organization_id + '/users', {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {

                if (response.success == true && response.total > 0) {
                    $scope.users = response.data;
                } else {
                    showError(response.error.message, 1);
                }
                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });



    }
]);


app.filter('unique', function () {
    return function (collection, keyname) {
        var output = [],
            keys = [];

        angular.forEach(collection, function (item) {
            var key = item[keyname];
            if (keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });

        return output;
    };
});

app.controller('HeartbeatController', ['$rootScope', '$scope',
    function ($rootScope, $scope) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;

    }
]);

app.controller('LoginController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore) {

        stop_time_idle();

        $rootScope.full_screen = true;
        $rootScope.doingResolve = false;
        var getRemember = CookieStore.get('cboAdmin_cookie_remember');
        if (getRemember == true) {
            $scope.login = {
                username: CookieStore.get('cboAdmin_cookie_email'),
                remember_username: true
            };
        }

        $scope.loginMe = function (username, password, remmember) {

            $scope.login.working = true;

            var auth = base64_encode(globalConfig.client_id + ':' + globalConfig.client_secret);
            var grant_type = encodeURIComponent(globalConfig.grant_type);
            var uri = auth_url + 'oauth2/token';
            var send = {
                grant_type: grant_type,
                username: username,
                password: password,
                scope: 'offline_access'
            };

            $http.post(uri, $.param(send), {
                    headers: {
                        'Authorization': 'Basic ' + auth
                    }
                })
                .success(function (response) {


                    $http.get(api_url + 'organizations', {
                            headers: {
                                'Authorization': 'Bearer ' + response.access_token
                            }
                        })
                        .success(function (responseClient) {
                            $rootScope.show_footer = true;
                            var get_hosting_name = $location.host();
                            var grand_access = false;
                            var get_id = false;
                            var get_redirect_url = false;
                            var organization_name = '';


                            if (responseClient.success == true && responseClient.total > 0) {
                                $rootScope.organization_name = responseClient.data.name;
                                for (var i = 0; i < responseClient.total; i++) {
                                    if (__i || get_hosting_name === responseClient.data[i].url) {
                                        grand_access = true;
                                        get_id = responseClient.data[i]._id;
                                        get_redirect_url = responseClient.data[i].url;
                                        var myEl = angular.element(document.querySelector('body'));
                                        myEl.addClass('cbp-spmenu-push');
                                        organization_name = responseClient.data[i].name;
                                    }
                                }
                            }

                            if (grand_access) {
                                $http.get(api_url + get_id + '/users', {
                                        headers: {
                                            'Authorization': 'Bearer ' + response.access_token
                                        }
                                    })
                                    .success(function (responseUser) {
                                        if (responseUser.success == true && responseUser.total > 0) {
                                            var find = false;
                                            var data = responseUser.data;
                                            var id = false;
                                            var complete_name = '';
                                            var role = 'case-worker-restricted';
                                            for (var i = 0; i < responseUser.total; i++) {
                                                if (data[i].email == send.username) {
                                                    id = data[i]._id;
                                                    if (typeof data[i].first_name !== 'undefined' && data[i].first_name) {
                                                        complete_name += data[i].first_name + ' ';
                                                    }
                                                    if (typeof data[i].last_name !== 'undefined' && data[i].last_name) {
                                                        complete_name += data[i].last_name;
                                                    }

                                                    //if (data[i].permissions.length > 0) {
                                                    //    for (var j = 0; j < data[i].permissions.length; j++) {
                                                    //        if (data[i].permissions[j].organization == get_id) {
                                                    //            role = data[i].permissions[j].role;
                                                    //        }
                                                    //    }
                                                    //}
                                                    role = data[i].role;

                                                    if (role == 'admin') {
                                                        $rootScope.users_link = true;
                                                        $rootScope.tags_link = true;
                                                    } else {
                                                        $rootScope.users_link = false;
                                                        $rootScope.tags_link = false;
                                                    }
                                                    $rootScope.completeName = complete_name;
                                                    find = true;
                                                }
                                            }
                                            if (find) {
                                                CookieStore.setData(response.access_token, response.refresh_token, get_id, get_redirect_url, id, send.username, complete_name, role, organization_name);
                                                global_redirect_url = get_redirect_url;

                                                if (typeof remmember !== 'undefined' && remmember == true) {
                                                    CookieStore.put_remember(true);
                                                } else {
                                                    CookieStore.put_remember(false);
                                                }


                                            }
                                            start_time_idle();
                                            if('intended_url' in localStorage && localStorage.getItem('intended_url')!=''){
                                                $location.path(localStorage.getItem('intended_url'));
                                            }else {
                                                $location.path('/');
                                            }

                                        } else {
                                            showError(response.error.message, 1);
                                        }
                                        $rootScope.doingResolve = false;

                                    })
                                    .error(function (responseUser, status) {

                                        showError(responseUser, 1);
                                        $scope.login.working = false;

                                    });

                            } else {
                                showError($rootScope.lang.you_dont_have_any_permission_page, 1);
                                $scope.login.working = false;
                            }

                        })
                        .error(function (responseClient) {

                            showError(responseClient, 1);
                            $scope.login.working = false;

                        });

                })
                .error(function (response) {
                    //console.log(response);
                    showError(response.error_description, 1);
                    $scope.login.working = false;

                });

        };

        $scope.forgotPassword = function (user) {

            if (user) {
                user.redirect_url = window.location.origin;
                $scope.working = true;
                $http.post(auth_url + '/user/send/forgotpassword', $.param(user), {
                        headers: {
                            'Authorization': 'Bearer ' + AuthenticationService.token
                        }
                    })
                    .success(function (response) {
                        //console.log(response);
                        if (response.success == true) {
                            showError(response.message, 2);
                        } else {
                            showError(response.message, 1);
                        }
                        $scope.working = false;

                    })
                    .error(function (response, status) {

                        //console.log(response);
                        //console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if (status == 401) {
                            $rootScope.show_footer = false;
                            CookieStore.clearData();
                            $location.path('/login');
                        }

                    });
            }
        };


    }
]);

app.controller('TagController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore) {
        $rootScope.full_screen = false;
        $scope.tags = [];

        $scope.deleteTag = function (id, index) {

            if (id) {
                $scope.working = true;
                $http.delete(api_url + AuthenticationService.organization_id + '/tags/' + id, {
                        headers: {
                            'Authorization': 'Bearer ' + AuthenticationService.token
                        }
                    })
                    .success(function (response) {
                        showError(response.message, 2);
                        $scope.tags.splice(index, 1);
                        $scope.working = false;
                        $location.path('/tag')

                    })
                    .error(function (response, status) {

                        //console.log(response);
                        //console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if (status == 401) {
                            $rootScope.show_footer = false;
                            CookieStore.clearData();
                            $location.path('/login');
                        }

                    });
            }
        };

        $http.get(api_url + AuthenticationService.organization_id + '/tags', {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {

                if (response.success == true && response.total > 0) {
                    $scope.tags = response.data;
                } else {
                    showError(response.error.message, 1);
                }
                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

    }
]);

app.controller('TagAddController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;

        $scope.addTag = function (tag) {
            if (tag) {
                //console.log(tag);
                $scope.working = true;
                $http.post(api_url + AuthenticationService.organization_id + '/tags', $.param(tag), {
                        headers: {
                            'Authorization': 'Bearer ' + AuthenticationService.token
                        }
                    })
                    .success(function (response) {
                        if (response.success) {
                            showError(response.message, 2);
                            $scope.working = false;
                            $location.path('/tag');
                        } else {
                            showError(response.message, 1);
                            $scope.working = false;
                        }


                    })
                    .error(function (response, status) {

                        //console.log(response);
                        //console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if (status == 401) {
                            $rootScope.show_footer = false;
                            CookieStore.clearData();
                            $location.path('/login');
                        }

                    });
            }
        };

    }
]);

app.controller('TagEditController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;

        var tag_id = $routeParams.tag_id;

        $scope.editTag = function (tag) {
            if (tag) {
                tag.redirect_url = AuthenticationService.redirect_url;

                $scope.working = true;
                $http.put(api_url + AuthenticationService.organization_id + '/tags/' + tag_id, $.param(tag), {
                        headers: {
                            'Authorization': 'Bearer ' + AuthenticationService.token
                        }
                    })
                    .success(function (response) {

                        showError(response.message, 2);
                        $scope.working = false;
                        $location.path('/tag');
                    })
                    .error(function (response, status) {

                        //console.log(response);
                        //console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if (status == 401) {
                            $rootScope.show_footer = false;
                            CookieStore.clearData();
                            $location.path('/login');
                        }

                    });
            }
        };

        $http.get(api_url + AuthenticationService.organization_id + '/tags/' + tag_id, {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
            .success(function (response) {

                $scope.tag = response;
                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }
                ds

            });

    }
]);

app.directive('ngConfirmClick', [
        function () {
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click', function (event) {
                    if (window.confirm(msg)) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
    }])

app.directive('contenteditable', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            // view -> model
            var clickAction = attrs.confirmedAction;
            elm.bind('blur', function () {
                var html = elm.html();
                scope.$apply(function () {
                    ctrl.$setViewValue(elm.html());
                });
                elm.html(html);
                scope.$eval(clickAction);
            });

            // model -> view
            ctrl.render = function (value) {
                elm.html(value);
            };

            // load init value from DOM
            ctrl.$setViewValue(elm.html());

            elm.bind('keydown', function (event) {
                var esc = event.which == 27,
                    el = event.target;

                if (esc) {
                    ctrl.$setViewValue(elm.html());
                    el.blur();
                    event.preventDefault();
                }

            });

        }
    };
});

app.directive('phonenumberDirective', ['$filter', function ($filter) {
    /*
    Intended use:
    	<phonenumber-directive placeholder='prompt' model='someModel.phonenumber'></phonenumber-directive>
    Where:
    	someModel.phonenumber: {String} value which to bind only the numeric characters [0-9] entered
    		ie, if user enters 617-2223333, value of 6172223333 will be bound to model
    	prompt: {String} text to keep in placeholder when no numeric input entered
    */

    function link(scope, element, attributes) {

        // scope.inputValue is the value of input element used in template
        scope.inputValue = scope.phonenumberModel;

        scope.$watch('inputValue', function (value, oldValue) {

            value = String(value);
            var number = value.replace(/[^0-9]+/g, '');
            scope.phonenumberModel = number;
            scope.inputValue = $filter('phonenumber')(number);
        });
    }

    return {
        link: link,
        restrict: 'E',
        scope: {
            phonenumberPlaceholder: '=placeholder',
            phonenumberModel: '=model',
        },
        //templateUrl: '/static/phonenumberModule/template.html',
        template: '<input ng-model="inputValue" type="tel" class="phonenumber form-control" placeholder="{{phonenumberPlaceholder}}" title="Phonenumber (Format: (999) 9999-9999)">',
    };
	}])

.filter('phonenumber', function () {
    /* 
    Format phonenumber as: c (xxx) xxx-xxxx
    	or as close as possible if phonenumber length is not 10
    	if c is not '1' (country code not USA), does not use country code
    */

    return function (number) {
        /* 
        @param {Number | String} number - Number that will be formatted as telephone number
        Returns formatted number: (###) ###-####
        	if number.length < 4: ###
        	else if number.length < 7: (###) ###
        Does not handle country codes that are not '1' (USA)
        */
        if (!number) {
            return '';
        }

        number = String(number);

        // Will return formattedNumber. 
        // If phonenumber isn't longer than an area code, just show number
        var formattedNumber = number;

        // if the first character is '1', strip it out and add it back
        var c = (number[0] == '1') ? '1 ' : '';
        number = number[0] == '1' ? number.slice(1) : number;

        // # (###) ###-#### as c (area) front-end
        var area = number.substring(0, 3);
        var front = number.substring(3, 6);
        var end = number.substring(6, 10);

        if (front) {
            formattedNumber = (c + "(" + area + ") " + front);
        }
        if (end) {
            formattedNumber += ("-" + end);
        }
        return formattedNumber;
    };
});


app.directive('resize', function ($window) {
    return function (scope, element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function () {
            return {
                'h': w.height(),
                'w': w.width()
            };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;
            if (w.innerWidth < 767) {
                $rootScope.loginClass = "col-md-offset-4 col-md-5 login-page-mobile";
                $rootScope.data_content = "asset/templates/mobile.html";

            } else if (w.innerWidth > 767) {
                $rootScope.loginClass = "col-md-offset-4 col-md-5 login-page";
                $rootScope.data_content = "asset/templates/desktop.html";
            }

        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });
    }
})

app.factory('myGoogleAnalytics', [
    '$rootScope', '$window', '$location',
    function ($rootScope, $window, $location) {

            var myGoogleAnalytics = {};

            /**
             * Set the page to the current location path
             * and then send a pageview to log path change.
             */
            myGoogleAnalytics.sendPageview = function () {
                if ($window.ga) {
                    $window.ga('set', 'page', $location.path());
                    $window.ga('send', 'pageview');
                }
            }

            // subscribe to events
            $rootScope.$on('$viewContentLoaded', myGoogleAnalytics.sendPageview);

            return myGoogleAnalytics;
    }
  ])
    .run([
    'myGoogleAnalytics',
    function (myGoogleAnalytics) {
            // inject self
    }
  ]);

app.directive('datepicker', function () {

    return {
        restrict: 'E',
        transclude: true,
        scope: {
            date: '='
        },
        link: function (scope, element, attrs) {
            element.datepicker({
                dateFormat: 'mm/dd/yy',
                onSelect: function (dateText, datepicker) {
                    scope.date = dateText;
                    scope.$apply();
                }
            });
        },
        template: '<input type="text" class="form-control" ng-model="date"/>',
        replace: true
    }

});

app.directive('a', function () {
    return {
        restrict: 'E',
        link: function (scope, elem, attrs) {
            if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                elem.on('click', function (e) {
                    e.preventDefault();
                });
            }
        }
    };
});

app.directive('listItem',function(){

    return {
        restrict: 'E',
        scope:{
            data:'=',
            slug:'=',
            event:'=',
            title:'='
        },

        template:'<div class="grid-item {{slug}}" tooltip-html="data"></div>'


    };


});

function showError(message, alert) {
    var passingClass = 'alert-danger';
    if (alert == 2) {
        passingClass = 'alert-success'
    }
    var message_alert = '<div class="alert ' + passingClass + ' alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' + message + '</div>';
    jQuery("#error-container").append(message_alert);
    setTimeout(function () {
        jQuery('.alert').remove();
    }, 3000);

}

function ucwords(str) {
    return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
        return $1.toUpperCase();
    });
}

function closed_sidebar() {
    var body = angular.element(document.querySelector('body'));
    var nav = angular.element(document.querySelector('#cbp-spmenu-s1'));
    var icon = angular.element(document.querySelector('#showLeftPush'));
    body.removeClass('cbp-spmenu-push-toright');
    nav.removeClass('cbp-spmenu-open');
    if (icon.hasClass('glyphicon glyphicon-remove')) {
        icon.removeClass('glyphicon glyphicon-remove');
        icon.addClass('glyphicon glyphicon-menu-hamburger');
    } else if (icon.hasClass('glyphicon glyphicon-menu-hamburger')) {
        icon.removeClass('glyphicon glyphicon-menu-hamburger');
        icon.addClass('glyphicon glyphicon-remove');
    }
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


function start_time_idle() {
    session_timeout.login();
}

function stop_time_idle() {
    session_timeout.logout();
}