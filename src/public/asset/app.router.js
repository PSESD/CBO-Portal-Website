app.config(function ($routeProvider) {
    'use strict';
    $routeProvider.
        when('/', {
            templateUrl: 'asset/templates/student/list.html',
            controller: 'StudentController',
            //access: {
                requiredAuthentication: true,
            //}
        }).
        when('/student/add', {
            templateUrl: 'asset/templates/student/add.html',
            controller: 'StudentAddController',
            //access: {
                requiredAuthentication: true
            //}
        }).
        when('/student/backpacks/:student_id', {
            templateUrl: 'asset/templates/student/backpacks.html',
            controller: 'StudentBackpackController',
            //access: {
                requiredAuthentication: true
            //}
        }).
        when('/student/detail/:student_id', {
            templateUrl: 'asset/templates/student/detail.html',
            controller: 'StudentDetailController',
            //access: {
                requiredAuthentication: true
            //}
        }).
        when('/student/xsre/:student_id', {
            templateUrl: 'asset/templates/student/xsre.html',
            controller: 'StudentXSreController',
            //access: {
                requiredAuthentication: true
            //}
        }).
        when('/student/edit/:student_id', {
            templateUrl: 'asset/templates/student/edit.html',
            controller: 'StudentEditController',
            //access: {
                requiredAuthentication: true
            //}
        }).
        when('/student/programs/:student_id/add', {
            templateUrl: 'asset/templates/student/program_add.html',
            controller: 'StudentProgramAddController',
            //access: {
                requiredAuthentication: true
            //}
        }).
        when('/student/programs/:student_id', {
            templateUrl: 'asset/templates/student/program_list.html',
            controller: 'StudentProgramController',
            //access: {
                requiredAuthentication: true
            //}
        }).
        when('/student', {
            templateUrl: 'asset/templates/student/list.html',
            controller: 'StudentController',
            //access: {
                requiredAuthentication: true
            //}
        }).
        when('/report', {
            templateUrl: 'asset/templates/report/index.html',
            controller: 'ReportController',
            //access: {
                requiredAuthentication: true
            //}
        }).
        when('/profile/edit', {
            templateUrl: 'asset/templates/profile/edit.html',
            controller: 'ProfileEditController',
            //access: {
                requiredAuthentication: true
            //}
        }).
        when('/profile', {
            templateUrl: 'asset/templates/profile/detail.html',
            controller: 'ProfileController',
            //access: {
                requiredAuthentication: true
            //}
        }).
        when('/program/add', {
            templateUrl: 'asset/templates/program/add.html',
            controller: 'ProgramAddController',
            //access: {
                requiredAuthentication: true
            //}
        }).
        when('/program/detail/:program_id', {
            templateUrl: 'asset/templates/program/detail.html',
            controller: 'ProgramDetailController',
            //access: {
                requiredAuthentication: true
           // }
        }).
        when('/program/edit/:program_id', {
            templateUrl: 'asset/templates/program/edit.html',
            controller: 'ProgramEditController',
            //access: {
                requiredAuthentication: true
            //}
        }).
        when('/program/students/:program_id/add', {
            templateUrl: 'asset/templates/program/student_add.html',
            controller: 'ProgramStudentAddController',
            //access: {
                requiredAuthentication: true
            //}
        }).
        when('/program/students/:program_id/edit/:student_id', {
            templateUrl: 'asset/templates/program/student_edit.html',
            controller: 'ProgramStudentEditController',
            //access: {
                requiredAuthentication: true
            //}
        }).
        when('/program/students/:program_id', {
            templateUrl: 'asset/templates/program/student_list.html',
            controller: 'ProgramStudentController',
            //access: {
                requiredAuthentication: true
            //}
        }).
        when('/program', {
            templateUrl: 'asset/templates/program/list.html',
            controller: 'ProgramController',
            //access: {
                requiredAuthentication: true
            //}
        }).
        when('/tag/add', {
            templateUrl: 'asset/templates/tag/add.html',
            controller: 'TagAddController',
            //access: {
                requiredAuthentication: true,
                requiredAdmin: true
            //}
        }).
        when('/tag/edit/:tag_id', {
            templateUrl: 'asset/templates/tag/edit.html',
            controller: 'TagEditController',
            //access: {
                requiredAuthentication: true,
                requiredAdmin: true
            //}
        }).
        when('/tag', {
            templateUrl: 'asset/templates/tag/list.html',
            controller: 'TagController',
            //access: {
                requiredAuthentication: true,
                requiredAdmin: true
            //}
        }).
        when('/user/invite', {
            templateUrl: 'asset/templates/user/invite.html',
            controller: 'UserInviteController',
            //access: {
                requiredAuthentication: true,
                requiredAdmin: true
            //}
        }).
        when('/user/group/:user_id/add', {
            templateUrl: 'asset/templates/user/group_add.html',
            controller: 'UserGroupAddController',
            //access: {
                requiredAuthentication: true,
                requiredAdmin: true
            //}
        }).
        when('/user/group/:user_id', {
            templateUrl: 'asset/templates/user/group.html',
            controller: 'UserGroupController',
            //access: {
                requiredAuthentication: true,
                requiredAdmin: true
            //}
        }).
        when('/user/assign/:user_id', {
            templateUrl: 'asset/templates/user/assign.html',
            controller: 'UserAssignController',
            //access: {
                requiredAuthentication: true,
                requiredAdmin: true
            //}
        }).
        when('/user/edit/:user_id', {
            templateUrl: 'asset/templates/user/edit.html',
            controller: 'UserEditController',
            //access: {
                requiredAuthentication: true,
                requiredAdmin: true
            //}
        }).
        when('/user/detail/:user_id', {
            templateUrl: 'asset/templates/user/detail.html',
            controller: 'UserDetailController',
            //access: {
                requiredAuthentication: true
           // }
        }).
        when('/user', {
            templateUrl: 'asset/templates/user/list.html',
            controller: 'UserController',
            //access: {
                requiredAuthentication: true,
                requiredAdmin: true
            //}
        }).
        when('/user/pending', {
            templateUrl: 'asset/templates/user/pending_list.html',
            controller: 'UserController',
            //access: {
                requiredAuthentication: true,
                requiredAdmin: true
            //}
        }).
        when('/heartbeat', {
            templateUrl: 'asset/templates/heartbeat/list.html',
            controller: 'HeartbeatController',
            //access: {
                requiredAuthentication: true
            //}
        }).
        when('/applications', {
            templateUrl: 'asset/templates/user/application.html',
            controller: 'ApplicationsController',
            //access: {
            requiredAuthentication: true
            //}
        }).
        when('/applications/add', {
            templateUrl: 'asset/templates/user/application_add.html',
            controller: 'ApplicationsAddController',
            //access: {
            requiredAuthentication: true
            //}
        }).
        when('/login', {
            templateUrl: 'asset/templates/login.html',
            controller: 'LoginController'
        }).
        when('/loading', {
            templateUrl: 'asset/templates/loading.html',
            controller: 'LoadingController'
        }).
        when('/forget', {
            templateUrl: 'asset/templates/forget.html',
            controller: 'LoginController'
        }).
        otherwise({
            redirectTo: '/'
        });

});