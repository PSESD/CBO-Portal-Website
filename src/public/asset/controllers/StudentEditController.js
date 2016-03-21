app.controller('StudentEditController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore) {
        'use strict';
        $rootScope.full_screen = false;
        $scope.student = {};
        var schoolDistrict = {};
        var relationship = {};
        $scope.schoolDistricts = [];
        $scope.relationships = [];
        console.log(localStorage);
        var student_id = $routeParams.student_id;

        $.each(schoolDistricts, function (key, value) {
            schoolDistrict = {
                "id": key,
                "name": value
            };
            $scope.schoolDistricts.push(schoolDistrict);
        });
        $.each(relationships, function (key, value) {
            relationship = {
                "id": key,
                "name": value
            };
            $scope.relationships.push(relationship);
        });

        $scope.editStudent = function (student) {
            if (student) {
                $scope.working = true;
                $http.put(api_url + AuthenticationService.organization_id + '/students/' + student_id, $.param(student), {
                    headers: {
                        'Authorization': 'Bearer ' + AuthenticationService.token
                    }
                })
                    .success(function (response) {
                        if (response.success === true) {
                            showError(response.message, 2);
                            $location.path($rootScope.prevURL);
                        } else {
                            showError(response.error, 1);
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

        $http.get(api_url + AuthenticationService.organization_id + '/students/' + student_id, {
            headers: {
                'Authorization': 'Bearer ' + AuthenticationService.token
            }
        })
            .success(function (response) {
                //                $.each(schoolDistricts, function (key, value) {
                //                    if (key == response.school_district) {
                //                        response.school_district = value;
                //                    }
                //                });
                $scope.student = response;
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