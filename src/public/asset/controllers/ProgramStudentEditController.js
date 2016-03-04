app.controller('ProgramStudentEditController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore) {
        'use strict';
        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;
        var rawCohart = "";
        $scope.$watch('student.cohort',function(cohort){
            rawCohart=cohort;
        });
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
                showError(response.error, 1);
                $rootScope.doingResolve = false;
                if (status === 401) {
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

                    if (program_id === v.program) {
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
                            availableTags: availableTags,
                            allowSpaces:true
                        });


                    })
                    .error(function (responseTag) {

                        //console.log(responseTag);
                        //console.log(statusTag);
                        showError(responseTag, 1);
                        $rootScope.doingResolve = false;
                        if (status === 401) {
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
                showError(response.error, 1);
                $rootScope.doingResolve = false;
                if (status === 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });


        $scope.editProgramStudent = function (student) {

            if (student) {
                if(rawCohart === "" || rawCohart === undefined)
                {
                    rawCohart = [];
                }else{
                    rawCohart = rawCohart.split(',');
                }
                student.cohort = rawCohart;
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

                        showError(response.error, 1);
                        $scope.working = false;
                        if (status === 401) {
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