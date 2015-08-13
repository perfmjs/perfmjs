import {Component, View} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {RouteConfig, Router, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';


@Component({
    selector: 'toutiao-detail'
})
@View({
    templateUrl: `templates/toutiao/detail.html`
})
export class ToutiaoDetail {
    router: Router;

    constructor(@Inject(Router) router: Router) {
        this.router = router;
    }

    goto(page:string) {
        //this.router.navigate("/toutiaoDetail");
    }
}