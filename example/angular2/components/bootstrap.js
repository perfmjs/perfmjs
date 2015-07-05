var reflection_1 = require('angular2/src/reflection/reflection');
var reflection_capabilities_1 = require('angular2/src/reflection/reflection_capabilities');
var angular2_1 = require('angular2/angular2');
var routerApp_1 = require('./routerApp');
// read more here: https://angular.io/docs/js/latest/api/core/bootstrap-function.html
reflection_1.reflector.reflectionCapabilities = new reflection_capabilities_1.ReflectionCapabilities();
angular2_1.bootstrap(routerApp_1.RouterApp);
