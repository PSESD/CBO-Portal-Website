'use strict';

describe('Controller: StyleguideCtrl', function () {

  // load the controller's module
  beforeEach(module('sslv2App'));

  var StyleguideCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StyleguideCtrl = $controller('StyleguideCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(StyleguideCtrl.awesomeThings.length).toBe(3);
  });
});
