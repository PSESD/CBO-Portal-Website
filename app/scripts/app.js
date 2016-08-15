(function() {
  'use strict';

  angular
    .module('sslv2App', [
      'ui.router',
      'ui.bootstrap'
    ])
    .config(configFunction)
    .run(runFunction);

  configFunction.$inject = ['$urlRouterProvider'];

  function configFunction($urlRouterProvider) {

    $urlRouterProvider.otherwise("/login");

  }

  runFunction.$inject = ['$rootScope', '$state','PROTECTED_PATHS'];

  function runFunction($rootScope, $state,PROTECTED_PATHS) {

    $rootScope.$on('$stateChangeError',
      function(event, toState, toParams, fromState, fromParams, error) {

        if (error === "AUTH_REQUIRED") {
          $state.go('login');
        }

      });

      $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams, options){

        $rootScope.currentURL = toState.name +'-page';

        if(pathIsProtected(toState.url)){

          $state.go('login')

        }

      });

      function pathIsProtected(path) {
      return PROTECTED_PATHS.indexOf(path) !== -1;
    }

  }

  

})();