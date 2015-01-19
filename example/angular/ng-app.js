define('ng-app', ['angular', 'angular-route', 'ngServices', 'ngDirectives', 'ngControllers'], function (angular, ngRoute, ngServices, ngDirectives, ngControllers) {
    'use strict';
    var ngApp = angular.module('ngApp', ['ngRoute']);
    ngServices(ngApp);
    ngDirectives(ngApp);
    ngControllers(ngApp);

    ngApp.config(['$routeProvider','$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider
            .when('/index.html', {
                templateUrl: 'partials/list.html',
                controller: 'ngController1'})
            .when('/list/:id/', {
                templateUrl: 'partials/detail.html',
                controller: 'ngController1'})
            .otherwise({redirectTo: '/index.html'});
        $locationProvider.html5Mode(true);
    }]);

//    app.run(function ($window, auth, user) {
//        auth.setAuthorizationHeaders();
//        user.initialize();
//    });
    angular.bootstrap(document, ['ngApp']);
    return ngApp;
});