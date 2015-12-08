app.factory('AuthenticationService', function () {
    var auth = {
        isAuthenticated: false,
        token: null,
        refresh_token: null,
        organization_id: null,
        redirect_url: null,
        user_id: null,
        email: null,
        name: null,
        role: null,
        keep_email: false
    };

    return auth;

});

app.factory('CookieStore', function ($rootScope, $http, $window, $cookieStore, $location, AuthenticationService) {
    var prefix = 'cboAdmin_cookie_';
    var expire_in = null;
    return {
        /**
         *
         * @param name
         * @param value
         */
        put: function (name, value) {
//            console.log('SET COOKIE: ', prefix + name, value, expire_in);
            $cookieStore.put(prefix + name, value);
        },
        /**
         *
         * @param name
         * @returns {*|Object}
         */
        get: function (name) {
            return $cookieStore.get(prefix+name);
        },
        /**
         *
         * @param name
         * @returns {boolean}
         */
        has: function(name){
            return angular.isDefined($cookieStore.get(prefix+name));
        },
        /**
         *
         * @param value
         */
        put_remember: function (value) {
            $cookieStore.put('remember', value);
        },
        /**
         *
         * @param name
         */
        remove: function (name) {
            $cookieStore.remove(prefix+name);
        },
        /**
         *
         * @param token
         * @param refresh_token
         * @param organization_id
         * @param redirect_url
         * @param user_id
         * @param email
         * @param name
         * @param role
         * @param organization_name
         * @param expirein
         */
        setData: function (token, refresh_token, organization_id, redirect_url, user_id, email, name, role, organization_name, expirein) {
            if(expirein) expire_in = expirein;
            this.put('token', token, expirein);
            this.put('refresh_token', refresh_token);

            AuthenticationService.isAuthenticated = true;
            AuthenticationService.token = token;
            AuthenticationService.refresh_token = refresh_token;
            AuthenticationService.organization_id = organization_id;
            AuthenticationService.redirect_url = redirect_url;
            AuthenticationService.user_id = user_id;
            AuthenticationService.email = email;
            AuthenticationService.name = name;
            AuthenticationService.role = role;
            AuthenticationService.organization_name = organization_name;
            $rootScope.showNavBar = true;
            $rootScope.completeName = AuthenticationService.name;

        },
        getData: function () {
            var me = this;
            if (this.has('token') && this.get('token')) {

                var token = this.get('token');
                var refresh_token = this.get('refresh_token');
                var last_url = $location.url();

                $http.get(api_url + 'user', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                    .success(function (response) {

                        $http.get(api_url + 'organizations', {
                            headers: {
                                'Authorization': 'Bearer ' + token
                            }
                        })
                            .success(function (responseClient) {

                                var get_hosting_name = $location.host();
                                var grand_access = false;
                                var get_id = false;
                                var get_redirect_url = false;
                                var organization_name = '';

                                if (responseClient.success == true && responseClient.total > 0) {
                                    $rootScope.organization_name = responseClient.data.name;
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
                                            'Authorization': 'Bearer ' + token
                                        }
                                    })
                                        .success(function (responseUser) {
                                            if (responseUser.success == true && responseUser.total > 0) {
                                                var find = false;
                                                var data = responseUser.data;
                                                var id = false;
                                                var complete_name = '';
                                                var role = 'case-worker-restricted';
                                                for (var i = 0; i < responseUser.total; i++) {
                                                    if (data[i].email == response.email) {
                                                        id = data[i]._id;
                                                        if (typeof data[i].first_name !== 'undefined' && data[i].first_name) {
                                                            complete_name += data[i].first_name + ' ';
                                                        }
                                                        if (typeof data[i].last_name !== 'undefined' && data[i].last_name) {
                                                            complete_name += data[i].last_name;
                                                        }

                                                        role = data[i].role;

                                                        if (role == 'admin') {
                                                            $rootScope.users_link = true;
                                                            $rootScope.tags_link = true;
                                                        } else {
                                                            $rootScope.users_link = false;
                                                            $rootScope.tags_link = false;
                                                        }
                                                        $rootScope.completeName = complete_name;
                                                        find = true;
                                                    }
                                                }
                                                if (find) {

                                                    global_redirect_url = get_redirect_url;

                                                    AuthenticationService.isAuthenticated = true;
                                                    AuthenticationService.token = token;
                                                    AuthenticationService.refresh_token = refresh_token;
                                                    AuthenticationService.organization_id = get_id;
                                                    AuthenticationService.redirect_url = get_redirect_url;
                                                    AuthenticationService.user_id = id;
                                                    AuthenticationService.email = response.email;
                                                    AuthenticationService.name = complete_name;
                                                    AuthenticationService.role = role;
                                                    AuthenticationService.organization_name = organization_name;

                                                    $rootScope.showNavBar = true;
                                                    $rootScope.completeName = AuthenticationService.name;

                                                    $location.path(last_url);

                                                    return true;

                                                }
                                                else
                                                {
                                                    $location.path('/login');
                                                    return false;
                                                }

                                            }
                                            else
                                            {
                                                $location.path('/login');
                                                return false;
                                            }

                                        })
                                        .error(function () {
                                            $location.path('/login');
                                            return false;
                                        });

                                }
                                else
                                {
                                    $location.path('/login');
                                    return false;
                                }

                            })
                            .error(function () {

                                AuthenticationService.email = null;
                                AuthenticationService.isAuthenticated = false;
                                AuthenticationService.token = null;
                                AuthenticationService.refresh_token = null;
                                AuthenticationService.organization_id = null;
                                AuthenticationService.redirect_url = null;
                                AuthenticationService.user_id = null;
                                AuthenticationService.name = null;
                                AuthenticationService.role = null;
                                $rootScope.showNavBar = false;
                                $rootScope.completeName = false;
                                $location.path('/login');
                                return false;

                            });

                    })
                    .error(function () {

                        AuthenticationService.email = null;
                        AuthenticationService.isAuthenticated = false;
                        AuthenticationService.token = null;
                        AuthenticationService.refresh_token = null;
                        AuthenticationService.organization_id = null;
                        AuthenticationService.redirect_url = null;
                        AuthenticationService.user_id = null;
                        AuthenticationService.name = null;
                        AuthenticationService.role = null;
                        $rootScope.showNavBar = false;
                        $rootScope.completeName = false;
                        $location.path('/login');
                        return false;

                    });


            } else {

                AuthenticationService.email = null;
                AuthenticationService.isAuthenticated = false;
                AuthenticationService.token = null;
                AuthenticationService.refresh_token = null;
                AuthenticationService.organization_id = null;
                AuthenticationService.redirect_url = null;
                AuthenticationService.user_id = null;
                AuthenticationService.name = null;
                AuthenticationService.role = null;
                $rootScope.showNavBar = false;
                $rootScope.completeName = false;
                $location.path('/login');
                return false;
            }
        },
        checkCookie: function () {
            if (this.has('token') && this.get('token')) {
                return true;
            }
            else
            {
                return false;
            }
        },
        clearData: function () {

            var remember = this.get('remember');
            if (remember == true) {

            } else {
                this.remove('email');
                AuthenticationService.email = null;
            }

            this.remove('token');
            this.remove('refresh_token');

            AuthenticationService.isAuthenticated = false;
            AuthenticationService.token = null;
            AuthenticationService.refresh_token = null;
            AuthenticationService.organization_id = null;
            AuthenticationService.redirect_url = null;
            AuthenticationService.user_id = null;
            AuthenticationService.name = null;
            AuthenticationService.role = null;
            $rootScope.showNavBar = false;
            $rootScope.completeName = false;

            stop_time_idle();

            return true;
        }
    };
});

app.factory('myGoogleAnalytics', [
    '$rootScope', '$window', '$location',
    function ($rootScope, $window, $location) {

        var myGoogleAnalytics = {};

        /**
         * Set the page to the current location path
         * and then send a pageview to log path change.
         */
        myGoogleAnalytics.sendPageview = function () {
            if ($window.ga) {
                $window.ga('set', 'page', $location.path());
                $window.ga('send', 'pageview');
            }
        };

        // subscribe to events
        $rootScope.$on('$viewContentLoaded', myGoogleAnalytics.sendPageview);

        return myGoogleAnalytics;
    }
]);