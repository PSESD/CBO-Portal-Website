app.controller('ProgramStudentAddController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore) {
        'use strict';
        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;
        var rawCohart = "";
        var program_id = $routeParams.program_id;
        $scope.load_student = true;
        $scope.$watch('program.cohort',function(cohort){
            rawCohart=cohort;
        });

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
                    availableTags: availableTags,
                    allowSpaces:true
                });


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

        $http.get(api_url + AuthenticationService.organization_id + '/students'+userStatus, {
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
                $scope.program ? $scope.program.active = true : $scope.program = {
                    active: true
                };
                $scope.load_student = false;
            })
            .error(function (response, status) {
                $scope.load_student = false;
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status === 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });
        $scope.addProgramStudent = function (program) {

            if (program) {

                if(rawCohart === "" || rawCohart === undefined)
                {
                    rawCohart = [];
                }else{
                    rawCohart = rawCohart.split(',');
                }
                program.cohort = rawCohart;
                $scope.working = true;
                $http.post(api_url + AuthenticationService.organization_id + '/programs/' + program_id + '/students', $.param(program), {
                    headers: {
                        'Authorization': 'Bearer ' + AuthenticationService.token
                    }
                })
                    .success(function (response) {
                        if (response.success === false) {
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