import {Component, View} from 'angular2/angular2';
import {Inject,bind} from 'angular2/di';
import {RouteConfig, Router, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';

import {CommonService} from '../services/common.service';
import {Login} from './login';
import {Start} from './start';
import {Zhuanpan} from './zhuanpan';
import {Dianqiu} from './dianqiu';
import {Ssq} from './ssq';


@Component({
    selector: 'app'
})
@View({
    template: `
    <a [router-link]="['/start']">首页</a>
    <a [router-link]="['/login']">登录</a>
    <a [router-link]="['/zhuanpan']">转盘</a>
    <a [router-link]="['/dianqiu']">点球</a>
    <a [router-link]="['/ssq']">双色球</a>
    <router-outlet>
    </router-outlet>`,
    directives: [RouterOutlet, RouterLink]
})
@RouteConfig([
    {path: '/',    as: 'index',   component: Start},
    {path: '/login', as: 'login', component: Login},
    {path: '/start', as: 'start', component: Start},
    {path: '/zhuanpan', as: 'zhuanpan', component: Zhuanpan},
    {path: '/dianqiu', as: 'dianqiu', component: Dianqiu},
    {path: '/ssq', as: 'ssq', component: Ssq}
])
export class App {
    router: Router;

    constructor(@Inject(Router) router:Router, commonService: CommonService) {
        this.router = router;
        commonService.serviceName = "app-aaaa";
        this.router.navigate('/ssq');
    }

}