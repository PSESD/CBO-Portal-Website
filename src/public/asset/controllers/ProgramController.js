app.controller('ProgramController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore','$filter',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore,$filter) {
        'use strict';
        $rootScope.full_screen = false;
        $scope.programs = [];
        $scope.sortType="name";
        $scope.sortReverse=false;
        $scope.deleteProgram = function (id, index) {

            if (id) {
                $scope.working = true;
                $http.delete(api_url + AuthenticationService.organization_id + '/programs/' + id, {
                    headers: {
                        'Authorization': 'Bearer ' + AuthenticationService.token
                    }
                })
                    .success(function (response) {
                        showError(response.message, 2);
                        $scope.programs.splice(index, 1);
                        $scope.working = false;
                        $location.path('/program');

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