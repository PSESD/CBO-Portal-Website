app.controller('ProgramStudentController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore','$filter','$uibModal',
    function ($rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore,$filter,$uibModal) {
        'use strict';
        $rootScope.full_screen = false;
        $rootScope.doingResolve = false;
        var program_id = $routeParams.program_id;
        var active_status = '';
        var start_date = '';
        var end_date = '';
        var cohort = '';
        $scope.sortType="name";
        $scope.sortReverse=false;
        $scope.students = [];
        $http.get(api_url + AuthenticationService.organization_id + '/programs/' + program_id, {
            headers: {
                'Authorization': 'Bearer ' + AuthenticationService.token
            }
        })
            .success(function (response) {
                $scope.program = response;
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

        $http.get(api_url + AuthenticationService.organization_id + '/programs/' + program_id + '/students', {
            headers: {
                'Authorization': 'Bearer ' + AuthenticationService.token
            }
        })
            .success(function (response) {
                //console.log(response);
                if (response.success === true && response.total > 0) {
                    angular.forEach(response.data, function (value, key) {

                        cohort = '';
                        angular.forEach(value.programs, function (v, k) {
                            if (v.program === program_id) {
                                active_status = v.active;
                                start_date = v.participation_start_date;
                                end_date = v.participation_end_date;
                                //cohort = v.cohort.join();
                                cohort = _.map(v.cohort, function(c){
                                    return "<span class='label label-primary'>"+c+"</span>";
                                }).join(' ');
                                var student = {
                                    "_id": value._id,
                                    "name": value.first_name + ' ' + value.last_name,
                                    "active": active_status,
                                    "start_date": start_date,
                                    "end_date": end_date,
                                    "cohort": cohort
                                };
                                $scope.students.push(student);
                                $scope.students = $filter('orderBy')($scope.students,'name');
                            }
                        });
                    });
                }
                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                //console.log(response);
                //console.log(status);
                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status === 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });

        $scope.deleteStudent = function (id, index) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'asset/templates/modalTemplate.html',
                controller: 'ProgramStudentModalInstanceCtrl',
                size: "sm",
                resolve:{
                    items:function(){
                        return {
                            id:id,
                            index:index,
                            program_id:$routeParams.program_id
                        }
                    }
                }
            });

            modalInstance.result.then(function (result) {
                if(result.success === true)
                {
                    showError(result.message, 2);
                    $scope.students.splice(result.index, 1);
                    $scope.working = false;
                    $location.path('/program/students/' + program_id);
                }else{
                    showError(result.message, 1);
                    $location.path('/program/students/' + program_id);
                }

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

    }
]);

app.controller('ProgramStudentModalInstanceCtrl', function ($scope, $uibModalInstance, items,AuthenticationService,$rootScope,CookieStore,$location,$http) {

    $scope.yes = function () {
        var id = items.id;
        var program_id = items.program_id;
        if (id) {
            $scope.working = true;
            $http.delete(api_url + AuthenticationService.organization_id + '/programs/' + program_id + '/students/' + id, {
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