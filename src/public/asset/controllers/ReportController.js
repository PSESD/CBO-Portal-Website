app.controller('ReportController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore','$filter',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore,$filter) {
        'use strict';

        $rootScope.full_screen = false;

        //report/students/school_district
        //report/students/grade
        //report/students/gender
        //report/students/race

        var colors = ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"];

        $scope.programData = [
            {
                id: 1,
                name: "Program 1"
            },
            {
                id: 2,
                name: "Program 2"
            },
            {
                id: 3,
                name: "Program 3"
            },
        ];
        $scope.districtData = [
            {
                id: 1,
                name: "District 1"
            },
            {
                id: 2,
                name: "District 2"
            },
            {
                id: 3,
                name: "District 3"
            },
        ];
        $scope.cohortData = [
            {
                id: 1,
                name: "Cohort 1"
            },
            {
                id: 2,
                name: "Cohort 2"
            },
            {
                id: 3,
                name: "Cohort 3"
            },
        ];
        $scope.caseloadData = [
            {
                id: 1,
                name: "Case Load 1"
            },
            {
                id: 2,
                name: "Case Load 2"
            },
            {
                id: 3,
                name: "Case Load 3"
            },
        ];
        $scope.total_student = 0;
        $scope.total_school = 0;
        $scope.total_user = 0;

        $rootScope.doingResolve = false;

        $http.get(api_url + AuthenticationService.organization_id + '/report/students/school_district', {
            headers: {
                'Authorization': 'Bearer ' + AuthenticationService.token
            }
        })
            .success(function (response) {

                var temp_districts = [];
                var temp_studentSchools = [];
                var district = 0;
                $scope.total_school = 0;

                for (var index in response)
                {
                    var color_number = district%9;
                    var temp;
                    if(typeof response[index].schoolDistrict !== "undefined")
                    {
                        var get_same = -1;
                        for (var index2 in temp_districts)
                        {
                            if(temp_districts[index2].name == response[index].schoolDistrict)
                            {
                                get_same = index2;
                            }
                        }

                        $scope.total_school += response[index].total;

                        if(get_same >= 0)
                        {
                            temp_districts[get_same].y = temp_districts[get_same].y + response[index].total

                            temp = {
                                color: temp_districts[get_same].color,
                                name: response[index].schoolName,
                                y: response[index].total
                            };

                            temp_studentSchools.push(temp);

                        }
                        else
                        {
                            temp = {
                                color: colors[color_number],
                                name: response[index].schoolDistrict,
                                y: response[index].total
                            };

                            temp_districts.push(temp);

                            temp = {
                                color: colors[color_number],
                                name: response[index].schoolName,
                                y: response[index].total
                            };

                            temp_studentSchools.push(temp);
                        }

                        if(get_same >= 0)
                        {
                            district++;
                        }

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
                            name: response[index].gradeLevel,
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
                $scope.total_student = 0;

                for (var index in response)
                {
                    var color_number = index%9;
                    var temp;
                    if(typeof response[index].ethnicity !== "undefined")
                    {
                        $scope.total_student += response[index].total;
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