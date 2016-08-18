(function () {
  'use strict'

  angular.module('sslv2App')
    .service('LoginService', LoginService)

  LoginService.$inject = ['$http', 'RESOURCES']

  function LoginService ($http, RESOURCES) {
    var service = {
      authenticate: authenticate,
      getOrganization: getOrganization,
      getUsers: getUsers
    }

    return service

    function authenticate (credentials, key) {
      return $http.post(RESOURCES.AUTH_URL + 'oauth2/token', $.param(credentials), {
        headers: {
          'Authorization': 'Basic ' + key
        }
      });
      
    }

    function getOrganization (access_token) {
     return $http.get(RESOURCES.API_URL + 'organizations', {
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      });
    }

    function getUsers (id, access_token) {
      return $http.get(RESOURCES.API_URL + id + '/users', {
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      })
    }
  }
})();
