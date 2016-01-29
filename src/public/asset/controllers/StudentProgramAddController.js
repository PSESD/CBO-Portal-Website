app.controller('StudentProgramAddController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore) {
        'use strict';
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

                        if (response.success === true) {
                            showError(response.message, 2);
                            $location.path('/login');

                        } else {
                            showError(response.error.message, 1);
                        }
                        $scope.working = false;

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
                showError(response.error, 1);
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
                    availableTags: availableTags
                });


                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                showError(response.error, 1);
                $rootScope.doingResolve = false;
                if (status === 401) {
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

                if (response.success === true && response.total > 0) {
                    $scope.list_program = response.data;
                } else {
                    showError(response.error.message, 1);
                }
                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                showError(response.error, 1);
                $rootScope.doingResolve = false;
                if (status === 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

    }
]);