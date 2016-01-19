app.controller('ReportController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore','$filter',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore,$filter) {
        'use strict';

        $rootScope.full_screen = false;

        //report/students/school_district
        //report/students/grade
        //report/students/gender
        //report/students/race

        $http.get(api_url + AuthenticationService.organization_id + '/report/students/grade', {
            headers: {
                'Authorization': 'Bearer ' + AuthenticationService.token
            }
        })
            .success(function (response) {
                console.log("grade");
                console.log(response);
            });

        $http.get(api_url + AuthenticationService.organization_id + '/report/students/gender', {
            headers: {
                'Authorization': 'Bearer ' + AuthenticationService.token
            }
        })
            .success(function (response) {
                console.log("gender");
                console.log(response);
            });

        $http.get(api_url + AuthenticationService.organization_id + '/report/students/race', {
            headers: {
                'Authorization': 'Bearer ' + AuthenticationService.token
            }
        })
            .success(function (response) {
                console.log("race");
                console.log(response);
            });

        $http.get(api_url + AuthenticationService.organization_id + '/report/students/school_district', {
            headers: {
                'Authorization': 'Bearer ' + AuthenticationService.token
            }
        })
            .success(function (response) {

                console.log("school_district");
                console.log(response);

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


        $scope.grade = [
            {
                color: colors[0],
                name: "Grade 21",
                y: 100
            },
            {
                color: colors[1],
                name: "Grade 22",
                y: 80
            },
            {
                color: colors[2],
                name: "Grade 23",
                y: 100
            },
            {
                color: colors[3],
                name: "Grade 24",
                y: 70
            },
            {
                color: colors[4],
                name: "Grade 25",
                y: 150
            }
        ];
        $scope.grad = [
            {
                color: colors[0],
                name: "Grad 21",
                y: 10
            },
            {
                color: colors[0],
                name: "Grad 22",
                y: 20
            },
            {
                color: colors[0],
                name: "Grad 23",
                y: 30
            },
            {
                color: colors[0],
                name: "Grad 24",
                y: 40
            },
            {
                color: colors[1],
                name: "Grad 25",
                y: 80
            },
            {
                color: colors[2],
                name: "Grad 26",
                y: 100
            },
            {
                color: colors[3],
                name: "Grad 27",
                y: 70
            },
            {
                color: colors[4],
                name: "Grad 28",
                y: 150
            }
        ];


        $scope.race = [
            {
                color: colors[0],
                name: "Grade 21",
                y: 100
            },
            {
                color: colors[1],
                name: "Grade 22",
                y: 80
            },
            {
                color: colors[2],
                name: "Grade 23",
                y: 100
            },
            {
                color: colors[3],
                name: "Grade 24",
                y: 70
            },
            {
                color: colors[4],
                name: "Grade 25",
                y: 150
            }
        ];
        $scope.etnicity = [
            {
                color: colors[0],
                name: "Grad 21",
                y: 10
            },
            {
                color: colors[0],
                name: "Grad 22",
                y: 20
            },
            {
                color: colors[0],
                name: "Grad 23",
                y: 30
            },
            {
                color: colors[0],
                name: "Grad 24",
                y: 40
            },
            {
                color: colors[1],
                name: "Grad 25",
                y: 80
            },
            {
                color: colors[2],
                name: "Grad 26",
                y: 100
            },
            {
                color: colors[3],
                name: "Grad 27",
                y: 70
            },
            {
                color: colors[4],
                name: "Grad 28",
                y: 150
            }
        ];

    }
]);