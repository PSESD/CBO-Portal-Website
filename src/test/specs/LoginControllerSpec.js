describe("Login Controller Unit Testing", function() {

    beforeEach(angular.mock.module('CboPortal'));

    var $controller,
        rootScope,
        httpBackend,
        http,
        auth;

    beforeEach(angular.mock.inject(function(_$controller_,$rootScope,$http,$httpBackend,_AuthenticationService_){
        $controller = _$controller_;
        rootScope = $rootScope;
        http = $http;
        httpBackend = $httpBackend;
        auth = _AuthenticationService_;
    }));

    describe('User Login', function () {
        it('Should return object', function () {
            var $scope = {};
            var controller = $controller('LoginController', { $scope: $scope });

            $scope.loginMe("demo@upwardstech.com","demo",true);

        });
    });

    describe('User Forgot Password',function(){

        it('Should return success false',function(){

            var data ={
                email:"ridwan@upwardstech.com"
            };

            //httpBackend.whenRoute('POST', auth_url + '/user/send/forgotpassword',data,{
            //    'Authorization': 'Bearer ' + auth.token
            //    })
            //    .respond(function(method, url, data, headers, params) {
            //       expect(data.success).toBe(true);
            //    });
            httpBackend.expectPOST(auth_url + '/user/send/forgotpassword',data,function(header){
            }).respond(200,'');

        });

    });

});
