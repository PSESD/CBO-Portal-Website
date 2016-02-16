app.controller('ProgramController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore','$filter','$uibModal',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore,$filter,$uibModal) {
        'use strict';
        $rootScope.full_screen = false;
        $scope.animationsEnabled = true;
        $scope.programs = [];
        $scope.sortType="name";
        $scope.sortReverse=false;
        $scope.deleteProgram = function (id, index) {

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
                    $scope.programs.splice(result.index, 1);
                    $scope.working = false;
                    $location.path('/program');
                }else{
                    showError(result.message, 1);
                    $location.path('/program');
                }

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });

        };

        $http.get(api_url + AuthenticationService.organization_id + '/programs', {
            headers: {
                'Authorization': 'Bearer ' + AuthenticationService.token
            }
        })
            .success(function (response) {

                if (response.success === true && response.total > 0) {
                    response.data = _.map(response.data,function(value){
                        value.cohorts = _.map(value.cohorts, function(c){
                            return "<span class='label label-primary'>"+c+"</span>";
                        }).join(' ');
                        return value;
                    });
                    $scope.programs = response.data;
                    $scope.programs = $filter('orderBy')($scope.programs,'name');
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
        if (id) {
            $scope.working = true;
            $http.delete(api_url + AuthenticationService.organization_id + '/programs/' + id, {
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