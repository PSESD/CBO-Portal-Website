app.controller('ProgramStudentController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore','$filter',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore,$filter) {
        'use strict';
        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;
        var program_id = $routeParams.program_id;
        var active_status = '';
        var start_date = '';
        var end_date = '';
        var cohort = '';
        $scope.sortType="name";
        $scope.sortReverse=false;
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

                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status === 401) {
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
                if (response.success === true && response.total > 0) {

                    angular.forEach(response.data, function (value, key) {

                        cohort = '';
                        angular.forEach(value.programs, function (v, k) {
                            if (v.program === program_id) {
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
                                $scope.students = $filter('orderBy')($scope.students,'name');
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
                if (status === 401) {
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
                            $location.path('/program/students/' + program_id);
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

    }
]);