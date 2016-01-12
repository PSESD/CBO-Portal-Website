app.controller('StudentXSreController', ['$route','$rootScope', '$scope', '$routeParams', '$http', '$location', 'AuthenticationService', 'CookieStore',
    function ($route,$rootScope, $scope, $routeParams, $http, $location, AuthenticationService, CookieStore) {
        'use strict';
        var student_id = $routeParams.student_id;
        $scope.refresh = false;
        $scope.snippet = "";
        $scope.editorOptions = {
            //lineWrapping : true,
            height: '500px',
            tabSize: 6,
            lineNumbers: true,
            //readOnly: 'nocursor',
            theme: 'monokai',
            mode: 'xml',
            extraKeys: {"Alt-F": "findPersistent"}
        };


        $http.get(api_url + AuthenticationService.organization_id + '/students/' + student_id, {
            headers: {
                'Authorization': 'Bearer ' + AuthenticationService.token
            }
        })
            .success(function (response) {

                $scope.student = response;

                $http.get(api_url + AuthenticationService.organization_id + '/students/'+student_id+'/xsre.xml?raw=1', {
                    headers: {
                        'Authorization': 'Bearer ' + AuthenticationService.token
                    },
                    timeout: 15000
                })
                    .success(function (xml) {
                        $scope.snippet = xml;
                        $scope.refresh = true;
                        $rootScope.doingResolve = false;
                    })
                    .error(function (response, status) {
                        $rootScope.doingResolve = false;
                        showError(response, 1);
                        if (status === 401) {
                            $rootScope.show_footer = false;
                            CookieStore.clearData();
                            $location.path('/login');
                        }

                    });

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
        //$scope.codemirrorLoaded = function(_editor){
        //    // Editor part
        //    var _doc = _editor.getDoc();
        //    _editor.focus();
        //
        //    // Options
        //    _editor.setOption('firstLineNumber', 1);
        //    _doc.markClean();
        //
        //    // Events
        //    _editor.on("beforeChange", function(codemirror){ codemirror.refresh(); });
        //    _editor.on("change", function(codemirror){ codemirror.refresh(); });
        //};

    }]);