import {Component, View} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {RouteConfig, Router, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';

import {CommonLogin} from '../directives/common-login';
import {CommonService} from '../services/common-service';
import {ToutiaoIndex} from './ToutiaoIndex';
import {ToutiaoDetail} from './ToutiaoDetail';
import {CmsEdit} from './cmsEdit';

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
    {path: '/', as: 'index', component: CmsEdit},
    {path: '/toutiaoIndex', as: 'toutiaoIndex', component: ToutiaoIndex},
    {path: '/toutiaoDetail', as: 'toutiaoDetail', component: ToutiaoDetail},
    {path: '/cmsEdit', as: 'cmsEdit', component: CmsEdit},
    {path: '/login/:sourcePath', as: 'commonLogin', component: CommonLogin}
])
export class App {
    router: Router;
    commonService: CommonService;

    constructor(@Inject(Router) router: Router, commonService: CommonService) {
        this.router = router;
        this.commonService = commonService;
    }
}