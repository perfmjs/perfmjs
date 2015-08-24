import {Component, View} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {RouteConfig, Router, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';

import {Login} from './login';
import {Start} from './start';
import {Zhuanpan} from './zhuanpan';
import {Dianqiu} from './dianqiu';
import {Ssq} from './ssq';
import {SsqBetConfirm} from './SsqBetConfirm';


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
    {path: '/', as:'index', component:Start, data:{adminOnly:false}},
    {path: '/login', as:'login', component:Login},
    {path: '/start', as:'start', component:Start, data:{adminOnly:true}},
    {path: '/zhuanpan', as: 'zhuanpan', component:Zhuanpan},
    {path: '/dianqiu', as: 'dianqiu', component:Dianqiu},
    {path: '/ssq', as: 'ssq', component:Ssq},
    {path: '/ssqBetConfirm', as:'ssqBetConfirm', component:SsqBetConfirm}
])
export class App {
    router: Router;

    constructor(@Inject(Router) router:Router) {
        this.router = router;
    }

}