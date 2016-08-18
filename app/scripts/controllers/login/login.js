;
(function() {
  'use strict'

  angular.module('sslv2App')
    .controller('LoginCtrl', LoginCtrl)

  LoginCtrl.$inject = ['$state', '$timeout', 'RESOURCES', '$location', '$http', 'GeneralService', 'LoginService','CookieService']

  function LoginCtrl($state, $timeout, RESOURCES, $location, $http, GeneralService, LoginService,CookieService) {
    var vm = this

    vm.message = ''

    vm.help = {
      templateUrl: 'templates/help.html'
    }

    vm.user = {
      email: '',
      password: '',
      remember: false
    }

    vm.auth = auth

    function auth(user) {
      var host_name = $location.host()
      var profile = {
        full_name: '',
        access: false,
        id: false,
        redirect_url: false,
        role: 'case-worker-restricted',
        organization_name: '',
        exists: false,
        access_token:''
      }
      var key = GeneralService.base64Encode(RESOURCES.CLIENT_ID + ':' + RESOURCES.CLIENT_SECRET)
      var grant_type = encodeURIComponent(RESOURCES.GRANT_TYPE)
      var uri = RESOURCES.AUTH_URL + 'oauth2/token'
      var credentials = {
        grant_type: grant_type,
        username: user.email,
        password: user.password,
        scope: 'offline_access'
      }

      LoginService.authenticate(credentials, key)
        .then(function(response) {
          if ('access_token' in response.data) {
            profile.access_token = response.data.access_token;
            LoginService.getOrganization(profile.access_token)
              .then(function(response) {
                if (response.data.success && response.data.total > 0) {
                  for (var i = 0; i < response.data.total; i++) {
                    if (RESOURCES.ENV || host_name === response.data.data[i].url) {
                      profile.access = true
                      profile.id = response.data.data[i]._id
                      profile.redirect_url = response.data.data[i].url
                      profile.organization_name = response.data.data[i].name
                    }
                  }
                  localStorage.setItem('organization_name', profile.organization_name);
                  if (profile.access) {
                    LoginService.getUsers(profile.id, profile.access_token)
                      .then(function(response) {
                        if (response.data.success && response.data.total > 0) {
                          for (var i = 0; i < response.data.total; i++) {
                            if (response.data.data[i].email === credentials.username) {
                              profile.exists = true;
                              profile.id = response.data.data[i].id;
                              profile.role = response.data.data[i].role;
                              if (typeof response.data.data[i].first_name !== 'undefined' && response.data.data[i].first_name) {
                                profile.full_name += response.data.data[i].first_name + ' '
                              }
                              if (typeof response.data.data[i].last_name !== 'undefined' && response.data.data[i].last_name) {
                                profile.full_name += response.data.data[i].last_name
                              }
                              
                            }
                          }
                          if(profile.exists){
                            sessionStorage.setItem('id',profile.id);
                            CookieService.set(profile);
                            $state.go('dashboard');
                          }else{
                            vm.message = 'Your account is not active';
                          }
                        } else {

                        }
                      }, function(error) {

                      })
                  } else {

                  }
                } else {

                }
              }, function(error) {

              })
          } else {
            if ('error' in response.data) {
              if (typeof response.data.error === 'object') {
                vm.message = response.data.error.message;
              } else {
                vm.message = response.data.error;
              }
            }
          }

        }, function(error) {

        })
        /*
              if (auth_result.success) {
                get_org_result = LoginService.getOrganization(auth_result.access_token)

                if (get_org_result.success && get_org_result.total > 0) {
                  for (var i = 0; i < get_org_result.total; i++) {
                    if (RESOURCES.ENV || host_name === get_org_result.data[i].url) {
                      profile.access = true
                      profile.id = get_org_result.data[i]._id
                      profile.redirect_url = get_org_result.data[i].url
                      profile.organization_name = get_org_result.data[i].name
                    }
                  }
                  localStorage.setItem('organization_name', profile.organization_name)
                  if (profile.access) {
                    get_user_result = LoginService.getUsers(profile.id, auth_result.access_token)
                    if (get_user_result.success && get_user_result.total > 0) {
                      for(var i=0;i<get_user_result.total;i++){
                        if(get_user_result.data[i] === credentials.username){
                          profile.exists = true;
                          profile.id = get_user_result.data[i].id;
                          profile.role = get_user_result.data[i].role;
                           if (typeof get_user_result.data[i].first_name !== 'undefined' && get_user_result.data[i].first_name) {
                                    profile.full_name += get_user_result.data[i].first_name + ' '
                                  }
                                  if (typeof get_user_result.data[i].last_name !== 'undefined' && get_user_result.data[i].last_name) {
                                    profile.full_name += get_user_result.data[i].last_name
                                  }
                                 
                        }
                      }
                      if(profile.exists){
                        console.log(profile);
                      }else{
                    vm.message = 'Your account was not active';    
                      }
                    }else {
                      if ('error' in get_org_result && typeof get_org_result.error === 'object') {
                        vm.message = get_org_result.error.message
                      }
                      vm.message = get_org_result.error
                    }
                  }else {
                    vm.message = 'Your account was not active'
                  }
                }else {
                  if ('error' in get_org_result && typeof get_org_result.error === 'object') {
                    vm.message = get_org_result.error.message
                  }
                  vm.message = get_org_result.error
                }
              }else {
                if ('error' in auth_result && typeof auth_result.error === 'object') {
                  vm.message = auth_result.error.message
                }
                vm.message = auth_result.error
              }
              */
    }
  }
})()