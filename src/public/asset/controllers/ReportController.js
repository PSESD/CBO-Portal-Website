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

                var colors = ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"];
                $scope.districts = [
                    {
                        color: colors[0],
                        name: "District 1",
                        y: 100
                    },
                    {
                        color: colors[1],
                        name: "District 2",
                        y: 80
                    },
                    {
                        color: colors[2],
                        name: "District 3",
                        y: 100
                    },
                    {
                        color: colors[3],
                        name: "District 4",
                        y: 70
                    },
                    {
                        color: colors[4],
                        name: "District 5",
                        y: 150
                    }
                ];
                $scope.studentSchools = [
                    {
                        color: colors[0],
                        name: "School 1",
                        y: 10
                    },
                    {
                        color: colors[0],
                        name: "School 2",
                        y: 20
                    },
                    {
                        color: colors[0],
                        name: "School 3",
                        y: 30
                    },
                    {
                        color: colors[0],
                        name: "School 4",
                        y: 40
                    },
                    {
                        color: colors[1],
                        name: "School 5",
                        y: 80
                    },
                    {
                        color: colors[2],
                        name: "School 6",
                        y: 100
                    },
                    {
                        color: colors[3],
                        name: "School 7",
                        y: 70
                    },
                    {
                        color: colors[4],
                        name: "School 8",
                        y: 150
                    }
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