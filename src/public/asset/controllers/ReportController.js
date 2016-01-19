app.controller('ReportController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore','$filter',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore,$filter) {
        'use strict';

        $rootScope.full_screen = false;

        //report/students/school_district
        //report/students/grade
        //report/students/gender
        //report/students/race

        var colors = ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"];
        var i;
        $rootScope.doingResolve = false;

        $http.get(api_url + AuthenticationService.organization_id + '/report/students/school_district', {
            headers: {
                'Authorization': 'Bearer ' + AuthenticationService.token
            }
        })
            .success(function (response) {

                var temp_districts = [];
                var temp_studentSchools = [];

                for (var index in response)
                {
                    var color_number = index%9;
                    var temp;
                    if(typeof response[index].schoolDistrict !== "undefined")
                    {
                        temp = {
                            color: colors[color_number],
                            name: response[index].schoolDistrict,
                            y: response[index].total
                        };

                        temp_districts.push(temp);
                    }

                    if(typeof response[index].schoolName !== "undefined")
                    {
                        temp = {
                            color: colors[color_number],
                            name: response[index].schoolName,
                            y: response[index].total
                        };

                        temp_studentSchools.push(temp);
                    }
                }

                $scope.districts = temp_districts;
                $scope.studentSchools = temp_studentSchools;

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


        $http.get(api_url + AuthenticationService.organization_id + '/report/students/grade', {
            headers: {
                'Authorization': 'Bearer ' + AuthenticationService.token
            }
        })
            .success(function (response) {

                var temp_grade = [];

                for (var index in response)
                {
                    var color_number = index%9;
                    var temp;
                    if(typeof response[index].gradeYear !== "undefined")
                    {
                        temp = {
                            color: colors[color_number],
                            name: response[index].gradeYear,
                            y: response[index].total
                        };

                        temp_grade.push(temp);
                    }

                }

                $scope.grade = temp_grade;

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


        $http.get(api_url + AuthenticationService.organization_id + '/report/students/race', {
            headers: {
                'Authorization': 'Bearer ' + AuthenticationService.token
            }
        })
            .success(function (response) {

                var temp_ethnicity = [];

                for (var index in response)
                {
                    var color_number = index%9;
                    var temp;
                    if(typeof response[index].ethnicity !== "undefined")
                    {
                        temp = {
                            color: colors[color_number],
                            name: response[index].ethnicity,
                            y: response[index].total
                        };

                        temp_ethnicity.push(temp);
                    }

                }

                $scope.ethnicity = temp_ethnicity;

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

        $http.get(api_url + AuthenticationService.organization_id + '/report/students/gender', {
            headers: {
                'Authorization': 'Bearer ' + AuthenticationService.token
            }
        })
            .success(function (response) {

                var temp_gender = [];

                for (var index in response)
                {
                    var color_number = index%9;
                    var temp;
                    if(typeof response[index].gender !== "undefined")
                    {
                        temp = {
                            color: colors[color_number],
                            name: response[index].gender,
                            y: response[index].total
                        };

                        temp_gender.push(temp);
                    }

                }

                $scope.gender = temp_gender;

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