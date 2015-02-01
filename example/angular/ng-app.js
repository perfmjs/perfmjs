define('ng-app', function (require) {
    'use strict';
    var angular = require('angular');
    var ngRoute = require('angular-route');
    var ngServices = require('ng-service');
    var ngDirectives = require('ng-directive');
    var ngControllers = require('ng-controller');
    var ngDirectiveMoney = require('ng-directive-money');
    var ngDirectiveLogin = require('ng-directive-login');
    var ngInfiniteScroll = require('ng-infinite-scroll');
    var ngApp = angular.module('ngApp', ['ngRoute']);
    ngServices(ngApp);
    ngDirectives(ngApp);
    ngControllers(ngApp);
    ngDirectiveMoney(ngApp);
    ngDirectiveLogin(ngApp);
    ngInfiniteScroll(ngApp);

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