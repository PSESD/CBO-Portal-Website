app.controller('TagAddController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore) {
        'use strict';
        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;

        $scope.addTag = function (tag) {
            if (tag) {
                //console.log(tag);
                $scope.working = true;
                $http.post(api_url + AuthenticationService.organization_id + '/tags', $.param(tag), {
                    headers: {
                        'Authorization': 'Bearer ' + AuthenticationService.token
                    }
                })
                    .success(function (response) {
                        if (response.success) {
                            showError(response.message, 2);
                            $scope.working = false;
                            $location.path('/tag');
                        } else {
                            showError(response.message, 1);
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