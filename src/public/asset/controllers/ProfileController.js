app.controller('ProfileController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;
        $rootScope.editable = false;

        $scope.activateEditable = function () {
            $rootScope.editable = true;
        };

        $http.get(api_url + 'user/', {
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
                showError(response.error, 1);
                $rootScope.doingResolve = false;
                if (status == 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

        $scope.editProfile = function (data) {
            if (data) {
                $scope.working = true;
                if (data.password != data.retype_password) {

                    showError($rootScope.lang.password_not_match, 1);
                    $scope.working = false;
                } else {
                    var user = {
                        "email": data.email,
                        "first_name": data.first_name,
                        "middle_name": data.middle_name,
                        "last_name": data.last_name,
                        "password": data.password,
                        "retype_password": data.retype_password
                    };
                    $scope.working = true;
                    //$http.put( api_url+AuthenticationService.organization_id+'/users/'+AuthenticationService.user_id, $.param(user), {

                    $http.put(api_url + 'user/', $.param(user), {
                        headers: {
                            'Authorization': 'Bearer ' + AuthenticationService.token
                        }
                    })
                        .success(function (response) {

                            if (response.success == true) {
                                $scope.working = false;
                                $location.path('/profile');
                                //console.log("Successfully updated");
                                $rootScope.doingResolve = false;
                                showError(response.message, 2);
                                var complete_name = '';
                                if (typeof user.first_name !== 'undefined' && user.first_name) {
                                    complete_name += user.first_name + ' ';
                                }
                                if (typeof user.last_name !== 'undefined' && user.last_name) {
                                    complete_name += user.last_name;
                                }

                                $rootScope.completeName = complete_name;

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
                            if (status == 401) {
                                $rootScope.show_footer = false;
                                CookieStore.clearData();
                                $location.path('/login');
                            }

                        });
                }
            }
        };

    }
]);