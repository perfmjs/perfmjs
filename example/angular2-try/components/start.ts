import {Component, View, CORE_DIRECTIVES} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {Router, RouterOutlet, RouterLink, routerInjectables, RouteParams, ROUTE_DATA} from 'angular2/router';

import {CommonService} from '../services/common.service';
import {Zippy} from './zippy';

@Component({
    selector: 'start'
})
@View({
    templateUrl: 'templates/start.html',
    directives: [CORE_DIRECTIVES, RouterOutlet, RouterLink, Zippy]
})
export class Start {
    myName: string;
    names: Array<String>;
    router: Router;
    event:any;

    constructor(@Inject(Router) router: Router, @Inject(ROUTE_DATA) routeData:any, @Inject(RouteParams) routeParams:RouteParams, commonService: CommonService) {
        this.myName = 'AngularJS2@爱彩';
        this.names = commonService.names;
        this.router = router;
        console.log("routeDta:" + routeData.adminOnly + "/routerParams.get(count)=" + routeParams.get("count"));
        console.log("routeDta:" + routeData.adminOnly);
    }
    myCtrlMethod(inputStr: String) {
        console.log('call myControllerMethod:' + inputStr);
        this.router.navigate('/login');
    }
    ng2ckeditorCompleted(event) {
        this.event = event;
        console.log('CKEditor comming...');
    }
    printCKEditorHtml() {
        console.log('ckedit html:' + this.event.source.getData());
    }
}