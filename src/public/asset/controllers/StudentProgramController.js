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
                showError(response.error, 1);
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
                            showError(response.error, 1);
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
                showError(response.error, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

    }
]);