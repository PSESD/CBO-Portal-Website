app.controller('UserAssignController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore) {
        'use strict';
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
                        if (status === 401) {
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
                .success(function () {

                    $scope.assigned_students.splice(index, 1);
                    $scope.working = false;

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
        };

        var user = {

            userId: user_id
        };

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
                if (status === 401) {
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
                if (status === 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

    }
]);