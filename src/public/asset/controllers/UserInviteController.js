app.controller('UserInviteController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore) {

        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;

        $scope.user = {
            role: 'case-worker-restricted'
        };


        $scope.inviteUser = function (user) {
            user.caseWorkerRestricted = !user.caseWorkerRestricted;

            if (user) {
                user.redirect_url = AuthenticationService.redirect_url;

                $scope.working = true;
                $http.post(auth_url + '/user/invite', $.param(user), {
                    headers: {
                        'Authorization': 'Bearer ' + AuthenticationService.token
                    }
                })
                    .success(function (response) {
                        if (response.success == true) {
                            showError(response.message, 2);

                            $location.path('/user');
                        } else {
                            showError(response.message, 1);
                        }
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
            }
        };

    }
]);