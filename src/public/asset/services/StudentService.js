app.factory('StudentService',function($http,$q,AuthenticationService){
    return{
        getAll:function(){
            return $http.get(api_url + AuthenticationService.organization_id + '/students', {
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.token
                }
            })
                .then(function(response){
                    if(typeof response.data === 'object'){
                        return response.data;
                    }else{
                        return $q.reject(response.data);
                    }
                },function(response){
                    return $q.reject(response.data);
                });
        }
    };
});
