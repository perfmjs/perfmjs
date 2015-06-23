//import {Component, View, bootstrap, For, If, Injectable} from 'angular2/angular2';
//import {reflector} from 'angular2/src/reflection/reflection';
//import {ReflectionCapabilities} from 'angular2/src/reflection/reflection_capabilities';
//import { RouteConfigAnnotation as RouteConfig, Router, RouterOutlet, RouterLink, routerInjectables } from 'angular2/router';
//import { RootRouter } from 'angular2/src/router/router';
//import { Pipeline } from 'angular2/src/router/pipeline';
//import { bind } from 'angular2/di';
if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
if (typeof __metadata !== "function") __metadata = function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var reflection_1 = require('angular2/src/reflection/reflection');
var reflection_capabilities_1 = require('angular2/src/reflection/reflection_capabilities');
var angular2_1 = require('angular2/angular2');
var router_1 = require('angular2/router');
var zippy_1 = require('zippy');
var DisplayComponent = (function () {
    function DisplayComponent() {
        this.myName = 'AICAI';
        this.names = ["Aarav1", "Martin1", "Shannon1", "Ariana1", "Kai33"];
    }
    DisplayComponent.prototype.myControllerMethod = function (inputStr) {
        alert('call myControllerMethod:' + inputStr);
    };
    DisplayComponent = __decorate([
        angular2_1.Component({
            selector: 'display'
        }),
        angular2_1.View({
            templateUrl: '../templates/app.html',
            directives: [angular2_1.For, angular2_1.If, zippy_1.Zippy]
        }), 
        __metadata('design:paramtypes', [])
    ], DisplayComponent);
    return DisplayComponent;
})();
//@RouteConfig([
//    { path: '/index', component: Start }
//])
var FriendsService = (function () {
    function FriendsService() {
        this.names = ["Aarav1", "Martin1", "Shannon1", "Ariana1", "Kai33"];
    }
    return FriendsService;
})();
reflection_1.reflector.reflectionCapabilities = new reflection_capabilities_1.ReflectionCapabilities();
angular2_1.bootstrap(DisplayComponent, [
    router_1.routerInjectables
]);
