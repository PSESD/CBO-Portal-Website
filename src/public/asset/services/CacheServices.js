app.factory('StudentCache',function($cacheFactory){
    'use script';
    return $cacheFactory('StudentCache',{
       capacity:1000
    });
});