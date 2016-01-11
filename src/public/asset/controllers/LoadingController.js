
app.controller('LoadingController', ['$timeout','$location',
    function ($timeout,$location) {
        'use strict';
        $timeout(function() {
            showError('The operation could not be completed due to a timeout', 1);
            $location.path('/student');

        }, 15000);

    }


]);