app.controller('LoginController', ['$rollbar','$rootScope', '$scope', '$http', '$location', 'AuthenticationService', 'CookieStore','locale',
    function ($rollbar,$rootScope, $scope, $http, $location, AuthenticationService, CookieStore,locale) {
        'use strict';
        stop_time_idle();

        $rootScope.full_screen = true;
        $rootScope.doingResolve = false;
        var getRemember = CookieStore.get('remember');
        if (getRemember === true) {
            $scope.login = {
                username: CookieStore.get('email'),
                remember_username: true
            };
        }

        $scope.loginMe = function (username, password, remmember) {

            if(!$scope.login) {
                $scope.login = {};
            }

            $scope.login.working = true;

            var auth = base64_encode(globalConfig.client_id + ':' + globalConfig.client_secret);
            var grant_type = encodeURIComponent(globalConfig.grant_type);
            var uri = auth_url + 'oauth2/token';
            var send = {
                grant_type: grant_type,
                username: username,
                password: password,
                scope: 'offline_access'
            };

            $http.post(uri, $.param(send), {
                headers: {
                    'Authorization': 'Basic ' + auth
                }
            })
                .success(function (response) {
                    if(response.success === false){
                        var errorMessage = locale.getString('general.wrong_email_password');
                        showError(errorMessage,1);
                    }
                    $http.get(api_url + 'organizations', {
                        headers: {
                            'Authorization': 'Bearer ' + response.access_token
                        }
                    })
                        .success(function (responseClient) {
                            $rootScope.show_footer = true;
                            var get_hosting_name = $location.host();
                            var grand_access = false;
                            var get_id = false;
                            var get_redirect_url = false;
                            var organization_name = '';


                            if (responseClient.success === true && responseClient.total > 0) {
                                $rootScope.organization_name = responseClient.data[0].name;
                                localStorage.setItem('organization_name',responseClient.data[0].name);
                                for (var i = 0; i < responseClient.total; i++) {
                                    if (__i || get_hosting_name === responseClient.data[i].url) {
                                        grand_access = true;
                                        get_id = responseClient.data[i]._id;
                                        get_redirect_url = responseClient.data[i].url;
                                        var myEl = angular.element(document.querySelector('body'));
                                        myEl.addClass('cbp-spmenu-push');
                                        organization_name = responseClient.data[i].name;
                                    }
                                }
                            }
                            if (grand_access) {
                                $http.get(api_url + get_id + '/users', {
                                    headers: {
                                        'Authorization': 'Bearer ' + response.access_token
                                    }
                                })
                                    .success(function (responseUser) {

                                        if (responseUser.success === true && responseUser.total > 0) {
                                            $rootScope.doingResolve = false;
                                            $(".login-form").hide();
                                            var find = false;
                                            var data = responseUser.data;
                                            var id = false;
                                            var complete_name = '';
                                            var role = 'case-worker-restricted';
                                            for (var i = 0; i < responseUser.total; i++) {
                                                if (data[i].email === send.username) {
                                                    id = data[i]._id;
                                                    if (typeof data[i].first_name !== 'undefined' && data[i].first_name) {
                                                        complete_name += data[i].first_name + ' ';
                                                    }
                                                    if (typeof data[i].last_name !== 'undefined' && data[i].last_name) {
                                                        complete_name += data[i].last_name;
                                                    }

                                                    role = data[i].role;

                                                    if (role === 'admin') {
                                                        $rootScope.users_link = true;
                                                        $rootScope.reports_link = true;
                                                        $rootScope.tags_link = true;
                                                        userStatus = "";
                                                    } else {
                                                        $rootScope.users_link = false;
                                                        $rootScope.reports_link = false;
                                                        $rootScope.tags_link = false;
                                                        userStatus = "?assign=true";
                                                    }
                                                    $rootScope.completeName = complete_name;
                                                    find = true;
                                                }
                                            }

                                            if (find) {
                                                CookieStore.setData(response.access_token, response.refresh_token, get_id, get_redirect_url, id, send.username, complete_name, role, organization_name, response.expires_in);
                                                global_redirect_url = get_redirect_url;

                                                if (typeof remmember !== 'undefined' && remmember === true) {
                                                    CookieStore.put_remember(true);
                                                } else {
                                                    CookieStore.put_remember(false);
                                                }


                                            }else{
                                                showError("Your account is not active",2);
                                                $scope.login.working = false;
                                            }
                                            start_time_idle();
                                            if('intended_url' in localStorage && localStorage.getItem('intended_url')!==''){
                                                $location.path(localStorage.getItem('intended_url'));
                                                $rootScope.sidebarButtonOpen = false;
                                            }else {
                                                $location.path('/');
                                            }

                                        } else {
                                            $(".login-form").show();
                                            showError(response.error.message, 1);
                                        }
                                        //$rootScope.doingResolve = false;

                                    })
                                    .error(function (responseUser) {
                                        showError(responseUser, 1);
                                        $scope.login.working = false;

                                    });

                            } else {
                                showError($rootScope.lang.you_dont_have_any_permission_page, 1);
                                $scope.login.working = false;
                            }

                        })
                        .error(function (responseClient) {
                            //$rollbar.error(responseClient);
                            //showError("Server error", 1);
                            $scope.login.working = false;

                        });

                })
                .error(function (response) {
                    //showError("Server error", 1);
                    $scope.login.working = false;
                });

        };

        $scope.forgotPassword = function (user) {

            if (user) {
                user.redirect_url = window.location.origin;
                $scope.working = true;
                $http.post(auth_url + '/user/send/forgotpassword', $.param(user), {
                    headers: {
                        'Authorization': 'Bearer ' + AuthenticationService.token
                    }
                })
                    .success(function (response) {
                        showError(locale.getString('general.reset_password'),2);
                        $scope.working = false;

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


    }
]);