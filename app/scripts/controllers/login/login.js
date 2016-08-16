(function() {
  'use strict';

  angular.module('sslv2App')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$state', '$timeout', 'RESOURCES', '$location','$http'];

  function LoginCtrl($state, $timeout, RESOURCES, $location,$http) {

    var vm = this;

    vm.message = "";

    vm.help = {
      templateUrl: 'templates/help.html'
    };



    vm.user = {
      email: '',
      password: '',
      remember: false
    }

    vm.auth = auth;

    function auth(user) {

      var auth = base64_encode(RESOURCES.CLIENT_ID + ':' + RESOURCES.CLIENT_SECRET);
      var grant_type = encodeURIComponent(RESOURCES.GRANT_TYPE);
      var uri = RESOURCES.AUTH_URL + 'oauth2/token';
      var send = {
        grant_type: grant_type,
        username: user.email,
        password: user.password,
        scope: 'offline_access'
      };

      $http.post(uri, $.param(send), {
          headers: {
            'Authorization': 'Basic ' + auth
          }
        })
        .success(function(response) {
          
          if (response.success === false) {
            if('error' in response){
              if(typeof response.error === 'object'){
                vm.message = response.error.message;
              }else{
                vm.message = response.error;
              }
              return false;
            }
          }
          $http.get(RESOURCES.API_URL + 'organizations', {
              headers: {
                'Authorization': 'Bearer ' + response.access_token
              }
            })
            .success(function(responseClient) {
              var get_hosting_name = $location.host();
              var grand_access = false;
              var get_id = false;
              var get_redirect_url = false;
              var organization_name = '';


              if (responseClient.success === true && responseClient.total > 0) {
                localStorage.setItem('organization_name', responseClient.data[0].name);
                for (var i = 0; i < responseClient.total; i++) {
                  if (RESOURCES.ENV || get_hosting_name === responseClient.data[i].url) {
                    grand_access = true;
                    get_id = responseClient.data[i]._id;
                    get_redirect_url = responseClient.data[i].url;
                    organization_name = responseClient.data[i].name;
                  }
                }
              }
              if (grand_access) {
                $http.get(RESOURCES.API_URL + get_id + '/users', {
                    headers: {
                      'Authorization': 'Bearer ' + response.access_token
                    }
                  })
                  .success(function(responseUser) {

                    if (responseUser.success === true && responseUser.total > 0) {
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
                            // $rootScope.users_link = true;
                            // $rootScope.reports_link = true;
                            // $rootScope.tags_link = true;
                            // userStatus = "";
                          } else {
                            // $rootScope.users_link = false;
                            // $rootScope.reports_link = false;
                            // $rootScope.tags_link = false;
                            // userStatus = "?assign=true";
                          }
                          find = true;
                        }
                      }

                      if (find) {
                        $state.go('dashboard');
                        // CookieStore.setData(response.access_token, response.refresh_token, get_id, get_redirect_url, id, send.username, complete_name, role, organization_name, response.expires_in);
                        // global_redirect_url = get_redirect_url;

                        // if (typeof remmember !== 'undefined' && remmember === true) {
                        //   CookieStore.put_remember(true);
                        // } else {
                        //   CookieStore.put_remember(false);
                        // }


                      } else {
                        vm.message = "Your account is not active";
                        $timeout(function() {
                          vm.message = "";
                        }, 500);
                      }

                      // if ('intended_url' in localStorage && localStorage.getItem('intended_url') !== '') {
                      //   $location.path(localStorage.getItem('intended_url'));
                      // } else {
                      //   $location.path('/');
                      // }

                    } else {
                      $(".login-form").show();
                      showError(response.error.message, 1);
                    }
                  })
                  .error(function(responseUser) {
                    vm.message = responseUser;
                    $timeout(function() {
                      vm.message = "";
                    }, 500);
                  });

              } else {
                 vm.message = "You dont have any permission";
                    $timeout(function() {
                      vm.message = "";
                    }, 500);
              }

            })
            .error(function(responseClient) {

            });

        })
        .error(function(response) {
        });

    }

    function base64_encode(data) {
      var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        enc = '',
        tmp_arr = [];

      if (!data) {
        return data;
      }

      do { // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);

        bits = o1 << 16 | o2 << 8 | o3;

        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;

        // use hexets to index into b64, and append result to encoded string
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
      } while (i < data.length);

      enc = tmp_arr.join('');

      var r = data.length % 3;

      return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
    }

  }



})();