(function () {
  'use strict'
  angular.module('sslv2App')
    .service('CookieService', CookieService);

  CookieService.$inject = ['$cookies'];

  function CookieService ($cookies) {
    var service = {
      set:set
    };

    return service;

    function set(profile){
        $cookies.putObject(profile.id,profile);
    }
  }
})()
