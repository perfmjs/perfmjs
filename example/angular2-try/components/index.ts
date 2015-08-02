import {routerInjectables, LocationStrategy, HashLocationStrategy, HTML5LocationStrategy} from 'angular2/router';
import {bootstrap} from 'angular2/angular2';
import {bind} from 'angular2/di';

import {App} from './app';
import {CommonService} from '../services/common.service';

bootstrap(App, [
    routerInjectables,
    CommonService,
    bind(LocationStrategy).toClass(HTML5LocationStrategy)
]);