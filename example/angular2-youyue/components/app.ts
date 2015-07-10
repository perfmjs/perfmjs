import {Component, View} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {RouteConfig, Router, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';

import {CommonService} from '../services/common-service';
import {Main} from './main';
import {Detail} from './detail';

@Component({
    selector: 'app',
    appInjector: [routerInjectables, CommonService]
})
@View({
    template: `
    <router-outlet>
    </router-outlet>`,
    directives: [RouterOutlet, RouterLink]
})
@RouteConfig([
    {path: '/index', as: 'main', component: Main},
    {path: '/detail', as: 'detail', component: Detail}
])
export class App {
    router: Router;
    commonService: CommonService;

    constructor(@Inject(Router) router: Router, @Inject(CommonService) commonService: CommonService) {
        this.router = router;
        this.commonService = commonService;
        this.commonService.setRootRouter(this.router);
        this.router.navigate('/index');
    }
}