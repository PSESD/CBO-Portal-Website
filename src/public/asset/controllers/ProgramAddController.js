app.controller('ProgramAddController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore) {
        'use strict';
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

    }
]);