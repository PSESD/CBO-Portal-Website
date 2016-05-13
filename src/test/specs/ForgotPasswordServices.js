describe("ForgotPasswordService Unit Tests", function() {
    var AuthenticationService,
        auth_url,
        $httpBackend,
        forgotPasswordHandler,
        auth_url,
        user;

    beforeEach(module('CboPortal'));

    beforeEach(inject(function($injector) {
        AuthenticationService = {
            token:null
        };
        user = {
          email:"ridwan@upwardstech"
        };
        auth_url = "https://auth.cbo.upward.st/api/";
        $httpBackend = $injector.get('$httpBackend');


    }));

    it('should send return 200', function() {
        $httpBackend.expectPOST(auth_url+'/user/send/forgotpassword', undefined, function(headers) {
            return headers['X-Frame-Options'] == '';
        }).respond(500,'');

    });

});
