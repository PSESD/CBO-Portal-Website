(function() {
  'use strict';

  angular.module('sslv2App')
    .controller('ForgotCtrl', ForgotCtrl);

  ForgotCtrl.$inject = ['$state','$sce'];

  function ForgotCtrl($state,$sce) {

    var vm = this;

    vm.help = {
      templateUrl: 'templates/help.html'
    };

    vm.user = {
      email: '',
    }

    vm.message = false;

    vm.reset = reset;

    function reset(user) {

      console.log(user);

    }

  }

})();