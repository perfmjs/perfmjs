import {Component, View} from 'angular2/angular2';
import {Inject, bind} from 'angular2/di';
import {RouteConfig, Router, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';

import {CommonService} from '../services/common.service';
import {Login} from './login';
import {Start} from './start';
import {Zhuanpan} from './zhuanpan';
import {Dianqiu} from './dianqiu';
import {Ssq} from './ssq';
import {SsqBetConfirm} from './SsqBetConfirm';
import {CommonLogin} from '../directives/common.login';


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
    {path: '/', as:'index', component:Ssq},
    {path: '/login', as:'login', component:Login},
    {path: '/start', as:'start', component:Start},
    {path: '/zhuanpan', as: 'zhuanpan', component:Zhuanpan},
    {path: '/dianqiu', as: 'dianqiu', component:Dianqiu},
    {path: '/ssq', as: 'ssq', component:Ssq},
    {path: '/ssqBetConfirm', as:'ssqBetConfirm', component:SsqBetConfirm},
    {path: '/commonLogin', as:'commonLogin', component:CommonLogin}
])
export class App {
    router: Router;

    constructor(@Inject(Router) router:Router, commonService: CommonService) {
        this.router = router;
        this.router.navigate('/');
    }

}