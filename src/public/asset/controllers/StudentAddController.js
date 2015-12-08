app.controller('StudentAddController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore) {
        'use strict';
        var schoolDistrict = {};
        var relationship = {};
        $scope.schoolDistricts = [];
        $scope.relationships = [];
        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;

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

        $scope.addStudent = function (student) {
            if (student) {
                $scope.working = true;
                $http.post(api_url + AuthenticationService.organization_id + '/students', $.param(student), {
                    headers: {
                        'Authorization': 'Bearer ' + AuthenticationService.token
                    }
                })
                    .success(function (response) {

                        if (response.success === true) {
                            showError(response.message, 2);
                            $location.path('/student');
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
                            $rootScope.show_footer = false;
                            $location.path('/login');
                        }

                    });
            }
        };

    }
]);