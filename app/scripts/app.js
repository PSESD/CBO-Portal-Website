(function() {
  'use strict';

  angular
    .module('sslv2App', [
      'ui.router',
      'ui.bootstrap'
    ])
    .factory('headerInjector', [function() {
      'use strict';
      var headerInjector = {
        request: function(config) {
          config.headers['X-Cbo-Client-Url'] = 'http://helpinghand.cbo.upward.st';
          return config;
        }
      };
      return headerInjector;
    }])
    .config(configFunction)
    .run(runFunction);

  configFunction.$inject = ['$httpProvider','$urlRouterProvider'];

  function configFunction($httpProvider,$urlRouterProvider) {

    $urlRouterProvider.otherwise("/login");
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.get = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.common.Accept = '*/*';
    $httpProvider.interceptors.push('headerInjector');
    $httpProvider.defaults.timeout = 15000;

  }

  runFunction.$inject = ['$rootScope', '$state', 'RESOURCES'];

  function runFunction($rootScope, $state, RESOURCES) {

    $rootScope.$on('$stateChangeError',
      function(event, toState, toParams, fromState, fromParams, error) {

        if (error === "AUTH_REQUIRED") {
          $state.go('login');
        }

      });

    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams, options) {

        $rootScope.currentURL = toState.name + '-page';
        var isLoggedIn = false;
        if (!isLoggedIn && pathIsProtected(toState.url)) {
          event.preventDefault();
          $state.go('login', {}, {reload: true});

        }

      });

    function pathIsProtected(path) {
      return RESOURCES.PROTECTED_PATHS.indexOf(path) !== -1;
    }

  }



})();