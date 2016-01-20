app.controller('UserController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore','$filter',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore,$filter) {
        'use strict';
        $rootScope.full_screen = false;
        $scope.users = [];
        $scope.sortType="first_name";
        $scope.sortReverse=false;
        $scope.deleteUser = function (id, index) {
            if (AuthenticationService.user_id === id) {
                showError('Cannot Remove your own data', 1);
            } else if ((AuthenticationService.role+'').indexOf('case-worker') !== -1) {
                showError($rootScope.lang.you_dont_have_any_permission_page, 1);
            } else if (id) {
                $scope.working = true;
                $http.delete(api_url + AuthenticationService.organization_id + '/users/' + id, {
                    headers: {
                        'Authorization': 'Bearer ' + AuthenticationService.token
                    }
                })
                    .success(function () {

                        $scope.users.splice(index, 1);
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

        $http.get(api_url + AuthenticationService.organization_id + '/users', {
            headers: {
                'Authorization': 'Bearer ' + AuthenticationService.token
            }
        })
            .success(function (response) {

                if (response.success === true && response.total > 0) {
                    $scope.users = response.data;
                } else {
                    showError(response.error.message, 1);
                }
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



    }
]);