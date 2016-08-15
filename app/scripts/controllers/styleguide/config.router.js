(function() {
  'use strict';

  angular
    .module('sslv2App')
    .config(configFunction);

  configFunction.$inject = ['$stateProvider'];

  function configFunction($stateProvider) {

    $stateProvider
    .state('styleguide', {
      url: "/styleguide",
      templateUrl: "views/styleguide.html",
      controller:'StyleguideCtrl',
      controllerAs:'vm'
    });

  }

})();