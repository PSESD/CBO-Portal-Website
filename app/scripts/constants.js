(function(){
     angular
    .module('sslv2App')
    .constant('RESOURCES', {
        'PROTECTED_PATHS':['/dashboard'],
        'CLIENT_ID':'cbo_client_demo',
        'CLIENT_SECRET':'7e98a24f4fe91535348f6e87cde866dca9134b50fc029abefdc7278369f2',
        'AUTH_URL':'https://auth.cbo.upward.st/api/',
        'API_URL':'https://api.cbo.upward.st/',
        'RESPONSE_TYPE':'code',
        'GRANT_TYPE':'password',
        'ENV':'http://helpinghand.cbo.upward.st'
    });
})();