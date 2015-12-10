app.controller('UserGroupAddController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore) {
        'use strict';
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
                if (new_student === true) {
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
                            if (status === 401) {
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
                            if (status === 401) {
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
                if (status === 401) {
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

                if (response.success === true && response.total > 0) {
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
                if (status === 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

    }
]);