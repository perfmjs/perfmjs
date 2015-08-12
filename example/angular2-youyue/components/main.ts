import {Component, View} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {RouteConfig, Router, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';

import {CommonService} from '../services/common-service';
import {MainHeader, MainFooter, MainRight} from './common';

@Component({
    selector: 'main'
})
@View({
    templateUrl: 'templates/main/container.html',
    directives: [MainHeader, MainFooter, MainRight]
})
export class Main {

    constructor() {
    }
}