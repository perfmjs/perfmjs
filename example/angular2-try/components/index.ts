import {reflector} from 'angular2/src/reflection/reflection';
import {ReflectionCapabilities} from 'angular2/src/reflection/reflection_capabilities';
import {routerInjectables} from 'angular2/router';
import {bootstrap} from 'angular2/angular2';

import {CommonService} from '../services/common-service';
import {App} from './app';

reflector.reflectionCapabilities = new ReflectionCapabilities();
bootstrap(App, [routerInjectables, CommonService]);