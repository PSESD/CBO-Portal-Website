app.controller('UserController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore','$filter','$uibModal',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore,$filter,$uibModal) {
        'use strict';
        $rootScope.full_screen = false;
        $scope.users = [];
        $scope.sortType="first_name";
        $scope.sortReverse=false;
        $scope.deleteUser = function (id, index) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'asset/templates/modalTemplate.html',
                controller: 'ModalInstanceCtrl',
                size: "sm",
                resolve:{
                    items:function(){
                        return {
                            "id":id,
                            index:index
                        }
                    }
                }
            });

            modalInstance.result.then(function (result) {
                if(result.success === true)
                {
                    showError(result.message, 2);
                    $scope.users.splice(index, 1);
                    $scope.working = false;
                    $location.path('/user');
                }else{
                    showError(result.message, 1);
                    $location.path('/user');
                }

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });

            //if (AuthenticationService.user_id === id) {
            //    showError('Cannot Remove your own data', 1);
            //} else if ((AuthenticationService.role+'').indexOf('case-worker') !== -1) {
            //    showError($rootScope.lang.you_dont_have_any_permission_page, 1);
            //} else if (id) {
            //    $scope.working = true;
            //    $http.delete(api_url + AuthenticationService.organization_id + '/users/' + id, {
            //        headers: {
            //            'Authorization': 'Bearer ' + AuthenticationService.token
            //        }
            //    })
            //        .success(function () {
            //
            //            $scope.users.splice(index, 1);
            //            $scope.working = false;
            //
            //        })
            //        .error(function (response, status) {
            //
            //            showError(response, 1);
            //            $scope.working = false;
            //            if (status === 401) {
            //                $rootScope.show_footer = false;
            //                CookieStore.clearData();
            //                $location.path('/login');
            //            }
            //
            //        });
            //}
        };



        $http.get(api_url + AuthenticationService.organization_id + '/users?pending=true', {
            headers: {
                'Authorization': 'Bearer ' + AuthenticationService.token
            }
        })
            .success(function (response) {
                if (response.success === true && response.total > 0) {


                    angular.forEach(response.data,function(v){
                        if(v.full_name === 'n/a')
                        {
                            v.full_name = "N/A";
                        }
                        if(v.first_name === 'n/a')
                        {
                            v.first_name = "N/A";
                        }
                        if(v.last_name === 'n/a')
                        {
                            v.last_name = "N/A";
                        }

                    });
                    $scope.users = response.data;


                } else {
                    showError(response.error.message, 1);
                }
                $rootScope.doingResolve = false;

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

        $http.get(api_url + AuthenticationService.organization_id + '/pending/users', {
            headers: {
                'Authorization': 'Bearer ' + AuthenticationService.token
            }
        })
            .success(function (response) {

                if (response.success === true && response.total > 0) {
                    $scope.pending_users = response.data;
                } else {
                    showError(response.error.message, 1);
                }
                $rootScope.doingResolve = false;

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
app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items,AuthenticationService,$rootScope,CookieStore,$location,$http) {

    $scope.yes = function () {
        var id = items.id;
        if (AuthenticationService.user_id === id) {
            showError('Cannot Remove your own data', 1);
        } else if ((AuthenticationService.role+'').indexOf('case-worker') !== -1) {
            showError($rootScope.lang.you_dont_have_any_permission_page, 1);
        } else if (id) {
            $scope.working = true;
            $http.delete(api_url + AuthenticationService.organization_id + '/users/' + id, {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
                .success(function (response) {
                    items.message = response.message;
                    items.success = true;
                    $uibModalInstance.close(items);
                })
                .error(function (response, status) {

                    showError(response, 1);
                    $scope.working = false;
                    if (status === 401) {
                        $rootScope.show_footer = false;
                        CookieStore.clearData();
                        $location.path('/login');
                    }

                });
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});