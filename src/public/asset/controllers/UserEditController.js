app.controller('UserEditController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore) {
        'use strict';
        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;
        $scope.disable_select = false;
        var user_id = $routeParams.user_id;
        if (user_id === CookieStore.get('user_id')) {
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

                        if (response.success === true) {
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
                        if (status === 401) {
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
                if (status === 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

    }
]);