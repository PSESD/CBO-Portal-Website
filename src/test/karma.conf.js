// Karma configuration
// Generated on Thu May 12 2016 13:37:42 GMT+0700 (SE Asia Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
		'bower_components/angular/angular.js',
		'bower_components/angulartics/dist/angulartics.min.js',
		'bower_components/angulartics-google-analytics/dist/angulartics-google-analytics.min.js',
		'bower_components/angular-mocks/angular-mocks.js',
		'bower_components/jquery/dist/jquery.min.js',
		'bower_components/angular-ui-mask/dist/mask.min.js',
		'bower_components/angular-rollbar/angular-rollbar.js',
		'bower_components/angular-bootstrap/ui-bootstrap.min.js',
		'bower_components/angular-ui-router/release/angular-ui-router.min.js',
		'bower_components/angular-location-update/angular-location-update.min.js',
		'bower_components/angular-route/angular-route.min.js',
		'bower_components/angular-cookies/angular-cookies.min.js',
		'bower_components/ng-prettyjson/dist/ng-prettyjson.min.js',
		'bower_components/angular-ui-date/dist/date.js',
		'bower_components/angu-fixed-header-table/angu-fixed-header-table.js',
		'bower_components/angular-scrollable-table/angular-scrollable-table.min.js',
		'bower_components/angular-localization/angular-localization.min.js',
		'bower_components/angular-ui-codemirror/ui-codemirror.min.js',
		'bower_components/angular-sanitize/angular-sanitize.min.js',
		'../public/asset/index.js',
		'../public/asset/app.router.js',
		'../public/asset/services/services.js',
		'../public/asset/controllers/LoginController.js',
		'../public/asset/js/autologout.js',
		//'specs/LoginController-spec.js',
		'specs/ForgotPasswordServices.js',
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
