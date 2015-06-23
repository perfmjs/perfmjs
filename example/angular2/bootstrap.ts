import {reflector} from 'angular2/src/reflection/reflection';
import {ReflectionCapabilities} from 'angular2/src/reflection/reflection_capabilities';
import {bootstrap} from 'angular2/angular2';
// Angular2 Router Injectables https://github.com/angular/angular/blob/f999d5a1566d3b830fd1a23ed554cbed4e1215e8/modules/angular2/router.ts
import {routerInjectables} from 'angular2/router';

import {FriendService} from './services/FriendService';
import {RouterApp} from './components/routerApp';

// Second parameter provides a set of additional bindings 
// that will be used by Component (in our case application)
// read more here: https://angular.io/docs/js/latest/api/core/bootstrap-function.html
reflector.reflectionCapabilities = new ReflectionCapabilities();
bootstrap(RouterApp, [routerInjectables, FriendService]);