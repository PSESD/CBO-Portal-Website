app.controller('ProfileEditController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore) {
        'use strict';
        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;
        $scope.editProfile = function (user) {
            if (user) {


                $scope.working = true;
                $http.put(api_url + 'user', $.param(user), {
                    headers: {
                        'Authorization': 'Bearer ' + AuthenticationService.token
                    }
                })
                    .success(function (response) {

                        if (response.success === true) {
                            showError(response.message, 2);
                            var complete_name = '';
                            if (typeof user.first_name !== 'undefined' && user.first_name) {
                                complete_name += user.first_name + ' ';
                            }
                            if (typeof user.last_name !== 'undefined' && user.last_name) {
                                complete_name += user.last_name;
                            }

                            $rootScope.completeName = complete_name;
                            $location.path('/profile');

                        } else {
                            showError(response.message, 1);
                        }
                        $scope.working = false;

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
        $http.get(api_url + 'user', {
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