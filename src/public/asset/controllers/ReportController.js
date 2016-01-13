app.controller('ReportController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore','$filter',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore,$filter) {
        'use strict';

        $rootScope.full_screen = false;

        $http.get(api_url + AuthenticationService.organization_id + '/students', {
            headers: {
                'Authorization': 'Bearer ' + AuthenticationService.token
            }
        })
            .success(function (response) {

                console.log(response);
                $rootScope.doingResolve = false;
                $scope.studentSchools = [
                    ['School 1', 20],
                    ['School 2', 80],
                    ['School 3', 50],
                    ['School 3', 40],
                    ['School 3', 80],
                    ['School 3', 20],
                    ['School 3', 70],
                    ['School 3', 80],
                    ['School 3', 50]
                ];

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