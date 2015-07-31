import {Component, View, coreDirectives} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {Router, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';
import {BrowserDomAdapter} from 'angular2/src/dom/browser_adapter';
import {CSSClass} from 'angular2/src/directives/class';

import {CommonService} from '../services/common.service';
import {utils} from 'perfmjs/utils';

@Component({
    selector: 'ssq'
})
@View({
    templateUrl: 'templates/ssq/ssq.html',
    directives: [coreDirectives, RouterOutlet, RouterLink, CSSClass]
})
export class Ssq {
    router: Router;
    dom: BrowserDomAdapter;
    redCodes: Array<String> = ["01","02","03","04","05","06","07","08","09","10",
                                "11","12","13","14","15","16","17","18","19","20","21","22","23",
                                "24","25","26","27","28","29","30","31","32","33"];
    blueCodes: Array<String> = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16"];
    redCodeMap: Array<any> = [];
    blueCodeMap: Array<any> = [];
    selectedRedCodes: any = {};
    selectedBlueCodes: any = {};

    constructor(@Inject(Router) router: Router, commonService: CommonService) {
        this.router = router;
        this.dom = new BrowserDomAdapter();
        var self = this;
        utils.forEach(this.redCodes, function (item, index) {
            self.redCodeMap[self.redCodeMap.length] = {'code': item,'area':'red','selected': false};
        });

        utils.forEach(this.blueCodes, function (item, index) {
            self.blueCodeMap[self.blueCodeMap.length] = {'code': item,'area':'blue','selected': false};
        });
    }

    xuanhao(code) {
        code.selected = !code.selected;
        console.log("code.area:" + code.area);
    }

    /**
     * 仅作为演示用
     * @param $event
     * @param area
     * @private
     */
    _xuanhao($event, area) {
        var element = $event.currentTarget;
        var code = this.dom.getText(element);
        this.dom.hasClass(element, "active")?this.dom.removeClass(element, "active"):this.dom.addClass(element, "active");
        if (this.dom.hasClass(element, "active")) {
            area === 'red'?(this.selectedRedCodes[code] = true):(this.selectedBlueCodes[code] = true);
        } else {
            area === 'red'?(delete this.selectedRedCodes[code]):(delete this.selectedBlueCodes[code]);
        }
        console.log("红球：" + utils.keys(this.selectedRedCodes) + "/蓝球：" + utils.keys(this.selectedBlueCodes));
    }

}