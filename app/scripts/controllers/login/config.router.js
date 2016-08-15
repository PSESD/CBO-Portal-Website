(function() {
  'use strict';

  angular
    .module('sslv2App')
    .config(configFunction);

  configFunction.$inject = ['$stateProvider'];

  function configFunction($stateProvider) {

    $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: "views/login.html",
      controller:'LoginCtrl',
      controllerAs:'vm'
    });

  }

})();