import {Component, View, Directive, bootstrap} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {RouteConfig, Router, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';

import {Login} from './login';
import {Start} from './start';
import {CommonService} from '../services/common-service';


@Component({
    selector: 'app',
    appInjector: [routerInjectables, CommonService]
})
@View({
    template: `
    <router-outlet>
        <a router-link="start">start</a>
        <a router-link="login">login</a>
    </router-outlet>`,
    directives: [RouterOutlet, RouterLink]
})
@RouteConfig([
    {path: '/11',    as: 'foo',   component: Login},
    {path: '/login', as: 'login', component: Login},
    {path: '/start', as: 'start', component: Start}
    //{path: '/xx', as: 'xx', redirectTo: 'welcome'}
])
export class App {
    router: Router;
    commonService: CommonService;

    constructor(@Inject(Router) router: Router, @Inject(CommonService) commonService: CommonService) {
        this.router = router;
        this.commonService = commonService;
        this.commonService.setRootRouter(this.router);
        this.router.navigate('/login');
    }

}