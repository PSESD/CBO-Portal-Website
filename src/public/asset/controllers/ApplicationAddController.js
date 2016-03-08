app.controller('ApplicationsAddController',['$scope','$http','$rootScope','AuthenticationService','$location','$uibModal',function($scope,$http,$rootScope,AuthenticationService,$location,$uibModal){

    $scope.createKey = function(app){
        $scope.showLoadingIcon = true;
        $http.post(api_url + AuthenticationService.organization_id + '/applications/', $.param(app), {
            headers: {
                'Authorization': 'Bearer ' + AuthenticationService.token
            }
        }).success(function(response){
            if(response.success === true){
                $scope.showLoadingIcon = false;
                showError(_.get(response,'message'),2);
                $uibModal.open({
                    animation: true,
                    templateUrl: 'asset/templates/apiTemplate.html',
                    controller: 'ModalKeyInstanceCtrl',
                    backdrop:'static',
                    size: "lg",
                    resolve: {
                        items: function () {
                            return {
                                "keys":response.info.secretKey,
                                "clientID":response.info.clientId
                            }
                        }
                    }
                });

            }else{
                showError(_.get(response,'message'),1);
            }
        }).error(function(response){
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


}]);

app.controller('ModalKeyInstanceCtrl', function ($rootScope,$scope, $uibModalInstance, items,$http,AuthenticationService,$location) {

    $scope.keys = items.keys;
    $scope.clientid = items.clientID;
    $scope.ok = function () {
        $location.path("/applications");
        $uibModalInstance.dismiss('cancel');
    };

});