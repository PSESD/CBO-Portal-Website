app.controller('ReportController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore','$filter',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore,$filter) {
        'use strict';

        $rootScope.full_screen = false;

        var colors = ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"];

        $scope.total_student = 0;
        $scope.total_district = 0;
        $scope.total_school = 0;
        $scope.total_student_word = "";
        $scope.total_district_word = "";
        $scope.total_school_word = "";
        $scope.total_program_info = "";
        $scope.total_district_info = "";
        $scope.total_cohort_info = "";
        $scope.programData = [];
        $scope.districtData = [];
        $scope.cohortData = [];
        $scope.select_program = [];
        $scope.select_district = [];
        $scope.select_cohort = [];

        $rootScope.doingResolve = false;

        $http.get(api_url + AuthenticationService.organization_id + '/report/filters', {
            headers: {
                'Authorization': 'Bearer ' + AuthenticationService.token
            }
        })
            .success(function (response) {

                var i, temp;

                for(i=0; i<response.programs.length; i++)
                {
                    temp = {
                        id: response.programs[i],
                        name: response.programs[i]
                    };
                    $scope.programData.push(temp);
                }

                for(i=0; i<response.districts.length; i++)
                {
                    temp = {
                        id: response.districts[i],
                        name: response.districts[i]
                    };
                    $scope.districtData.push(temp);
                }

                for(i=0; i<response.cohorts.length; i++)
                {
                    temp = {
                        id: response.cohorts[i],
                        name: response.cohorts[i]
                    };
                    $scope.cohortData.push(temp);
                }

                $scope.filterChart();

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


        $scope.filterChart = function() {

            var program = "";
            var district = "";
            var cohort = "";
            var caseload = "";
            var i;
            var first = 1;

            for(i=0; i<$scope.select_program.length; i++)
            {
                if(first == 1)
                {
                    first = 0;
                    program += "?program[]=" + encodeURIComponent($scope.select_program[i]);
                }
                else
                {
                    program += "&program[]=" + encodeURIComponent($scope.select_program[i]);
                }
            }

            for(i=0; i<$scope.select_district.length; i++)
            {
                if(first == 1)
                {
                    first = 0;
                    district += "?district[]=" + encodeURIComponent($scope.select_district[i]);
                }
                else
                {
                    district += "&district[]=" + encodeURIComponent($scope.select_district[i]);
                }
            }

            for(i=0; i<$scope.select_cohort.length; i++)
            {
                if(first == 1)
                {
                    first = 0;
                    cohort += "?cohort[]=" + encodeURIComponent($scope.select_cohort[i]);
                }
                else
                {
                    cohort += "&cohort[]=" + encodeURIComponent($scope.select_cohort[i]);
                }
            }


            if($scope.select_program.length > 0)
            {
                if($scope.select_program.length == 1)
                {
                    $scope.total_program_info = $scope.select_program.length + " Program Selected";
                }
                else
                {
                    $scope.total_program_info = $scope.select_program.length + " Programs Selected";
                }
            }
            else
            {
                $scope.total_program_info = "";
            }

            if($scope.select_district.length > 0)
            {
                if($scope.select_district.length == 1)
                {
                    $scope.total_district_info = $scope.select_district.length + " District Selected";
                }
                else
                {
                    $scope.total_district_info = $scope.select_district.length + " Districts Selected";
                }
            }
            else
            {
                $scope.total_district_info = "";
            }

            if($scope.select_cohort.length > 0)
            {
                if($scope.select_cohort.length == 1)
                {
                    $scope.total_cohort_info = $scope.select_cohort.length + " Cohort Selected";
                }
                else
                {
                    $scope.total_cohort_info = $scope.select_cohort.length + " Cohorts Selected";
                }
            }
            else
            {
                $scope.total_cohort_info = "";
            }

            var passing_string = program + district + cohort;

            $http.get(api_url + AuthenticationService.organization_id + '/report/students/school_district'+passing_string, {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
                .success(function (response) {

                    var temp_districts = [];
                    var temp_studentSchools = [];
                    var temp_container = [];
                    var temp;
                    $scope.total_school = 0;
                    $scope.total_district = 0;

                    for (var index in response)
                    {
                        if(typeof response[index].schoolDistrict !== "undefined")
                        {
                            var have = 0;
                            for (var index2 in temp_container)
                            {
                                if(temp_container[index2].name == response[index].schoolDistrict)
                                {
                                    have = 1;
                                    var temp_schools = [];
                                    temp = {
                                        name: response[index].schoolName,
                                        total: response[index].total
                                    };
                                    temp_schools = temp_container[index2].schools;
                                    temp_schools.push(temp);
                                    temp_container[index2].total += response[index].total;
                                    temp_container[index2].schools = temp_schools;

                                }
                            }

                            if(have == 0)
                            {
                                temp = {
                                    name: response[index].schoolDistrict,
                                    total: response[index].total,
                                    schools: [{
                                        name: response[index].schoolName,
                                        total: response[index].total
                                    }]
                                };

                                temp_container.push(temp);

                            }
                        }

                    }

                    for (var index in temp_container)
                    {
                        $scope.total_district++;

                        var color_number = index%9;
                        temp = {
                            color: colors[color_number],
                            name: temp_container[index].name,
                            y: temp_container[index].total
                        };
                        temp_districts.push(temp);
                        for (var index2 in temp_container[index].schools)
                        {
                            temp = {
                                color: colors[color_number],
                                name: temp_container[index].schools[index2].name,
                                y: temp_container[index].schools[index2].total
                            };
                            temp_studentSchools.push(temp);
                            $scope.total_school++;
                        }
                    }

                    if($scope.total_school > 1)
                    {
                        $scope.total_school_word = "Schools";
                    }
                    else
                    {
                        $scope.total_school_word = "School";
                    }

                    if($scope.total_district > 1)
                    {
                        $scope.total_district_word = "Districts";
                    }
                    else
                    {
                        $scope.total_district_word = "District";
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


            $http.get(api_url + AuthenticationService.organization_id + '/report/students/grade'+passing_string, {
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
                        if(typeof response[index].gradeLevel !== "undefined")
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


            $http.get(api_url + AuthenticationService.organization_id + '/report/students/race'+passing_string, {
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
                        if(typeof response[index].ethnicityName !== "undefined")
                        {
                            $scope.total_student += response[index].total;
                            temp = {
                                color: colors[color_number],
                                name: response[index].ethnicityName,
                                y: response[index].total
                            };

                            temp_ethnicity.push(temp);
                        }

                    }

                    if($scope.total_student > 1)
                    {
                        $scope.total_student_word = "Students";
                    }
                    else
                    {
                        $scope.total_student_word = "Student";
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


            $http.get(api_url + AuthenticationService.organization_id + '/report/students/gender'+passing_string, {
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
                        if(typeof response[index].genderName !== "undefined")
                        {
                            temp = {
                                color: colors[color_number],
                                name: response[index].genderName,
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

        };

        $scope.$watch(function() {
            return $scope.select_program;
        }, function(newValue, oldValue) {
            $scope.filterChart();
        }, true);

        $scope.$watch(function() {
            return $scope.select_district;
        }, function(newValue, oldValue) {
            $scope.filterChart();
        }, true);

        $scope.$watch(function() {
            return $scope.select_cohort;
        }, function(newValue, oldValue) {
            $scope.filterChart();
        }, true);

    }
]);