app.controller('UserGroupController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;
        if(!$scope.user) $scope.user = { full_name: "" };

        var user_id = $routeParams.user_id;

        $scope.deleteStudent = function (student_id, index) {
            $http.delete(api_url + AuthenticationService.organization_id + '/users/' + user_id + '/students/' + student_id, {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
                .success(function () {

                    //console.log(response);
                    $scope.students.splice(index, 1);
                    $scope.working = false;

                })
                .error(function (response, status) {

                    //console.log(response);
                    //console.log(status);
                    showError(response, 1);
                    $scope.working = false;
                    if (status == 401) {
                        $rootScope.show_footer = false;
                        CookieStore.clearData();
                        $location.path('/login');
                    }

                });
        };

        $http.get(api_url + AuthenticationService.organization_id + '/users/' + user_id, {
            headers: {
                'Authorization': 'Bearer ' + AuthenticationService.token
            }
        })
            .success(function (response) {

                $scope.user = response;
                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

        $http.get(api_url + AuthenticationService.organization_id + '/users/' + user_id + '/students', {
            headers: {
                'Authorization': 'Bearer ' + AuthenticationService.token
            }
        })
            .success(function (response) {

                //console.log(response);
                if (response.success) {
                    $scope.students = response.data;
                    $rootScope.doingResolve = false;
                }


            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

    }
]);