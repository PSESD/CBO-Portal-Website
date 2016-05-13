describe("AuthenticationService Unit Tests", function() {
	
  var AuthenticationService,
      CookieStore,
      $rootScope,
	  $scope,
	  controller,
      httpBackend,
      http;
  var auth_url = "https://auth.cbo.upward.st/api/";
  beforeEach(function() {
    module('CboPortal');

	inject(function($injector){
		$rootScope = $injector.get('$rootScope');
		$scope = $rootScope.$new();
		controller = $injector.get('$controller')("LoginController",{$scope:$scope});
	});

  });


  beforeEach(inject(function (_AuthenticationService_,_CookieStore_,$httpBackend,$http) {
	AuthenticationService = _AuthenticationService_;
	CookieStore = _CookieStore_;
    httpBackend = $httpBackend;
    http = $http;
  }));

  it('should have AuthenticationService service be defined', function () {
    expect(AuthenticationService).toBeDefined();
  });
  
  it('should have CookieStore service be defined', function () {
    expect(CookieStore).toBeDefined();
  });

  var user = {
    email:"ridwan@upwardstech.com"
  };

  AuthenticationService = {
    token:null
  };
  $http.post(auth_url + '/user/send/forgotpassword', $.param(user), {
    headers: {
      'Authorization': 'Bearer ' + AuthenticationService.token
    }
  })
      .success(function (response) {

      })

});