'use strict';

var auth_url = "https://auth.cbo.upward.st/api/";
var api_url = "https://api.cbo.upward.st/";

var globalConfig = {
    client_id: 'cbo_client_demo',
    client_secret: '7e98a24f4fe91535348f6e87cde866dca9134b50fc029abefdc7278369f2',
    response_type: 'code',
    grant_type: 'password'
};

var app = angular.module('CboPortal', ['ngRoute', 'ngCookies', 'ngPrettyJson', 'ui.date']);

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
            templateUrl: 'asset/templates/student/list.html',
            controller: 'StudentController',
            access: { requiredAuthentication: true }
        }).
        when('/student/add', {
            templateUrl: 'asset/templates/student/add.html',
            controller: 'StudentAddController',
            access: { requiredAuthentication: true }
        }).
        when('/student/backpacks/:student_id', {
            templateUrl: 'asset/templates/student/backpacks.html',
            controller: 'StudentBackpackController',
            access: { requiredAuthentication: true }
        }).
        when('/student/detail/:student_id', {
            templateUrl: 'asset/templates/student/detail.html',
            controller: 'StudentDetailController',
            access: { requiredAuthentication: true }
        }).
        when('/student/edit/:student_id', {
            templateUrl: 'asset/templates/student/edit.html',
            controller: 'StudentEditController',
            access: { requiredAuthentication: true }
        }).
        when('/student/programs/:student_id/add', {
            templateUrl: 'asset/templates/student/program_add.html',
            controller: 'StudentProgramAddController',
            access: { requiredAuthentication: true }
        }).
        when('/student/programs/:student_id', {
            templateUrl: 'asset/templates/student/program_list.html',
            controller: 'StudentProgramController',
            access: { requiredAuthentication: true }
        }).
        when('/student', {
            templateUrl: 'asset/templates/student/list.html',
            controller: 'StudentController',
            access: { requiredAuthentication: true }
        }).
        when('/profile/edit', {
            templateUrl: 'asset/templates/profile/edit.html',
            controller: 'ProfileEditController',
            access: { requiredAuthentication: true }
        }).
        when('/profile', {
            templateUrl: 'asset/templates/profile/detail.html',
            controller: 'ProfileController',
            access: { requiredAuthentication: true }
        }).
        when('/program/add', {
            templateUrl: 'asset/templates/program/add.html',
            controller: 'ProgramAddController',
            access: { requiredAuthentication: true }
        }).
        when('/program/detail/:program_id', {
            templateUrl: 'asset/templates/program/detail.html',
            controller: 'ProgramDetailController',
            access: { requiredAuthentication: true }
        }).
        when('/program/edit/:program_id', {
            templateUrl: 'asset/templates/program/edit.html',
            controller: 'ProgramEditController',
            access: { requiredAuthentication: true }
        }).
        when('/program/students/:program_id/add', {
            templateUrl: 'asset/templates/program/student_add.html',
            controller: 'ProgramStudentAddController',
            access: { requiredAuthentication: true }
        }).
        when('/program/students/:program_id', {
            templateUrl: 'asset/templates/program/student_list.html',
            controller: 'ProgramStudentController',
            access: { requiredAuthentication: true }
        }).
        when('/program', {
            templateUrl: 'asset/templates/program/list.html',
            controller: 'ProgramController',
            access: { requiredAuthentication: true }
        }).
        when('/user/invite', {
            templateUrl: 'asset/templates/user/invite.html',
            controller: 'UserInviteController',
            access: { requiredAuthentication: true }
        }).
        when('/user/detail/:user_id', {
            templateUrl: 'asset/templates/user/detail.html',
            controller: 'UserDetailController',
            access: { requiredAuthentication: true }
        }).
        when('/user', {
            templateUrl: 'asset/templates/user/list.html',
            controller: 'UserController',
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
        when('/forget', {
            templateUrl: 'asset/templates/forget.html',
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
        organization_id: null,
        redirect_url: null,
        user_id: null,
        email: null,
        name: null,
        keep_email: false
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
            return $cookieStore.get(name);
        },
        put_remember: function(value)
        {
            $cookieStore.put('cboAdmin_cookie_remember', value);
        },
        setData: function(token, organization_id, redirect_url, user_id, email, name) {
            $cookieStore.put('cboAdmin_cookie_token', token);
            $cookieStore.put('cboAdmin_cookie_organization_id', organization_id);
            $cookieStore.put('cboAdmin_cookie_redirect_url', redirect_url);
            $cookieStore.put('cboAdmin_cookie_user_id', user_id);
            $cookieStore.put('cboAdmin_cookie_email', email);
            $cookieStore.put('cboAdmin_cookie_name', name);

            AuthenticationService.isAuthenticated = true;
            AuthenticationService.token = $cookieStore.get('cboAdmin_cookie_token');
            AuthenticationService.organization_id = $cookieStore.get('cboAdmin_cookie_organization_id');
            AuthenticationService.redirect_url = $cookieStore.get('cboAdmin_cookie_redirect_url');
            AuthenticationService.user_id = $cookieStore.get('cboAdmin_cookie_user_id');
            AuthenticationService.email = $cookieStore.get('cboAdmin_cookie_email');
            AuthenticationService.name = $cookieStore.get('cboAdmin_cookie_name');
            $rootScope.showNavBar = true;
            $rootScope.completeName = AuthenticationService.name;

        },
        getData: function() {
            if( typeof $cookieStore.get('cboAdmin_cookie_token') !== 'undefined' && $cookieStore.get('cboAdmin_cookie_token') && typeof $cookieStore.get('cboAdmin_cookie_organization_id') !== 'undefined' && $cookieStore.get('cboAdmin_cookie_organization_id') )
            {
                AuthenticationService.isAuthenticated = true;
                AuthenticationService.token = $cookieStore.get('cboAdmin_cookie_token');
                AuthenticationService.organization_id = $cookieStore.get('cboAdmin_cookie_organization_id');
                AuthenticationService.redirect_url = $cookieStore.get('cboAdmin_cookie_redirect_url');
                AuthenticationService.user_id = $cookieStore.get('cboAdmin_cookie_user_id');
                AuthenticationService.email = $cookieStore.get('cboAdmin_cookie_email');
                AuthenticationService.name = $cookieStore.get('cboAdmin_cookie_name');
                $rootScope.showNavBar = true;
                $rootScope.completeName = AuthenticationService.name;
                return true;
            }
            else
            {
                var remember = $cookieStore.get('cboAdmin_cookie_remember');
                if(remember == true)
                {

                }
                else
                {
                    AuthenticationService.email = null;
                }

                AuthenticationService.isAuthenticated = false;
                AuthenticationService.token = null;
                AuthenticationService.organization_id = null;
                AuthenticationService.redirect_url = null;
                AuthenticationService.user_id = null;
                AuthenticationService.name = null;
                $rootScope.showNavBar = false;
                $rootScope.completeName = false;
                return false;
            }
        },
        clearData: function() {

            var remember = $cookieStore.get('cboAdmin_cookie_remember');
            if(remember == true)
            {

            }
            else
            {
                $cookieStore.remove('cboAdmin_cookie_email');
                AuthenticationService.email = null;
            }

            $cookieStore.remove('cboAdmin_cookie_token');
            $cookieStore.remove('cboAdmin_cookie_organization_id');
            $cookieStore.remove('cboAdmin_cookie_redirect_url');
            $cookieStore.remove('cboAdmin_cookie_user_id');
            $cookieStore.remove('cboAdmin_cookie_name');
            AuthenticationService.isAuthenticated = false;
            AuthenticationService.token = null;
            AuthenticationService.organization_id = null;
            AuthenticationService.redirect_url = null;
            AuthenticationService.user_id = null;
            AuthenticationService.name = null;
            $rootScope.showNavBar = false;
            $rootScope.completeName = false;
            return true;
        }
    };
});



app.controller('BodyController', ['$rootScope', '$scope', '$http', '$location', 'CookieStore', 'AuthenticationService',
    function ($rootScope, $scope, $http, $location, CookieStore, AuthenticationService) {

        $rootScope.full_screen = false;
        $scope.isActive = function(route) {

            var route_length = route.length;
            var path = $location.path();
            var new_path = path.substr(0, route_length);
            return route === new_path;

        };

        $scope.logoutMe = function() {

            var logout = {
                token: AuthenticationService.token
            };

            $http.post( auth_url+'logout', $.param(logout), {

            })
                .success( function (response) {

                    CookieStore.clearData();
                    showError('Success Logout', 2);
                    $location.path("/login");

                })
                .error( function (response, status) {

                    console.log(response);
                    console.log(status);

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

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;

    }
]);


app.controller('StudentAddController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;

        $scope.addStudent = function(student)
        {
            if(student)
            {
                $scope.working = true;
                $http.post( api_url+AuthenticationService.organization_id+'/students', $.param(student), {
                    headers: {
                        'Authorization': 'Bearer '+AuthenticationService.token
                    }
                })
                    .success(function(response) {

                        if(response.success == true)
                        {
                            showError(response.message, 2);
                        }
                        else
                        {
                            showError(response.message, 1);
                        }
                        $scope.working = false;

                    })
                    .error(function(response, status) {

                        console.log(response);
                        console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if(status == 401)
                        {
                            CookieStore.clearData();
                            $location.path( '/login' );
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

        $http.get( api_url+AuthenticationService.organization_id+'/students/'+student_id+'/backpack', {
            headers: {
                'Authorization': 'Bearer '+AuthenticationService.token
            }
        })
            .success(function(response) {

                $scope.student = response;
                $rootScope.doingResolve = false;

            })
            .error(function(response, status) {

                console.log(response);
                console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if(status == 401)
                {
                    CookieStore.clearData();
                    $location.path( '/login' );
                }

            });

    }
]);


app.controller('StudentEditController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $scope.student = {};

        var student_id = $routeParams.student_id;

        $scope.editStudent = function(student)
        {
            if(student)
            {
                $scope.working = true;
                $http.put( api_url+AuthenticationService.organization_id+'/students/'+student_id, $.param(student), {
                    headers: {
                        'Authorization': 'Bearer '+AuthenticationService.token
                    }
                })
                    .success(function(response) {

                        if(response.success == true)
                        {
                            showError(response.message, 2);
                        }
                        else
                        {
                            showError(response.message, 1);
                        }
                        $scope.working = false;

                    })
                    .error(function(response, status) {

                        console.log(response);
                        console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if(status == 401)
                        {
                            CookieStore.clearData();
                            $location.path( '/login' );
                        }

                    });
            }
        };

        $http.get( api_url+AuthenticationService.organization_id+'/students/'+student_id, {
            headers: {
                'Authorization': 'Bearer '+AuthenticationService.token
            }
        })
            .success(function(response) {

                $scope.student = response;
                $rootScope.doingResolve = false;

            })
            .error(function(response, status) {

                console.log(response);
                console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if(status == 401)
                {
                    CookieStore.clearData();
                    $location.path( '/login' );
                }

            });

    }
]);


app.controller('StudentDetailController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $scope.student = {};

        var student_id = $routeParams.student_id;

        $http.get( api_url+AuthenticationService.organization_id+'/students/'+student_id, {
            headers: {
                'Authorization': 'Bearer '+AuthenticationService.token
            }
        })
            .success(function(response) {

                $scope.student = response;
                $rootScope.doingResolve = false;

            })
            .error(function(response, status) {

                console.log(response);
                console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if(status == 401)
                {
                    CookieStore.clearData();
                    $location.path( '/login' );
                }

            });

    }
]);


app.controller('ProfileEditController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;

        $scope.editProfile = function(user)
        {
            if(user)
            {
                $scope.working = true;
                $http.put( api_url+AuthenticationService.organization_id+'/users/'+AuthenticationService.user_id, $.param(user), {
                    headers: {
                        'Authorization': 'Bearer '+AuthenticationService.token
                    }
                })
                    .success(function(response) {

                        if(response.success == true)
                        {
                            showError(response.message, 2);
                            var complete_name = '';
                            if(typeof user.first_name !== 'undefined' && user.first_name)
                            {
                                complete_name += user.first_name+' ';
                            }
                            if(typeof user.last_name !== 'undefined' && user.last_name)
                            {
                                complete_name += user.last_name;
                            }

                            $rootScope.completeName = complete_name;

                        }
                        else
                        {
                            showError(response.message, 1);
                        }
                        $scope.working = false;

                    })
                    .error(function(response, status) {

                        console.log(response);
                        console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if(status == 401)
                        {
                            CookieStore.clearData();
                            $location.path( '/login' );
                        }

                    });
            }
        };

        $http.get( api_url+AuthenticationService.organization_id+'/users/'+AuthenticationService.user_id, {
            headers: {
                'Authorization': 'Bearer '+AuthenticationService.token
            }
        })
            .success(function(response) {

                $scope.user = response;
                $rootScope.doingResolve = false;

            })
            .error(function(response, status) {

                console.log(response);
                console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if(status == 401)
                {
                    CookieStore.clearData();
                    $location.path( '/login' );
                }

            });

    }
]);


app.controller('ProfileController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;

        $http.get( api_url+AuthenticationService.organization_id+'/users/'+AuthenticationService.user_id, {
            headers: {
                'Authorization': 'Bearer '+AuthenticationService.token
            }
        })
            .success(function(response) {

                $scope.user = response;
                $rootScope.doingResolve = false;

            })
            .error(function(response, status) {

                console.log(response);
                console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if(status == 401)
                {
                    CookieStore.clearData();
                    $location.path( '/login' );
                }

            });

    }
]);


app.controller('StudentProgramAddController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;

        var student_id = $routeParams.student_id;

        $scope.addProgramStudent = function(program)
        {
            if(program)
            {
                $scope.working = true;
                $http.post( api_url+AuthenticationService.organization_id+'/students/'+student_id+'/programs', $.param(program), {
                    headers: {
                        'Authorization': 'Bearer '+AuthenticationService.token
                    }
                })
                    .success(function(response) {

                        if(response.success == true)
                        {
                            showError(response.message, 2);
                        }
                        else
                        {
                            showError(response.message, 1);
                        }
                        $scope.working = false;

                    })
                    .error(function(response, status) {

                        console.log(response);
                        console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if(status == 401)
                        {
                            CookieStore.clearData();
                            $location.path( '/login' );
                        }

                    });
            }
        };

        $scope.program = {
            active: true
        };

        $http.get( api_url+AuthenticationService.organization_id+'/students/'+student_id, {
            headers: {
                'Authorization': 'Bearer '+AuthenticationService.token
            }
        })
            .success(function(response) {

                $scope.student = response;
                $rootScope.doingResolve = false;

            })
            .error(function(response, status) {

                console.log(response);
                console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if(status == 401)
                {
                    CookieStore.clearData();
                    $location.path( '/login' );
                }

            });

        $http.get( api_url+AuthenticationService.organization_id+'/programs', {
            headers: {
                'Authorization': 'Bearer '+AuthenticationService.token
            }
        })
            .success(function(response) {

                if(response.success == true && response.total > 0)
                {
                    $scope.list_program = response.data;
                }
                else
                {
                    showError(response.error.message, 1);
                }
                $rootScope.doingResolve = false;

            })
            .error(function(response, status) {

                console.log(response);
                console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if(status == 401)
                {
                    CookieStore.clearData();
                    $location.path( '/login' );
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

        $http.get( api_url+AuthenticationService.organization_id+'/students/'+student_id, {
            headers: {
                'Authorization': 'Bearer '+AuthenticationService.token
            }
        })
            .success(function(response) {

                $scope.student = response;
                $rootScope.doingResolve = false;

            })
            .error(function(response, status) {

                console.log(response);
                console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if(status == 401)
                {
                    CookieStore.clearData();
                    $location.path( '/login' );
                }

            });

        $http.get( api_url+AuthenticationService.organization_id+'/programs', {
            headers: {
                'Authorization': 'Bearer '+AuthenticationService.token
            }
        })
            .success(function(response) {

                if(response.success == true && response.total > 0)
                {
                    list_program = response.data;

                    $http.get( api_url+AuthenticationService.organization_id+'/students/'+student_id+'/programs', {
                        headers: {
                            'Authorization': 'Bearer '+AuthenticationService.token
                        }
                    })
                        .success(function(response) {

                            for(var i=0; i<response.data.length; i++)
                            {
                                for(var j=0; j<list_program.length; j++)
                                {
                                    if(response.data[i].program == list_program[j]._id)
                                    {
                                        response.data[i].name = list_program[j].name;
                                    }
                                }
                            }

                            $scope.programs = response.data;
                            $rootScope.doingResolve = false;

                        })
                        .error(function(response, status) {

                            console.log(response);
                            console.log(status);
                            showError(response, 1);
                            $rootScope.doingResolve = false;
                            if(status == 401)
                            {
                                CookieStore.clearData();
                                $location.path( '/login' );
                            }

                        });

                }
                else
                {
                    showError(response.error.message, 1);
                }
                $rootScope.doingResolve = false;

            })
            .error(function(response, status) {

                console.log(response);
                console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if(status == 401)
                {
                    CookieStore.clearData();
                    $location.path( '/login' );
                }

            });

    }
]);


app.controller('StudentController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $scope.students = [];

        $scope.deleteStudent = function(id, index)
        {
            if(id)
            {
                $scope.working = true;
                $http.delete( api_url+AuthenticationService.organization_id+'/students/'+id, {
                    headers: {
                        'Authorization': 'Bearer '+AuthenticationService.token
                    }
                })
                    .success(function(response) {

                        $scope.students.splice(index, 1);
                        $scope.working = false;

                    })
                    .error(function(response, status) {

                        console.log(response);
                        console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if(status == 401)
                        {
                            CookieStore.clearData();
                            $location.path( '/login' );
                        }

                    });
            }
        };

        $http.get( api_url+AuthenticationService.organization_id+'/students', {
            headers: {
                'Authorization': 'Bearer '+AuthenticationService.token
            }
        })
            .success(function(response) {

                if(response.success == true && response.total > 0)
                {
                    $scope.students = response.data;
                }
                else
                {
                    showError(response.error.message, 1);
                }
                $rootScope.doingResolve = false;

            })
            .error(function(response, status) {

                console.log(response);
                console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if(status == 401)
                {
                    CookieStore.clearData();
                    $location.path( '/login' );
                }

            });

    }
]);


app.controller('ProgramAddController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;

        $scope.addProgram = function(program)
        {
            if(program)
            {
                program.redirect_url = AuthenticationService.redirect_url;

                $scope.working = true;
                $http.post( api_url+AuthenticationService.organization_id+'/programs', $.param(program), {
                    headers: {
                        'Authorization': 'Bearer '+AuthenticationService.token
                    }
                })
                    .success(function(response) {

                        showError(response.message, 2);
                        $scope.working = false;

                    })
                    .error(function(response, status) {

                        console.log(response);
                        console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if(status == 401)
                        {
                            CookieStore.clearData();
                            $location.path( '/login' );
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

        var program_id = $routeParams.program_id;

        $http.get( api_url+AuthenticationService.organization_id+'/programs/'+program_id, {
            headers: {
                'Authorization': 'Bearer '+AuthenticationService.token
            }
        })
            .success(function(response) {

                $scope.program = response;
                $rootScope.doingResolve = false;

            })
            .error(function(response, status) {

                console.log(response);
                console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if(status == 401)
                {
                    CookieStore.clearData();
                    $location.path( '/login' );
                }

            });

    }
]);


app.controller('ProgramEditController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;

        var program_id = $routeParams.program_id;

        $scope.editProgram = function(program)
        {
            if(program)
            {
                program.redirect_url = AuthenticationService.redirect_url;

                $scope.working = true;
                $http.put( api_url+AuthenticationService.organization_id+'/programs/'+program_id, $.param(program), {
                    headers: {
                        'Authorization': 'Bearer '+AuthenticationService.token
                    }
                })
                    .success(function(response) {

                        showError(response.message, 2);
                        $scope.working = false;

                    })
                    .error(function(response, status) {

                        console.log(response);
                        console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if(status == 401)
                        {
                            CookieStore.clearData();
                            $location.path( '/login' );
                        }

                    });
            }
        };

        $http.get( api_url+AuthenticationService.organization_id+'/programs/'+program_id, {
            headers: {
                'Authorization': 'Bearer '+AuthenticationService.token
            }
        })
            .success(function(response) {

                $scope.program = response;
                $rootScope.doingResolve = false;

            })
            .error(function(response, status) {

                console.log(response);
                console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if(status == 401)
                {
                    CookieStore.clearData();
                    $location.path( '/login' );
                }

            });

    }
]);


app.controller('ProgramStudentAddController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;

        var program_id = $routeParams.program_id;

        $scope.addProgramStudent = function(program)
        {
            if(program)
            {
                $scope.working = true;
                $http.post( api_url+AuthenticationService.organization_id+'/programs/'+program_id+'/students', $.param(program), {
                    headers: {
                        'Authorization': 'Bearer '+AuthenticationService.token
                    }
                })
                    .success(function(response) {

                        if(response.success == true)
                        {
                            showError(response.message, 2);
                        }
                        else
                        {
                            showError(response.message, 1);
                        }
                        $scope.working = false;

                    })
                    .error(function(response, status) {

                        console.log(response);
                        console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if(status == 401)
                        {
                            CookieStore.clearData();
                            $location.path( '/login' );
                        }

                    });
            }
        };

        $scope.program = {
            active: true
        };

        $http.get( api_url+AuthenticationService.organization_id+'/programs/'+program_id, {
            headers: {
                'Authorization': 'Bearer '+AuthenticationService.token
            }
        })
            .success(function(response) {

                $scope.program = response;
                $rootScope.doingResolve = false;

            })
            .error(function(response, status) {

                console.log(response);
                console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if(status == 401)
                {
                    CookieStore.clearData();
                    $location.path( '/login' );
                }

            });

        $http.get( api_url+AuthenticationService.organization_id+'/students', {
            headers: {
                'Authorization': 'Bearer '+AuthenticationService.token
            }
        })
            .success(function(response) {

                if(response.success == true && response.total > 0)
                {
                    $scope.list_student = response.data;
                }
                else
                {
                    showError(response.error.message, 1);
                }
                $rootScope.doingResolve = false;

            })
            .error(function(response, status) {

                console.log(response);
                console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if(status == 401)
                {
                    CookieStore.clearData();
                    $location.path( '/login' );
                }

            });

    }
]);


app.controller('ProgramStudentController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;

        var program_id = $routeParams.program_id;

        $http.get( api_url+AuthenticationService.organization_id+'/programs/'+program_id, {
            headers: {
                'Authorization': 'Bearer '+AuthenticationService.token
            }
        })
            .success(function(response) {

                $scope.program = response;
                $rootScope.doingResolve = false;

            })
            .error(function(response, status) {

                console.log(response);
                console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if(status == 401)
                {
                    CookieStore.clearData();
                    $location.path( '/login' );
                }

            });

        $http.get( api_url+AuthenticationService.organization_id+'/programs/'+program_id+'/students', {
            headers: {
                'Authorization': 'Bearer '+AuthenticationService.token
            }
        })
            .success(function(response) {

                if(response.success == true && response.total > 0)
                {
                    $scope.students = response.data;
                }
                else
                {
                    showError('Data Empty', 1);
                }
                $rootScope.doingResolve = false;

            })
            .error(function(response, status) {

                console.log(response);
                console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if(status == 401)
                {
                    CookieStore.clearData();
                    $location.path( '/login' );
                }

            });

    }
]);


app.controller('ProgramController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $scope.programs = [];

        $scope.deleteProgram = function(id, index)
        {
            if(id)
            {
                $scope.working = true;
                $http.delete( api_url+AuthenticationService.organization_id+'/programs/'+id, {
                    headers: {
                        'Authorization': 'Bearer '+AuthenticationService.token
                    }
                })
                    .success(function(response) {

                        $scope.programs.splice(index, 1);
                        $scope.working = false;

                    })
                    .error(function(response, status) {

                        console.log(response);
                        console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if(status == 401)
                        {
                            CookieStore.clearData();
                            $location.path( '/login' );
                        }

                    });
            }
        };

        $http.get( api_url+AuthenticationService.organization_id+'/programs', {
            headers: {
                'Authorization': 'Bearer '+AuthenticationService.token
            }
        })
            .success(function(response) {

                if(response.success == true && response.total > 0)
                {
                    $scope.programs = response.data;
                }
                else
                {
                    showError(response.error.message, 1);
                }
                $rootScope.doingResolve = false;

            })
            .error(function(response, status) {

                console.log(response);
                console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if(status == 401)
                {
                    CookieStore.clearData();
                    $location.path( '/login' );
                }

            });

    }
]);


app.controller('UserInviteController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;

        $scope.inviteUser = function(user)
        {
            if(user)
            {
                user.redirect_url = AuthenticationService.redirect_url;

                $scope.working = true;
                $http.post( auth_url+'/user/invite', $.param(user), {
                    headers: {
                        'Authorization': 'Bearer '+AuthenticationService.token
                    }
                })
                    .success(function(response) {

                        if(response.status == true)
                        {
                            showError(response.message, 2);
                        }
                        else
                        {
                            showError(response.message, 1);
                        }
                        $scope.working = false;

                    })
                    .error(function(response, status) {

                        console.log(response);
                        console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if(status == 401)
                        {
                            CookieStore.clearData();
                            $location.path( '/login' );
                        }

                    });
            }
        };

    }
]);


app.controller('UserDetailController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;

        var user_id = $routeParams.user_id;

        $http.get( api_url+AuthenticationService.organization_id+'/users/'+user_id, {
            headers: {
                'Authorization': 'Bearer '+AuthenticationService.token
            }
        })
            .success(function(response) {

                $scope.user = response;
                $rootScope.doingResolve = false;

            })
            .error(function(response, status) {

                console.log(response);
                console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if(status == 401)
                {
                    CookieStore.clearData();
                    $location.path( '/login' );
                }

            });

    }
]);


app.controller('UserController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $scope.users = [];

        $scope.deleteUser = function(id, index)
        {
            if(id)
            {
                $scope.working = true;
                $http.delete( api_url+AuthenticationService.organization_id+'/users/'+id, {
                    headers: {
                        'Authorization': 'Bearer '+AuthenticationService.token
                    }
                })
                    .success(function(response) {

                        $scope.users.splice(index, 1);
                        $scope.working = false;

                    })
                    .error(function(response, status) {

                        console.log(response);
                        console.log(status);
                        showError(response, 1);
                        $scope.working = false;
                        if(status == 401)
                        {
                            CookieStore.clearData();
                            $location.path( '/login' );
                        }

                    });
            }
        };

        $http.get( api_url+AuthenticationService.organization_id+'/users', {
            headers: {
                'Authorization': 'Bearer '+AuthenticationService.token
            }
        })
            .success(function(response) {

                if(response.success == true && response.total > 0)
                {
                    $scope.users = response.data;
                }
                else
                {
                    showError(response.error.message, 1);
                }
                $rootScope.doingResolve = false;

            })
            .error(function(response, status) {

                console.log(response);
                console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if(status == 401)
                {
                    CookieStore.clearData();
                    $location.path( '/login' );
                }

            });

    }
]);

app.controller('HeartbeatController', ['$rootScope', '$scope',
    function ($rootScope, $scope) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;

    }
]);

app.controller('LoginController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = true;
        $rootScope.doingResolve = false;

        var getRemember = CookieStore.get('cboAdmin_cookie_remember');
        if(getRemember == true)
        {
            $scope.login = {
                username: CookieStore.get('cboAdmin_cookie_email'),
                remember_username: true
            };
        }

        $scope.loginMe = function(username, password, remmember) {

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
                            var get_redirect_url = false;

                            if(responseClient.success == true && responseClient.total > 0)
                            {
                                for(var i=0; i<responseClient.total; i++)
                                {
                                    if(get_hosting_name == responseClient.data[i].url)
                                    {
                                        grand_access = true;
                                        get_id = responseClient.data[i]._id;
                                        get_redirect_url = responseClient.data[i].url;
                                    }
                                }
                            }

                            if(grand_access)
                            {
                                $http.get( api_url+get_id+'/users', {
                                    headers: {
                                        'Authorization': 'Bearer '+response.access_token
                                    }
                                })
                                    .success(function(responseUser) {

                                        if(responseUser.success == true && responseUser.total > 0)
                                        {
                                            var find = false;
                                            var data = responseUser.data;
                                            var id = false;
                                            var complete_name = '';
                                            for(var i=0; i<responseUser.total; i++)
                                            {
                                                if(data[i].email == send.username)
                                                {
                                                    id = data[i]._id;
                                                    if(typeof data[i].first_name !== 'undefined' && data[i].first_name)
                                                    {
                                                        complete_name += data[i].first_name+' ';
                                                    }
                                                    if(typeof data[i].last_name !== 'undefined' && data[i].last_name)
                                                    {
                                                        complete_name += data[i].last_name;
                                                    }

                                                    $rootScope.completeName = complete_name;
                                                    find = true;
                                                }
                                            }
                                            if(find)
                                            {
                                                CookieStore.setData( response.access_token, get_id, get_redirect_url, id, send.username, complete_name );

                                                if(typeof remmember !== 'undefined' && remmember == true)
                                                {
                                                    CookieStore.put_remember(true);
                                                }
                                                else
                                                {
                                                    CookieStore.put_remember(false);
                                                }

                                            }
                                            $location.path( '/' );
                                        }
                                        else
                                        {
                                            showError(response.error.message, 1);
                                        }
                                        $rootScope.doingResolve = false;

                                    })
                                    .error(function(responseUser, status) {

                                        showError(responseUser, 1);
                                        $scope.login.working = false;

                                    });

                            }
                            else
                            {
                                showError("You don't have any permission to access this page", 1);
                                $scope.login.working = false;
                            }

                        })
                        .error(function(responseClient) {

                            showError(responseClient, 1);
                            $scope.login.working = false;

                        });

                })
                .error(function(response) {

                    showError(response.error_description, 1);
                    $scope.login.working = false;

                });

        };

        $scope.forgotPassword = function(data)
        {
            console.log(data);
        };

    }
]);


function showError(message, alert)
{
    var passingClass = 'alert-danger';
    if(alert == 2)
    {
        passingClass = 'alert-success'
    }

    var message_alert = '<div class="alert '+passingClass+' alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+message+'</div>';
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
