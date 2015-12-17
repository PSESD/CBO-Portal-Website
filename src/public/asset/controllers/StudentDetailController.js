app.controller('StudentDetailController', ['$route', '$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore', '$sce', '$window',
    function ($route, $rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore, $sce, $window) {
        'use strict';

        var urlTemplate = 'asset/templates/popoverTemplate.html';
        $scope.templateUrl = 'asset/templates/popoverTemplate.html';
        $rootScope.full_screen = false;
        $scope.student = {};
        $scope.programs = [];
        $scope.list_programs = [];
        $scope.icon_legend = true;
        $scope.open_button = false;

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

        $scope.showSchoolHistory = function () {
            $scope.sch_history = true;

        };

        $scope.closeSchoolHistory = function () {
            $scope.sch_history = false;


        };

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
            var activeTab = $scope.getStudentDetailActiveTab();
            var is = (activeTab === tabName || (activeTab === null && index === 0));
            return is;
        };


        $http.get(api_url + AuthenticationService.organization_id + '/students/' + student_id, {
            headers: {
                'Authorization': 'Bearer ' + AuthenticationService.token
            }
        })
            .success(function (response) {

                $.each(schoolDistricts, function (key, value) {
                    if (key === response.school_district) {
                        response.school_district = value;
                    }
                });

                $scope.student = response;

                $rootScope.doingResolve = false;

            })
            .error(function (response, status) {

                showError(response.error, 1);
                $rootScope.doingResolve = false;
                if (status === 401) {
                    $rootScope.show_footer = false;
                    CookieStore.clearData();
                    $location.path('/login');
                }

            });


        var getXsre = function () {

            $scope.loading_icon = false;
            $('.loading-icon').removeClass('hide');
            $http.get(api_url + AuthenticationService.organization_id + '/students/' + student_id + '/xsre', {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
                .success(function (response) {

                    var embedUsers = {};
                    var embedPrograms = [];
                    $scope.attendanceBehavior = [];
                    $scope.xsreLastUpdated = null;
                    if (response.success !== false && response.info) {

                        response = response.info;

                        var personal = $scope.personal = response.personal;
                        $scope.personal.race = personal.race.split(/(?=[A-Z])/).join(" ");
                        $scope.case_workers = response._embedded.users;
                        embedUsers = ('users' in response._embedded) ? response._embedded.users : {};
                        embedPrograms = ('programs' in response._embedded) ? response._embedded.programs : [];

                        $scope.case_workers = embedUsers;
                        $scope.daysAttendance = parseInt(personal.daysInAttendance);
                        $scope.daysAbsent = parseInt(personal.daysAbsent);


                        if (response.attendanceBehaviors) {
                            angular.forEach(response.attendanceBehaviors, function (behavior) {

                                Object.keys(behavior).forEach(function (key) {
                                    var columnHtml = {};
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
                                                            fontcolor: item.slug + '-font-color',
                                                            pagetitle: item.slug.toUpperCase(),
                                                            eventdate: item.event.calendarEventDate,
                                                            description: item.event.attendanceStatusTitle,
                                                            url: urlTemplate
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
                                                            url: ''
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
                                                    url: ''
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
                                                            pagetitle: (item.incidentCategoryTitle + '').toUpperCase(),
                                                            eventdate: item.incidentDate,
                                                            description: item.description,
                                                            url: urlTemplate
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
                                                            url: ''
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
                                                    url: ''
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
                                });
                            });
                        }

                        $scope.academicInfo = {
                            currentSchool: personal.enrollment.currentSchool || 'N/A',
                            expectedGraduationYear: personal.enrollment.expectedGraduationYear || 'N/A',
                            gradeLevel: personal.enrollment.gradeLevel || 'N/A',
                            languageSpokenAtHome: personal.languageHome || 'N/A',
                            iep: personal.ideaIndicator || 'N/A',
                            s504: personal.section504Status || 'N/A',
                            freeReducedLunch: (personal.eligibilityStatus && personal.enrollmentStatus) ? personal.enrollmentStatus : 'N/A'
                        };

                        $scope.transcripts = response.transcripts || {};
                        $scope.total_data = _.size(response.transcripts.subject);
                        $scope.transcripts.subjectOrder = [];
                        _.each($scope.transcripts.subject, function (item, key) {
                            $scope.transcripts.subjectOrder.push({name: key, value: item});
                        });
                        _.each($scope.transcripts.details, function (item) {
                            item.transcriptsOrder = [];
                            _.each(item.transcripts, function (i, k) {
                                item.transcriptsOrder.push({name: k, value: i});
                            });
                        });

                        $scope.xsreLastUpdated = response.lastUpdated;


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

                    } else {

                        showError(response.error, 1);

                    }
                    $scope.loading_icon = true;
                    $('.loading-icon').addClass('hide');
                    $rootScope.doingResolve = false;
                })
                .error(function (response, status) {

                    $scope.loading_icon = true;
                    $('.loading-icon').addClass('hide');
                    showError(response.error, 1);
                    $rootScope.doingResolve = false;
                    if (status === 401) {
                        $rootScope.show_footer = false;
                        CookieStore.clearData();
                        $location.path('/login');
                    }

                });
        };

        getXsre();



        $scope.showDebug = function () {
            $window.open($window.location.origin + '/#/student/xsre/' + student_id);
        };

        /**
         * Update Now, remove cache and reload the page content
         */
        $scope.updateNow = function () {

            $http.delete(api_url + AuthenticationService.organization_id + '/students/' + student_id + '/xsre', {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
                .success(function () {
                    getXsre();
                })
                .error(function (response, status) {

                    $scope.loading_icon = true;
                    $('.loading-icon').addClass('hide');
                    showError(response.error, 1);
                    $rootScope.doingResolve = false;
                    if (status === 401) {
                        $rootScope.show_footer = false;
                        CookieStore.clearData();
                        $location.path('/login');
                    }

                });
        };

    }]);