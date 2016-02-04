app.controller('BodyController', ['$rootScope', '$scope', '$http', '$location', 'CookieStore', 'AuthenticationService',
    function ($rootScope, $scope, $http, $location, CookieStore, AuthenticationService, locale) {
        'use strict';
        $rootScope.sidebarButtonOpen = false;
        var location = window.location.hash;
        if (location.indexOf('login') === -1) {
            $rootScope.show_footer = true;
        }


        $rootScope.full_screen = false;

        if(CookieStore.get('organization_name') !== undefined)
        {
            localStorage.setItem('organization_name',CookieStore.get('organization_name'));
            $rootScope.organization_name = localStorage.getItem("organization_name");
        }

        if (CookieStore.get('role') === 'admin') {
            $rootScope.users_link = true;
            $rootScope.reports_link = true;
            $rootScope.tags_link = true;
        } else {
            $rootScope.users_link = false;
            $rootScope.reports_link = false;
            $rootScope.tags_link = false;
        }
        $scope.isActive = function (route) {

            var route_length = route.length;
            var path = $location.path();
            var new_path = path.substr(0, route_length);
            return route === new_path;

        };


        $scope.logoutMe = function () {
            $rootScope.showFooter = false;
            var logout = {
                token: AuthenticationService.token
            };
            if(angular.isDefined(AuthenticationService.refresh_token)){
                logout.refresh_token = AuthenticationService.refresh_token;
            }
            $('.confidentiality-footer').removeClass('visible-on');
            $http.post(auth_url + 'logout', $.param(logout), {

            })
                .success(function () {
                    showError($rootScope.lang.success_logout, 2);
                    $rootScope.showNavBar = true;
                    CookieStore.clearData();
                    localStorage.setItem('url_intended','');
                    $location.path("/login");
                    console.log("logout");
                })
                .error(function () {

                    var myEl = angular.element(document.querySelector('body'));
                    myEl.removeClass('cbp-spmenu-push');

                    CookieStore.clearData();
                    showError($rootScope.lang.success_logout, 2);
                    $location.path("/login");

                });

        };

        $scope.openSidebar = function(){
            $('#collapse-sidebarmenu').removeClass('glyphicon glyphicon-menu-hamburger');
            $('#collapse-sidebarmenu').addClass('glyphicon glyphicon-remove');
            $('#side-panel').removeClass('hide');
            $('.link-nav').css({
                'display': ''
            });
            $('#border').css({
                'display': ''
            });
            $('#desktop-nav').css({
                'width': '15%'
            });
            $('#desktop-nav').css({
                'position': 'fixed'
            });
            $('#desktop-nav').css({
                'height': '100%'
            });
            $('#collapse-sidebarmenu').removeClass('icon-collapse-menu');
            $('#collapse-sidebarmenu').addClass('icon-sidebarmenu');
            //$('#center-panel').css({
            //    'margin-left': '15%'
            //});
            $('#rootDoc').addClass('center-panel');
            $('#footer').removeClass('hide');
            //$('.confidentiality-footer').css({'margin-left':'15.3%'});
            //$('.version').css({'margin-left':'15.3%'});
            $('#sidebar-open-btn').css({'z-index':'-999'});
        }

        $scope.refreshMe = function () {

            var auth = base64_encode(globalConfig.client_id + ':' + globalConfig.client_secret);
            //var grant_type = encodeURIComponent(globalConfig.grant_type);
            var uri = auth_url + 'oauth2/token';
            var send = {
                grant_type: 'refresh_token',
                refresh_token: AuthenticationService.refresh_token
            };

            $http.post(uri, $.param(send), {
                headers: {
                    'Authorization': 'Basic ' + auth
                }
            })
                .success(function (response) {

                    clearTimeout(session_timeout.warningTimer);

                    CookieStore.put('token', response.access_token);
                    CookieStore.put('refresh_token', response.refresh_token);
                    AuthenticationService.token = response.access_token;
                    AuthenticationService.refresh_token = response.refresh_token;

                })
                .error(function (response) {

                    CookieStore.clearData();
                    showError(response.message, 2);
                    $location.path("/login");

                });

        };

        $rootScope.doingResolve = true;

    }
]);