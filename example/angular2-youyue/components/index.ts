import {routerInjectables} from 'angular2/router';
import {bootstrap} from 'angular2/angular2';
import {bind} from 'angular2/di';

import {CommonService} from '../services/common-service';
import {App} from './app';

bootstrap(App, [routerInjectables, CommonService]);