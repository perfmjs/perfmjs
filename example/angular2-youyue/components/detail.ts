import {Component, View} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {RouteConfig, Router, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';

import {CommonService} from '../services/common-service';
import {DetailHeader, DetailFooter, DetailRight, DetailSNS, DetailMoreArticle} from './common';

@Component({
    selector: 'main'
})
@View({
    templateUrl: 'templates/detail/container.html',
    directives: [DetailHeader, DetailFooter, DetailRight, DetailSNS, DetailMoreArticle]
})
export class Detail {

    constructor() {
    }
}