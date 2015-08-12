import {Component, View} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {RouteConfig, Router, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';

import {CommonService} from '../services/common-service';
import {Main} from './main';
import {Detail} from './detail';
import {ToutiaoIndex} from './ToutiaoIndex';

@Component({
    selector: 'app'
})
@View({
    template: `
    <router-outlet>
    </router-outlet>`,
    directives: [RouterOutlet, RouterLink]
})
@RouteConfig([
    {path: '/', as: 'index', component: ToutiaoIndex},
    {path: '/index', as: 'main', component: Main},
    {path: '/detail', as: 'detail', component: Detail},
    {path: '/toutiaoIndex', as: 'toutiaoIndex', component: ToutiaoIndex}
])
export class App {
    router: Router;
    commonService: CommonService;

    constructor(@Inject(Router) router: Router, commonService: CommonService) {
        this.router = router;
        this.commonService = commonService;
        this.router.navigate('/');
    }
}