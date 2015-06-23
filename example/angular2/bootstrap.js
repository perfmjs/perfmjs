var reflection_1 = require('angular2/src/reflection/reflection');
var reflection_capabilities_1 = require('angular2/src/reflection/reflection_capabilities');
var angular2_1 = require('angular2/angular2');
// Angular2 Router Injectables https://github.com/angular/angular/blob/f999d5a1566d3b830fd1a23ed554cbed4e1215e8/modules/angular2/router.ts
var router_1 = require('angular2/router');
var FriendService_1 = require('./services/FriendService');
var routerApp_1 = require('./components/routerApp');
// Second parameter provides a set of additional bindings 
// that will be used by Component (in our case application)
// read more here: https://angular.io/docs/js/latest/api/core/bootstrap-function.html
reflection_1.reflector.reflectionCapabilities = new reflection_capabilities_1.ReflectionCapabilities();
angular2_1.bootstrap(routerApp_1.RouterApp, [router_1.routerInjectables, FriendService_1.FriendService]);
