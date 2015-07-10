var reflection_1 = require('angular2/src/reflection/reflection');
var reflection_capabilities_1 = require('angular2/src/reflection/reflection_capabilities');
var router_1 = require('angular2/router');
var angular2_1 = require('angular2/angular2');
var common_service_1 = require('../services/common-service');
var app_1 = require('./app');
reflection_1.reflector.reflectionCapabilities = new reflection_capabilities_1.ReflectionCapabilities();
angular2_1.bootstrap(app_1.App, [router_1.routerInjectables, common_service_1.CommonService]);
