(function() {
  'use strict';

  angular
    .module('sslv2App')
    .config(configFunction);

  configFunction.$inject = ['$stateProvider'];

  function configFunction($stateProvider) {

    $stateProvider
    .state('forgot', {
      url: "/forgot",
      templateUrl: "views/forgot.html",
      controller:'ForgotCtrl',
      controllerAs:'vm'
    });

  }

})();