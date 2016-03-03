app.controller('StudentController', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore', 'locale', '$timeout','$q','$filter','$uibModal',
    function ($rootScope, $scope, $http, $location, AuthenticationService, CookieStore, locale, $timeout,$q,$filter,$uibModal) {
        'use strict';

        var deferred = $q.defer();

        var districtOption = {};
        var options = [];
//        var school_options = [];
//        var schoolOptions = {};
        var pluralBehavior = '';
        var pluralAttendance = '';
        $scope.district_counter = 0;
        $scope.school_counter = 0;
        $rootScope.full_screen = false;
        $scope.students = [];
        $scope.districtData = [];
        $scope.schoolNameData = [];
        $scope.selected_districts = [];
        $scope.selected_schools = [];
        $scope.filterSettings = {
            scrollableHeight: '250px',
            scrollable: true
        };
        $scope.success_label = "label label-success";
        $scope.danger_label = "label label-danger";
        $scope.warning_label = "label label-warning";
        $scope.test = "Test";
        $scope.sortType="first_name";
        $scope.sortReverse=false;
        $scope.urlTemplate = "asset/templates/listTemplate.html"
        $scope.filterDistrict = function () {
            return function (p) {
                if(String($scope.selected_districts) !== '') {
                    $scope.district_counter =  $scope.selected_districts.length;
                    for (var i in $scope.selected_districts) {
                        if (p.school_district === $scope.selected_districts[i]) {

                            return true;
                        }
                    }

                }else{
                    $scope.district_counter = 0;
                    return true;

                }

            };
        };
        $scope.filterSchools = function () {
            return function (p) {
                if(String($scope.selected_schools) !== '') {
                    $scope.school_counter =  $scope.selected_schools.length;
                    for (var i in $scope.selected_schools) {
                        if (p.schoolName.replace(/<[^>]+>/gm, '') === $scope.selected_schools[i].replace(/<[^>]+>/gm, '')) {
                            return true;
                        }
                    }

                }else{
                    $scope.school_counter = 0;
                    return true;
                }

            };
        };


        $scope.deleteStudent = function (id, index) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'asset/templates/modalTemplate.html',
                controller: 'StudentModalInstanceCtrl',
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
                    $scope.students.splice(result.index, 1);
                    $scope.working = false;
                    $location.path('/student');
                }else{
                    showError(result.message, 1);
                    $location.path('/student');
                }

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });

        };





        var pullXsreStudents = function(studentKeys){

            angular.forEach($scope.students, function(student){
                student.gradeLevel = locale.getString('general.retrieving');
                student.schoolYear = locale.getString('general.retrieving');
                student.schoolName = locale.getString('general.retrieving');
                student.attendance = locale.getString('general.retrieving');
                student.behavior = locale.getString('general.retrieving');
                student.onTrackGraduate = locale.getString('general.retrieving');

                $http.get(api_url + AuthenticationService.organization_id + '/students/'+student._id+'?xsre=1', {
                    headers: {
                        'Authorization': 'Bearer ' + AuthenticationService.token
                    },
                    timeout: 1100000
                })
                    .success(function (student) {
                        if(student._id in studentKeys){
                            var onTrack = _.get(student,'xsre.onTrackToGraduate');

                            if(parseInt(_.get(student,'xsre.behavior')) === 0){
                                pluralBehavior = locale.getString('general.incidents', [_.get(student,'xsre.behavior')]);
                            }else if(parseInt(_.get(student,'xsre.behavior')) === 1){
                                pluralBehavior =  locale.getString('general.incident', [_.get(student,'xsre.behavior')]);
                            }else{
                                pluralBehavior = locale.getString('general.incidents', [_.get(student,'xsre.behavior')]);
                            }

                            //if(parseInt(_.get(student,'xsre.attendance.absents.attendanceAcademicYear')) === 0){
                            //    pluralBehavior = locale.getString('general.days_missed', [_.get(student,'xsre.attendance.absents.attendanceAcademicYear')]);
                            //}else if(parseInt(_.get(student,'xsre.attendance.absents.attendanceAcademicYear') === 1)){
                            //    pluralBehavior = locale.getString('general.day_missed', [_.get(student,'xsre.attendance.absents.attendanceAcademicYear')]);
                            //}else{
                            //    pluralBehavior = locale.getString('general.days_missed', [_.get(student,'xsre.attendance.absents.attendanceAcademicYear')]);
                            //}

                            if(parseInt(_.get(student,'xsre.attendance')) <= 1){
                                pluralAttendance =  locale.getString('general.day_missed', [_.get(student,'xsre.attendance')]);
                            }else{
                                pluralAttendance = locale.getString('general.days_missed', [_.get(student,'xsre.attendance')]);
                            }
                            if(onTrack === 'Y' || onTrack === 'On Track' || onTrack === 'Yes'){
                                onTrack = locale.getString('general.on_track');
                            } else if(onTrack === 'N' || onTrack === 'Off Track' || onTrack === 'No') {
                                onTrack = locale.getString('general.off_track');
                            } else {
                                onTrack = locale.getString('general.unavailable');
                            }
                            $scope.students[studentKeys[student._id]].gradeLevel = _.get(student, 'xsre.gradeLevel') || locale.getString('general.unavailable');
                            $scope.students[studentKeys[student._id]].schoolYear = _.get(student,'xsre.schoolYear') || locale.getString('general.unavailable');
                            $scope.students[studentKeys[student._id]].schoolName = _.get(student,'xsre.schoolName') || locale.getString('general.unavailable');
                            $scope.students[studentKeys[student._id]].attendance = _.has(student,'xsre.attendance') ? pluralAttendance : locale.getString('general.unavailable');
                            $scope.students[studentKeys[student._id]].behavior = _.has(student,'xsre.behavior') ? pluralBehavior : locale.getString('general.unavailable');
                            $scope.students[studentKeys[student._id]].onTrackGraduate = onTrack;

                        } else {

                            $scope.students[studentKeys[student._id]].gradeLevel = locale.getString('general.unavailable');
                            $scope.students[studentKeys[student._id]].schoolYear = locale.getString('general.unavailable');
                            $scope.students[studentKeys[student._id]].schoolName = locale.getString('general.unavailable');
                            $scope.students[studentKeys[student._id]].attendance = locale.getString('general.unavailable');
                            $scope.students[studentKeys[student._id]].behavior = locale.getString('general.unavailable');
                            $scope.students[studentKeys[student._id]].onTrackGraduate = locale.getString('general.unavailable');

                        }

                        var find = $scope.students[studentKeys[student._id]].schoolName;
                        if(find){
                            find      = String(find).replace(/<[^>]+>/gm, '');
                            var found = $scope.schoolNameData.some(function(hash){
                                if(_.includes(hash, find)) {return true;}
                            });
                            if(!found){
                                $scope.schoolNameData.push({ id: find, name: find });
                            }
                        }
                    })
                    .error(function (response, status) {

                        showError(response, 1);
                        if (status === 401) {
                            $rootScope.show_footer = false;
                            CookieStore.clearData();
                            $location.path('/login');
                        } else if(status >= 500 || (response === null && status === 0)){
                            $scope.students[studentKeys[student._id]].gradeLevel = locale.getString('general.unavailable');
                            $scope.students[studentKeys[student._id]].schoolYear = locale.getString('general.unavailable');
                            $scope.students[studentKeys[student._id]].schoolName = locale.getString('general.unavailable');
                            $scope.students[studentKeys[student._id]].attendance = locale.getString('general.unavailable');
                            $scope.students[studentKeys[student._id]].behavior = locale.getString('general.unavailable');
                            $scope.students[studentKeys[student._id]].onTrackGraduate = locale.getString('general.unavailable');
                        }

                    });
            });

        };

        $timeout(function() {
            deferred.resolve(); // this aborts the request!
        }, 1000);

        $http.get(api_url + AuthenticationService.organization_id + '/students', {
            headers: {
                'Authorization': 'Bearer ' + AuthenticationService.token
            }

        })
            .success(function (response) {
                if (response.success === true && response.total > 0) {
                    var embedData = [];
                    embedData = ('data' in response) ? response.data : [];

                    var data = [];
                    var o = 0;
                    var studentKeys = {};
                    angular.forEach(embedData, function (student) {
                        $.each(schoolDistricts, function (key, value) {
                            if (key === student.school_district || value === student.school_district) {
                                student.school_district = value;
                            }
                        });

                        var onTrack = _.get(student,'xsre.onTrackToGraduate');
                        if(parseInt(_.get(student,'xsre.behavior')) === 0) {
                            pluralBehavior = locale.getString('general.incidents', [_.get(student, 'xsre.behavior')]);
                        }else if(parseInt(_.get(student,'xsre.behavior')) === 1){
                            pluralBehavior =  locale.getString('general.incident', [_.get(student,'xsre.behavior')]);
                        }else{
                            pluralBehavior = locale.getString('general.incidents', [_.get(student,'xsre.behavior')]);
                        }

                        if(parseInt(_.get(student,'xsre.attendance.absents.attendanceAcademicYear')) === 0){
                            pluralAttendance = locale.getString('general.days_missed', [_.get(student,'xsre.attendance.absents.attendanceAcademicYear')]);
                        }else if(parseInt(_.get(student,'xsre.attendance.absents.attendanceAcademicYear') === 1)){
                            pluralAttendance = locale.getString('general.day_missed', [_.get(student,'xsre.attendance.absents.attendanceAcademicYear')]);
                        }else{
                            pluralAttendance = locale.getString('general.days_missed', [_.get(student,'xsre.attendance.absents.attendanceAcademicYear')]);
                        }
                        if(onTrack === 'Y' || onTrack === 'On Track' || onTrack === 'Yes'){
                            //onTrack = locale.getString('general.on_track');
                            onTrack = "Y";
                        } else if(onTrack === 'N' || onTrack === 'Off Track' || onTrack === 'No') {
                            //onTrack = locale.getString('general.off_track');
                            onTrack = "N";
                        } else {
                            //onTrack = locale.getString('general.unavailable');
                            onTrack = "U";
                        }
                        student.gradeLevel = _.get(student, 'xsre.gradeLevel') || locale.getString('general.unavailable');
                        student.schoolYear = _.get(student,'xsre.schoolYear') || locale.getString('general.unavailable');
                        student.schoolName = _.get(student,'xsre.schoolName') || locale.getString('general.unavailable');
                        student.attendance = _.has(student,'xsre.attendance.absents.attendanceAcademicYear') ? pluralAttendance : locale.getString('general.unavailable');
                        student.behavior = _.has(student,'xsre.behavior') ? pluralBehavior : locale.getString('general.unavailable');
                        if(student.gradeLevel === 'N/A') student.gradeLevel =  locale.getString('general.unavailable');
                        if(student.schoolYear === 'N/A') student.schoolYear =  locale.getString('general.unavailable');
                        if(student.schoolName === 'N/A') student.schoolName =  locale.getString('general.unavailable');
                        if(student.attendance.indexOf('N/A') !== -1) student.attendance =  locale.getString('general.unavailable');
                        if(student.behavior.indexOf('N/A') !== -1) student.behavior =  locale.getString('general.unavailable');
                        student.onTrackGraduate = onTrack;
                        var find = student.schoolName;
                        if(find){
                            find      = String(find).replace(/<[^>]+>/gm, '');
                            var found = $scope.schoolNameData.some(function(hash){
                                if(_.includes(hash, find)) {return true;}
                            });
                            if(!found){
                                $scope.schoolNameData.push({ id: find, name: find });
                            }
                        }

                        $scope.students.push(student);
                        studentKeys[student._id] = o;
                        o++;
                        if(options.indexOf(student.school_district) === -1){
                            options.push(student.school_district);
                        }
                    });
                    $scope.students = $filter('orderBy')($scope.students,'first_name');
                    /**
                     * Get XSRE
                     */
                   // $timeout( function(){ pullXsreStudents(studentKeys); }, 30);

                    angular.forEach(options,function(value){
                        districtOption = {
                            id:value,
                            name:value
                        };
                        $scope.districtData.push(districtOption);
                    });

                } else {
                    showError(response.error.message, 1);
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



    }
]);

app.controller('StudentModalInstanceCtrl', function ($scope, $uibModalInstance, items,AuthenticationService,$rootScope,CookieStore,$location,$http) {

    $scope.yes = function () {
        var id = items.id;
        if (id) {
            $scope.working = true;
            $http.delete(api_url + AuthenticationService.organization_id + '/students/' + id, {
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