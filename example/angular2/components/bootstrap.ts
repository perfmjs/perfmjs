import {reflector} from 'angular2/src/reflection/reflection';
import {ReflectionCapabilities} from 'angular2/src/reflection/reflection_capabilities';
import {bootstrap} from 'angular2/angular2';

import {RouterApp} from './routerApp';


// read more here: https://angular.io/docs/js/latest/api/core/bootstrap-function.html
reflector.reflectionCapabilities = new ReflectionCapabilities();
bootstrap(RouterApp);