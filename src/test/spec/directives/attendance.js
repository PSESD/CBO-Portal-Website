'use strict';

describe('Directive: attendance', function () {

  // load the directive's module
  beforeEach(module('CboPortal'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<attendance></attendance>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the attendance directive');
  }));
});
