import {Component, View, coreDirectives} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {Router, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';
import {BrowserDomAdapter} from 'angular2/src/dom/browser_adapter';

import {CommonService} from '../services/common-service';
import {Perfmjs} from 'perfmjs/core';

@Component({
    selector: 'ssq',
    appInjector: [routerInjectables, CommonService]
})
@View({
    templateUrl: 'templates/ssq/ssq.html',
    directives: [coreDirectives, RouterOutlet, RouterLink]
})
export class Ssq {
    router: Router;
    dom: BrowserDomAdapter;
    redCodes: Array<String> = ["01","02","03","04","05","06","07","08","09","10",
                                "11","12","13","14","15","16","17","18","19","20","21","22","23",
                                "24","25","26","27","28","29","30","31","32","33"];
    blueCodes: Array<String> = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16"];
    selectedRedCodes: any = {};
    selectedBlueCodes: any = {};

    constructor(@Inject(Router) router: Router, commonService: CommonService) {
        this.router = router;
        //BrowserDomAdapter.makeCurrent();
        this.dom = new BrowserDomAdapter();
    }

    xuanhao($event, area) {
        var element = $event.currentTarget;
        var code = this.dom.getText(element);
        this.dom.hasClass(element, "active")?this.dom.removeClass(element, "active"):this.dom.addClass(element, "active");
        if (this.dom.hasClass(element, "active")) {
            area === 'red'?(this.selectedRedCodes[code] = true):(this.selectedBlueCodes[code] = true);
        } else {
            area === 'red'?(delete this.selectedRedCodes[code]):(delete this.selectedBlueCodes[code]);
        }
        console.log("红球：" + Perfmjs.utils.keys(this.selectedRedCodes) + "/蓝球：" + Perfmjs.utils.keys(this.selectedBlueCodes))
    }

}