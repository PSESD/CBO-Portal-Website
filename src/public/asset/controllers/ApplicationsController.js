app.controller('ApplicationsController',['$scope','$http','$rootScope','AuthenticationService','$location','$uibModal',function($scope,$http,$rootScope,AuthenticationService,$location,$uibModal){
    $scope.showForm = false;

    $scope.openForm = function(){
        $scope.showForm = true;
    }
    $scope.closeForm = function(){
        $scope.showForm = false;
    }

    $http.get(api_url + AuthenticationService.organization_id + '/applications/', {
        headers: {
            'Authorization': 'Bearer ' + AuthenticationService.token
        }
    }).success(function(response){
        if(response.success === true){
            $scope.applications = response.data;
        }else{
            showError(response.message,2);
        }
        $rootScope.doingResolve = false;
    }).error(function (response, status) {

        showError(response, 1);
        $rootScope.doingResolve = false;
        if (status === 401) {
            $rootScope.show_footer = false;
            CookieStore.clearData();
            $location.path('/login');
        }

    });

    $scope.createKey = function(app){
        $http.post(api_url + AuthenticationService.organization_id + '/applications/', $.param(app), {
            headers: {
                'Authorization': 'Bearer ' + AuthenticationService.token
            }
        }).success(function(response){
            if(response.success === true){
                showError(response.message,2);
                $scope.applications.push({
                    "app_name":app.app_name,
                    "created":Date.now()
                });
                $uibModal.open({
                    animation: true,
                    templateUrl: 'asset/templates/apiTemplate.html',
                    controller: 'ModalKeyInstanceCtrl',
                    size: "lg",
                    resolve: {
                        items: function () {
                            return {
                                "keys":response.info.token
                            }
                        }
                    }
                });
            }else{
                showError(response.message,1);
            }
            $scope.showForm = false;
        }).error(function(response){
            $scope.showForm = false;
            showError(response, 1);
            $scope.working = false;
            if (status === 401) {
                $rootScope.show_footer = false;
                CookieStore.clearData();
                $location.path('/login');
            }
        });

    }

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
                $scope.list_users = response.data;

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

    $scope.deleteApplication = function (id, index) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'asset/templates/modalTemplate.html',
            controller: 'ApplicationModalInstanceCtrl',
            size: "sm",
            resolve: {
                items: function () {
                    return {
                        "id": id,
                        index: index
                    }
                }
            }
        });
        modalInstance.result.then(function (result) {
            if(result.success === true)
            {
                showError(result.message, 2);
                $scope.applications.splice(result.index, 1);
                $scope.working = false;
                $location.path('/applications');
            }else{
                showError(result.message, 1);
                $location.path('/applications');
            }

        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    }

}]);

app.controller('ModalKeyInstanceCtrl', function ($scope, $uibModalInstance, items) {

    $scope.keys = items.keys;

    $scope.ok = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

app.controller('ApplicationModalInstanceCtrl', function ($scope, $uibModalInstance, items,AuthenticationService,$rootScope,CookieStore,$location,$http) {

    $scope.yes = function () {
        var id = items.id;
        if (id) {
            $scope.working = true;
            $http.delete(api_url + AuthenticationService.organization_id + '/applications/' + id, {
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