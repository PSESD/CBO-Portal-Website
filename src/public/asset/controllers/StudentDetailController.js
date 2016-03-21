var general_data = "";
var attendance_data = "";
var transcript_data = "";
var program_participation_data = "";
var json_debug = [];
var transcript_debug = [];
var attendance_state = false;
var transcript_state = false;
var full_name = "";
var startMonth;
var endMonth;
var startYears;
var endYears;
var startDate;
var endDate;
var colors = [
    'rgba(145,255,135,.5)',
    'rgba(156,217,255,.5)',
    'rgba(244,156,255,.5)',
    'rgba(201,255,156,.5)',
    'rgba(210,156,255,.5)',
];
var listEmail = [];
var refresh_template = '<div class="alert alert-info" role="alert"> ' +
    '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> ' +
    '<span class="sr-only">Error:</span> We have not been able to pull this student\'s record from the school district yet. We will try again soon, but you can also try to ' +
    '<a ng-hide="showLoading" ng-click="updateNow()">manually refresh the record</a> again now.</div>';
app.controller('StudentDetailController', ['$interval','$route', '$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore', '$sce', '$window','StudentCache','$uibModal',
    function ($interval,$route, $rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore, $sce, $window,StudentCache) {
        'use strict';
        $scope.show_content = true;
        $scope.listEmail = [];
        $scope.editorOptions = {
            lineWrapping : true,
            mode: 'javascript',
            height: '500px',
            tabSize: 6,
            lineNumbers: true,
            //readOnly: 'nocursor',
            theme: 'monokai',
            extraKeys: {"Alt-F": "findPersistent"}
        };


        $scope.flip = function(){
            if($scope.show_content === true)
            {
                $scope.show_content = false;
            }else if($scope.show_content === false)
            {
                $scope.show_content = true;
            }
        }
        showLoadingIcon($scope);
        $scope.loading_icon = true;
        $scope.showLoading = false;
        $scope.attendance_load_first_time = true;
        $scope.nonPromotionalStatus = false;
        var attendance = "";
        var transcript = "";
        var program_participation = "";
        var first_time = true;
        var urlTemplate = 'asset/templates/popoverTemplate.html';
        var attendance_cache = {};
        $scope.selected_programs = [];
        $scope.templateUrl = 'asset/templates/popoverTemplate.html';
        $rootScope.full_screen = false;
        //$scope.student = {};
        $scope.programs = [];
        $scope.list_programs = [];
        $scope.icon_legend = true;
        $scope.open_button = false;
        $scope.selected_years = [];
        $scope.attendance_loading = false;
        $scope.academic_years = [];
        $scope.close = function () {
            $scope.open_button = true;
            $scope.icon_legend = false;
        };
        $scope.open = function () {
            $scope.icon_legend = true;
            $scope.open_button = false;
        };
        var student_id = $routeParams.student_id;
        var groupValue = "_INVALID_GROUP_VALUE_";
        $scope.viewDebug = $routeParams.debug ? true : false;
        $scope.sch_history = false;
        $scope.academic = true;

        $scope.showHistory = function()
        {
            $("#schoolEnrollment").modal('show');
        };

        $scope.closeSchoolHistory = function () {
            $scope.sch_history = false;

        };

        $scope.showTranscriptJson = function(id)
        {
            var key = id.trim().replace(/\s/g, "");

                var data = _.find(transcript_debug, { 'key': key });
                $scope.snippet = data.value;
                $scope.refresh = true;
            $scope.debug_title = "Transcript";
            $('#debugModal').modal('show');

        };

        $scope.$watch('academic_year',function(year){
            if($scope.attendanceBehavior.length != 0){
                $scope.attendance_loading = true;
            }
            if(first_time !== true)
            {
                $scope.attendanceBehavior = [];
            }
            if(year && !(year.name in attendance_cache)){

                $http.get(api_url + AuthenticationService.organization_id + '/students/' + student_id + '/attendance?pageSize=all&year='+year.id, {
                    headers: {
                        'Authorization': 'Bearer ' + AuthenticationService.token
                    }
                }).success(function (response){

                    if(response.success === true && response.info.data !== undefined)
                    {

                        $scope.attendance_loading = false;
                        attendance_data = response.info.data;
                        attendance_cache[year.name] = attendance_data;
                        angular.forEach(response.info.data,function(v,k){

                           angular.forEach(response.info.data[k],function(v,k){
                               json_debug.push({
                                   key:k,
                                   value:JSON.stringify(v,null,2)
                               });

                           });
                        });
                        // StudentCache.put(student_id + "attendance",attendance_data);
                        generate_attendance_data(attendance_data,$scope,urlTemplate);
                        first_time = false;
                    }else{
                        $rootScope.doingResolve = false;

                    }
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
            }else
            {
                        if(_.has(year,'name')){
                            generate_attendance_data(attendance_cache[year.name],$scope,urlTemplate);
                        }


            }

        }
        );



        $scope.filterAttendanceOfYears = function () {
            return function (p) {
                if(String($scope.selected_years) !== '') {
                   // $scope.district_counter =  $scope.selected_districts.length;

                    for (var i in $scope.selected_years) {
                        if (p.weekDate.indexOf($scope.selected_years[i]) > -1) {

                            return true;
                        }
                    }

                }else{
                   // $scope.district_counter = 0;
                    return true;

                }

            };
        };


        $scope.openHeader = function(event)
        {
            var attendance_header = $(event.target).parent()[0];
            var attendance_detail = $(attendance_header).siblings()[0];
            $(attendance_detail).removeClass('hide');
            $(attendance_header).addClass('hide');

        }

        $scope.closeHeader = function(event)
        {
            var attendance_detail = $(event.target).parent()[0];
            var attendance_header = $(attendance_detail).siblings()[0];
            if ($(attendance_header).hasClass('hide')) {
                $(attendance_header).removeClass('hide');
            }
            $(attendance_detail).addClass('hide');

            if($scope.viewDebug === true){

                var data = _.find(json_debug, { 'key': $(attendance_header).data('key') });

                $scope.snippet = data.value;
                $scope.refresh = true;
                $scope.debug_title = "Attendance";
                $('#debugModal').modal('show');
            }
        }



        $scope.hideIcon = function (event) {

            var li = $(event.target).parent()[0];
            var attendance_header = $(li).parent()[0];
            var attendance_detail = $(attendance_header).siblings()[0];

            $(attendance_detail).removeClass('hide');
            $(attendance_header).addClass('hide');


        };
        $scope.showIcon = function (event) {

            var id = $(event.target).prop('id');
            var attendance_legend = $(event.target).parent()[0];
            var panel_body = $(attendance_legend).parent()[0];
            var panel_collapse = $(panel_body).parent()[0];
            var panel_heading = $($(panel_collapse).siblings(), id);
            var h4 = $(panel_heading).children()[0];
            var attendance_header = $(h4).children()[0];
            var attendance_detail = $(h4).children()[1];
            if ($(attendance_header).hasClass('hide')) {
                $(attendance_header).removeClass('hide');
            }

            $(attendance_detail).addClass('hide');

        };
        $('[data-toggle="tab"]').on('show.bs.tab', function (e) {
            $scope.setStudentDetailActiveTab(e.target.dataset.target);
            if(e.target.dataset.target === "#transcript")
            {
                //load_transcript_data($http,student_id,AuthenticationService,$rootScope,CookieStore,$location,$scope);
            }else if(e.target.dataset.target === "#program_participation")
            {
               // load_program_participation_data($http,student_id,AuthenticationService,$rootScope,CookieStore,$location,$scope);
            }else if(e.target.dataset.target === "#attendance_and_behavior")
            {
                //load_attendance_data($http,student_id,AuthenticationService,$rootScope,CookieStore,$location,$scope);
            }

        });
        // Save active tab to localStorage
        $scope.setStudentDetailActiveTab = function (activeTab) {
            localStorage.setItem("activeTabStudentDetail", activeTab);
        };

        // Get active tab from localStorage
        $scope.getStudentDetailActiveTab = function () {
            return localStorage.getItem("activeTabStudentDetail");
        };

        // Check if current tab is active
        $scope.isStudentDetailActiveTab = function (tabName, index) {
            if($(window).width() > 972){
                var activeTab = $scope.getStudentDetailActiveTab();
                var is = (activeTab === tabName || (activeTab === null && index === 0));
                return is;
            }
        };
        load_data($http,student_id,AuthenticationService,$rootScope,CookieStore,$location,$scope,StudentCache,$interval);

        $scope.showDebug = function () {
            $window.open($window.location.origin + '/#/student/xsre/' + student_id);
        };

        /**
         * Update Now, remove cache and reload the page content
         */
        $scope.updateNow = function () {
            $scope.loading_icon = false;
            attendance_state = true;
            transcript_state = true;
            $scope.attendance_loading = true;
            showLoadingIcon($scope);
            $http.delete(api_url + AuthenticationService.organization_id + '/students/' + student_id + '/xsre', {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
                .success(function () {
                    load_general_data($http,student_id,AuthenticationService,$rootScope,CookieStore,$location,$scope,StudentCache);
                    $scope.loading_icon = true;
                })
                .error(function (response, status) {

                    $scope.loading_icon = true;
                    showError(response, 1);
                    $rootScope.doingResolve = false;
                    if (status === 401) {
                        $rootScope.show_footer = false;
                        CookieStore.clearData();
                        $location.path('/login');
                    }

                });

            $http.delete(api_url + AuthenticationService.organization_id + '/students/' + student_id + '/xsre?separate=attendance', {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
                .success(function (response) {
                    json_debug = [];
                    $scope.attendanceBehavior = [];
                    //load_attendance_data($http,student_id,AuthenticationService,$rootScope,CookieStore,$location,$scope,StudentCache);
                    //$scope.loading_icon = true;
                    $http.get(api_url + AuthenticationService.organization_id + '/students/' + student_id + '/attendance?pageSize=all&year='+ _.get($scope.academic_year,'id'), {
                        headers: {
                            'Authorization': 'Bearer ' + AuthenticationService.token
                        }
                    }).success(function (response){

                        if(response.success === true && response.info.data !== undefined)
                        {
                            $scope.loading_icon = true;

                            attendance_data = response.info.data;
                            attendance_cache[$scope.academic_year.name] = attendance_data;
                            angular.forEach(response.info.data,function(v,k){

                                angular.forEach(response.info.data[k],function(v,k){
                                    json_debug.push({
                                        key:k,
                                        value:JSON.stringify(v,null,2)
                                    });

                                });
                            });
                            // StudentCache.put(student_id + "attendance",attendance_data);
                            generate_attendance_data(attendance_data,$scope,urlTemplate);
                            first_time = false;
                            attendance_state = false;
                            showLoadingIcon($scope);

                        }else{
                            attendance_state = false;
                            showLoadingIcon($scope);
                            $rootScope.doingResolve = false;
                            $scope.loading_icon = true;


                        }
                    })
                        .error(function (response, status) {
                            $scope.loading_icon = true;

                            showError(response, 1);
                            $rootScope.doingResolve = false;
                            if (status === 401) {
                                $rootScope.show_footer = false;
                                CookieStore.clearData();
                                $location.path('/login');
                            }
                            attendance_state = false;
                            showLoadingIcon($scope);
                        });

                })
                .error(function (response, status) {

                    $scope.loading_icon = true;

                    showError(response, 1);
                    $rootScope.doingResolve = false;
                    if (status === 401) {
                        $rootScope.show_footer = false;
                        CookieStore.clearData();
                        $location.path('/login');
                    }
                    attendance_state = false;
                    showLoadingIcon($scope);
                });

            $http.delete(api_url + AuthenticationService.organization_id + '/students/' + student_id + '/xsre?separate=transcript', {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
                .success(function () {
                    load_transcript_data($http,student_id,AuthenticationService,$rootScope,CookieStore,$location,$scope,StudentCache);
                    $scope.loading_icon = true;
                    transcript_state = false;
                    showLoadingIcon($scope);
                })
                .error(function (response, status) {

                    showError(response, 1);
                    $rootScope.doingResolve = false;
                    if (status === 401) {
                        $rootScope.show_footer = false;
                        CookieStore.clearData();
                        $location.path('/login');
                    }
                    transcript_state = false;
                    showLoadingIcon($scope);
                });
        };

    }]);

function generate_xsre_data(response,$scope)
{
    var embedPrograms = [];
    var personal = $scope.personal = response.personal;
    embedPrograms = ('programs' in response._embedded) ? response._embedded.programs : [];
    //$scope.case_workers = embedUsers;
    $scope.daysAttendance = parseInt(personal.daysInAttendance);
    $scope.daysAbsent = parseInt(personal.daysAbsent);

    angular.forEach(embedPrograms, function (v) {
        var program = {
            "years": new Date(v.participation_start_date).getFullYear(),
            "name": v.program_name,
            "start_date": v.participation_start_date,
            "end_date": new Date(v.participation_end_date) >= Date.now() ? 'Present' : v.participation_end_date,
            "active": v.active ? "Active" : "Inactive",
            "cohorts": v.cohort
        };
        $scope.programs.push(program);
    });
    $scope.programs.sort(function (a, b) {
        if (a.years >= b.years) {
            return (-1);
        }
        return (1);
    });

    var yearPrograms = {};

    for (var i = 0; i < $scope.programs.length; i++) {
        var program = $scope.programs[i];

        if (Object.keys(yearPrograms).indexOf(program.years) === -1) {
            yearPrograms[program.years] = [];
        }
        yearPrograms[program.years].push(program);
    }

    angular.forEach(yearPrograms, function (items, year) {
        $scope.list_programs.push({
            years: year,
            programs: items
        });
    });

}

function load_general_data($http,student_id,AuthenticationService,$rootScope,CookieStore,$location,$scope,StudentCache)
{
    'use strict';

    var assignedUsers = {};
    $scope.student = {};
    $scope.xsreLastUpdated = null;
    $scope.lastUpdated = null;
    //if(angular.isUndefined(StudentCache.get(student_id + "general")) === true)
    //{

        $http.get(api_url + AuthenticationService.organization_id + '/students/' + student_id+'/general', {
            headers: {
                'Authorization': 'Bearer ' + AuthenticationService.token
            }
        })
            .success(function (response) {

                if(response.success === true && response.info !== undefined)
                {
                    $scope.lastUpdated = response.info.personal.summary.date.latest;
                    full_name = response.info.personal.firstName + response.info.personal.lastName;
                    $rootScope.doingResolve = false;
                    general_data = response.info;
                    listEmail.push(_.get(general_data,'personal.email'));
                    _.forEach(_.get(general_data,'personal.xSre.email'),function(v){
                        listEmail.push(v);
                    })
                   $scope.listEmail = listEmail;
                    //StudentCache.put(student_id +"general",general_data);
                    generate_general_data(general_data,$scope,student_id);

                }else{
                    $rootScope.doingResolve = false;
                    //showError(response.error,1);
                    showError(refresh_template,1);
                }
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

    //}
    //else
    //{
    //   generate_general_data(StudentCache.get(student_id + "general"),$scope,student_id);
    //}



}

function generate_general_data(general_data,$scope,student_id)
{

    var embedPrograms = [];
    $scope.races="";
    embedPrograms = ('programs' in general_data._embedded) ? general_data._embedded.programs : [];

    $scope.visibleProjects = general_data.personal.xSre.otherEnrollments;
    _.each(general_data.personal.xSre.otherEnrollments,function(item,key){
        if(item.nonPromotionalChange === true && $scope.nonPromotionalStatus === false){
            $scope.nonPromotionalStatus = true;
        }
    });
    angular.forEach(embedPrograms, function (v) {
        var program = {
            "years": new Date(v.participation_start_date).getFullYear(),
            "name": v.program_name,
            "start_date": v.participation_start_date,
            "end_date": new Date(v.participation_end_date) >= Date.now() ? 'Present' : v.participation_end_date,
            "active": v.active ? "Active" : "Inactive",
            "cohorts": v.cohort
        };
        $scope.programs.push(program);
    });
    $scope.programs.sort(function (a, b) {
        if (a.years >= b.years) {
            return (-1);
        }
        return (1);
    });

    var yearPrograms = {};

    for (var i = 0; i < $scope.programs.length; i++) {
        var program = $scope.programs[i];

        if (Object.keys(yearPrograms).indexOf(program.years) === -1) {
            yearPrograms[program.years] = [];
        }
        yearPrograms[program.years].push(program);
    }

    angular.forEach(yearPrograms, function (items, year) {
        $scope.list_programs.push({
            years: year,
            programs: items
        });
    });


    $.each(schoolDistricts, function (key, value) {
        if (key === general_data.personal.schoolDistrict) {
            $scope.student.schoolDistrict = value;
        }
    });

    if(typeof general_data.personal.address !== "undefined")
    {
        $scope.student.address = general_data.personal.address.length === 0 ? "": general_data.personal.address;
    }
    else
    {
        $scope.student.address = "";
    }
    if(general_data.personal.xSre.demographics.races.length > 0){
        $scope.races = general_data.personal.xSre.demographics.races.join();
    }else{
        $scope.races ="";
    }
    $scope.student = general_data.personal;
    $scope.student._id = student_id;
    $scope.student.race = general_data.personal.xSre.demographics;
    assignedUsers = ('users' in general_data._embedded) ? general_data._embedded.users : {};
    $scope.case_workers = assignedUsers;
    $scope.academicInfo = {
        currentSchool: general_data.personal.xSre.enrollment.schoolName || '',
        expectedGraduationYear: general_data.personal.xSre.enrollment.projectedGraduationYear || '',
        gradeLevel: general_data.personal.xSre.enrollment.gradeLevel || '',
        languageSpokenAtHome: general_data.personal.languageHome || '',
        iep: general_data.personal.ideaIndicator || '',
        s504: general_data.personal.section504Status || '',
        freeReducedLunch: (general_data.personal.eligibilityStatus && general_data.personal.enrollmentStatus) ? general_data.personal.enrollmentStatus : ''
    };
    $scope.xsreLastUpdated = general_data.lastUpdated;
}

function load_attendance_data($http,student_id,AuthenticationService,$rootScope,CookieStore,$location,$scope,StudentCache,$interval)
{
    'use strict';
    $scope.attendanceBehavior = [];
    var urlTemplate = 'asset/templates/popoverTemplate.html';
    //if(angular.isUndefined(StudentCache.get(student_id + "attendance")) === true)
    //{

        $http.get(api_url + AuthenticationService.organization_id + '/students/' + student_id + '/attendance', {
            headers: {
                'Authorization': 'Bearer ' + AuthenticationService.token
            }
        }).success(function (response){
            if(response.success === true && response.info.data !== undefined)
            {
                $scope.legend = response.info.source.legend;
                $scope.legend_url = "asset/templates/legendTemplate.html";
                $scope.present = "present";
                $scope.excused = "excused";
                $scope.tardy = "tardy";
                $scope.other = "other";
                $scope.unexcused = "unexcused";


                //attendance_data = response.info.data;
                attendance_data = "";
               // StudentCache.put(student_id + "attendance",attendance_data);
                generate_attendance_data(attendance_data,$scope,urlTemplate);
                angular.forEach(response.info.source.years,function(v){
                    var year = {
                        id: v,
                        name:v.replace("/"," - ")
                    };
                    $scope.academic_years.push(year);
                });
                $scope.academic_year = $scope.academic_years[0];
                $scope.attendance_load_first_time = false;

            }else{
                $rootScope.doingResolve = false;
                $scope.attendance_load_first_time = false;
            }

        })
            .error(function (response, status) {

                showError(response, 1);
                $rootScope.doingResolve = false;
                if (status === 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                    $scope.attendance_load_first_time = false;
                }

            });

    //}
    //else
    //{
    //    generate_attendance_data(StudentCache.get(student_id + "attendance"),$scope,urlTemplate);
    //}

}

function generate_attendance_data(attendance_data,$scope,urlTemplate)
{
    var years = [];
    angular.forEach(attendance_data, function (behavior) {

        //Object.keys(behavior).forEach(function (key) {

        for(var key in behavior) {
            var columnHtml = {};
            var valOfYears
            valOfYears = key.trim().replace(/\s/g, '').split("/")[4];
            var year = {
                id: '',
                name: ''
            };

            year.id = valOfYears;
            year.name = valOfYears;

            years.push(year);

            angular.forEach(behavior[key].detailColumns, function (column, i) {

                if (i !== 'periods' && i !== 'weeklyChange') {
                    var xhtml = [];
                    var x = 1;
                    var cls = '';
                    angular.forEach(column, function (item, n) {

                        if (n > 0) {
                            var html = {};
                            cls = (x % 2 === 0) ? 'light' : '';
                            x++;
                            if (typeof item === 'object' && item.event !== null) {
                                html = {
                                    slug: item.slug,
                                    stripping: cls,
                                    na: '',
                                    fontcolor: _.get(item, 'slug') + '-font-color',
                                    pagetitle: _.get(item, 'slug.toUpperCase()'),
                                    eventdate: _.get(item, 'event.calendarEventDate'),
                                    description: _.get(item, 'event.attendanceStatusTitle'),
                                    url: urlTemplate,
                                    reason: _.get(item, 'event.absentReasonDescription'),
                                    category: _.get(item, 'event.absentAttendanceCategoryTitle'),
                                };
                            } else {
                                html = {
                                    slug: '',
                                    stripping: cls,
                                    na: 'n_a',
                                    fontcolor: '',
                                    pagetitle: '',
                                    eventdate: '',
                                    description: '',
                                    url: '',
                                    reason: '',
                                    category: '',
                                };
                            }
                            xhtml.push(html);
                        }
                    });

                    for (; x < 8; x++) {
                        html = {
                            slug: '',
                            stripping: '',
                            na: '',
                            fontcolor: '',
                            pagetitle: '',
                            eventdate: '',
                            description: '',
                            url: '',
                            reason: '',
                            category: '',
                        };
                        xhtml.push(html);
                    }
                    var items = behavior[key].behaviors[i];

                    if (items.length > 0) {

                        angular.forEach(items, function (item, i) {
                            var html = {};
                            if (typeof item === 'object') {
                                html = {
                                    slug: 'unexcused',
                                    stripping: cls,
                                    na: '',
                                    fontcolor: 'unexcused-font-color',
                                    pagetitle: (_.get(item, 'incidentCategoryTitle') + '').toUpperCase(),
                                    eventdate: _.get(item, 'incidentDate'),
                                    description: _.get(item, 'description'),
                                    url: urlTemplate,
                                    reason: _.get(item, 'incidentCategoryTitle'),
                                    category: _.get(item, 'incidentCategory'),
                                };
                            } else {
                                html = {
                                    slug: '',
                                    stripping: '',
                                    na: 'n_a',
                                    fontcolor: '',
                                    pagetitle: '',
                                    eventdate: '',
                                    description: '',
                                    url: '',
                                    reason: '',
                                    category: '',
                                };
                            }
                            xhtml.push(html);
                        });
                    } else {
                        var html = {
                            slug: '',
                            stripping: '',
                            na: 'n_a',
                            fontcolor: '',
                            pagetitle: '',
                            eventdate: '',
                            description: '',
                            url: '',
                            reason: '',
                            category: '',
                        };
                        xhtml.push(html);
                    }
                    //xhtml.push(html);
                    columnHtml[i] = xhtml;
                    behavior[key].columnHtml = columnHtml;
                    if (behavior[key].detailColumns.periods.length < 7) {
                        for (var j = 7; j > behavior[key].detailColumns.periods.length; j--) {
                            behavior[key].detailColumns.periods.push("");
                        }
                    }
                }

            });
            behavior[key].columnHtml = columnHtml;
            $scope.attendanceBehavior.push(behavior[key]);

            //});
        }
    });
    yearsOptions = _.uniq(years,'id');
    $scope.attendance_load_first_time = false;
}

function load_transcript_data($http,student_id,AuthenticationService,$rootScope,CookieStore,$location,$scope,StudentCache)
{
'use strict';
    //if(angular.isUndefined(StudentCache.get(student_id + "transcript")) === true)
    //{

        $http.get(api_url + AuthenticationService.organization_id + '/students/' + student_id + '/transcript?pageSize=all', {
            headers: {
                'Authorization': 'Bearer ' + AuthenticationService.token
            }
        }).success(function (response){

            if(response.success === true && response.info !== undefined)
            {

                transcript_data = response.info || {};
                angular.forEach(response.info.data,function(v,k){
                    var transcript = {
                        key: v.schoolYear + v.session.replace(/\s/g, ""),
                        value: JSON.stringify(v,null,2)
                    }
                    transcript_debug.push(transcript);

                });
               // StudentCache.put(student_id + "transcript",transcript_data);
                generate_transcript_data(transcript_data,$scope);
            }else{
                $rootScope.doingResolve = false;
            }
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

function generate_transcript_data(transcript_data,$scope)
{

    //$scope.visibleProjects = transcript_data.source.history;
    //_.each(transcript_data.source.history,function(item,key){
    //    if(item.nonPromotionalChange === true && $scope.nonPromotionalStatus === false){
    //        $scope.nonPromotionalStatus = true;
    //        console.log($scope.nonPromotionalStatus);
    //    }
    //});
    var courseTitle = transcript_data.source.info.courseTitle;
    $scope.courses = courseTitle;
    $scope.cumulative_gpa = transcript_data.source.totalCumulativeGpa;
    $scope.total_data = _.size(transcript_data.source.subject);
    $scope.transcripts =
    {
        subjectOrder : []
    };

    _.each(transcript_data.source.subject, function (item, key) {
        $scope.transcripts.subjectOrder.push({name: key, value: item});
    });
    _.each(transcript_data.data, function (item) {
        item.transcriptsOrder = [];
        _.each(item.transcripts, function (i, k) {
            item.transcriptsOrder.push({name: k, value: i});
        });
    });

    $scope.transcripts = transcript_data;
    $scope.credit_earned = transcript_data.source.totalCreditsEarned;
    $scope.credit_attempted = transcript_data.source.totalCreditsAttempted;
    $scope.grade_level = transcript_data.source.gradeLevel;
}

function load_program_participation_data($http,student_id,AuthenticationService,$rootScope,CookieStore,$location,$scope)
{
    'use strict';
    $http.get(api_url + AuthenticationService.organization_id + '/students/' + student_id + '/assessment', {
        headers: {
            'Authorization': 'Bearer ' + AuthenticationService.token
        }
    }).success(function (response){
        if(response.success === true && response.info !== undefined)
        {
            program_participation_data = response.info.data;
        }
        else{
            $rootScope.doingResolve = false;
        }
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

function load_graph($http,student_id,AuthenticationService,$rootScope,CookieStore,$location,$scope)
{
    var categories = [];
    var yData = [];
    var months_index = [{
        index:1,
        value:"January"
        },{
        index:2,
        value:"February"
        },{
        index:3,
        value:"March"
        },{
        index:4,
        value:"April"
        },{
        index:5,
        value:"May"
        },{
        index:6,
        value:"June"
        },{
        index:7,
        value:"July"
        },{
        index:8,
        value:"August"
        },{
        index:9,
        value:"September"
        },{
        index:10,
        value:"October"
        },{
        index:11,
        value:"November"
        },{
        index:12,
        value:"December"
        }];
    'use strict';
    $http.get(api_url + AuthenticationService.organization_id + '/students/' + student_id + '/report', {
        headers: {
            'Authorization': 'Bearer ' + AuthenticationService.token
        }
    }).success(function (response){

        if(response.success === true && response.info !== undefined)
        {
            var plotBands = [];
            var data = {};
            var programs = {};
            var listPrograms = [];
            var list_months = [];
            var list_years = []
            $scope.months = [];
            $scope.years = [];
            $scope.plot = [];
            $scope.programData = [];
            angular.forEach(response.info.attendance,function(v,k){
                categories.push(v.x);
                data[v.x] = categories.length -1;
                yData.push(v.y);
            });
            angular.forEach(response.info.attendance,function(v){
                var items = v.x.split(" ");
                var month = {
                    id:items[0],
                    name:items[0],
                    index:0
                }
                var years = {
                    id:items[1],
                    name:items[1]
                }
                list_months.push(month);
                list_years.push(years);
            })

            list_months = _.uniq(list_months,"id");
            $scope.years = _.uniq(list_years,"id");
            angular.forEach(list_months,function(v){
                for(var i = 0; i<months_index.length;i++)
                {
                    if(months_index[i].value === v.name){
                        $scope.months.push({
                            id: v.name,
                            name: v.name,
                            index:months_index[i].index
                        })
                    }
                }
            });
            angular.forEach(response.info.programs,function(v){

                var from = moment(new Date(v.from)).format('MMMM YYYY');
                var to = moment(new Date(v.to)).format('MMMM YYYY');
                if(from === to){
                    plotBands.push({
                        id:Math.floor((Math.random() * 999999) + 1) +"-"+ v.name,
                        from: data[from] - 0.5,
                        to: data[from] + 0.5,
                        color: colors[Math.floor((Math.random() * 5) + 0)],
                        label:{
                            align:'center',
                            text: v.name,
                            rotation:45
                        }
                    })
                    programs = {
                        id:{
                            id:Math.floor((Math.random() * 999999) + 1) +"-"+ v.name,
                            from: data[from] - 0.5,
                            to: data[from] + 0.5,
                            color: colors[Math.floor((Math.random() * 5) + 0)],
                            label:{
                                align:'center',
                                text: v.name,
                                rotation:45
                            }
                        },
                        name: v.name
                    };
                } else {
                    plotBands.push({
                        id:Math.floor((Math.random() * 999999) + 1) +"-"+ v.name,
                        from: data[from] - 0.5,
                        to: data[to] + 0.5,
                        color: colors[Math.floor((Math.random() * 5) + 0)],
                        label:{
                            align:'center',
                            text: v.name,
                            rotation:45
                        }
                    })
                    programs = {
                        id:{
                            id:Math.floor((Math.random() * 999999) + 1) +"-"+ v.name,
                            from: data[from] - 0.5,
                            to: data[to] + 0.5,
                            color: colors[Math.floor((Math.random() * 5) + 0)],
                            label:{
                                align:'center',
                                text: v.name,
                                rotation:45
                            }
                        },
                        name: v.name
                    };
                }

                listPrograms.push(programs)
            });

            $scope.programData = _.uniq(listPrograms,'name');

            $('#student-graph').highcharts({
                chart: {
                    type: 'areaspline',
                    marginLeft:50,
                    marginRight:50
                },
                position:{
                  align:'center'
                },
                title: {
                    text: 'Attendance Graph'
                },
                xAxis: {
                    categories: categories,
                    //plotBands:plotBands
                },
                yAxis: {
                    title: {
                        text: 'Days'
                    }
                },
                tooltip: {
                    shared: true,
                    valueSuffix: 'day(s)'
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    areaspline: {
                        fillOpacity: 0.5
                    }
                },
                series: [{
                    name: full_name,
                    data: yData
                }]
            });

        }
        else{
            $rootScope.doingResolve = false;
        }
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
    $scope.startMonthChange = function(item){
        startMonth = item;
    }
    $scope.startYearsChange = function(item){
        startYears = item;
    }

    $scope.endMonthChange = function(item){
        endMonth = item;
    }
    $scope.endYearsChange = function(item){
        endYears = item;
    }

    $scope.update_graph = function(){
        var chart = $("#student-graph").highcharts();
        var updatedCategories;
        var updatedData;
        startDate = startMonth + " " + startYears;
        endDate = endMonth + " " + endYears;
        updatedCategories = categories.slice(categories.indexOf(startDate),categories.indexOf(endDate) + 1);
        updatedData = yData.slice(categories.indexOf(startDate),categories.indexOf(endDate) + 1);
        chart.xAxis[0].setCategories(updatedCategories, true);
        chart.series[0].setData(updatedData,true);
        //chart.redraw();
    }
    $scope.reset_graph = function(){
        var chart = $("#student-graph").highcharts();
        chart.xAxis[0].setCategories(categories, true);
        chart.series[0].setData(yData,true);
        //chart.redraw();
    }
}

function load_data($http,student_id,AuthenticationService,$rootScope,CookieStore,$location,$scope,StudentCache,$interval,$filter){
    'use strict';
    load_general_data($http,student_id,AuthenticationService,$rootScope,CookieStore,$location,$scope,StudentCache);
    load_attendance_data($http,student_id,AuthenticationService,$rootScope,CookieStore,$location,$scope,StudentCache,$interval);
    load_transcript_data($http,student_id,AuthenticationService,$rootScope,CookieStore,$location,$scope,StudentCache);
    load_program_participation_data($http,student_id,AuthenticationService,$rootScope,CookieStore,$location,$scope);
    load_graph($http,student_id,AuthenticationService,$rootScope,CookieStore,$location,$scope,$filter);
    //$('.loading-icon').addClass('hide');
}

function showLoadingIcon($scope)
{
    if(attendance_state === false && transcript_state === false)
    {
        $scope.showLoading = false;
        $scope.attendance_loading = false;
    }
    else{
        $scope.showLoading = true;
    }
}