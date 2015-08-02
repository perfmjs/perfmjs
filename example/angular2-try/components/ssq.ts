import {Component, View, Injectable, coreDirectives, Directive, ElementRef, Renderer} from 'angular2/angular2';
import {Inject, bind} from 'angular2/di';
import {Router, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';
import {CSSClass} from 'angular2/src/directives/class';
import {Pipes} from 'angular2/src/change_detection/change_detection';

import {CommonService} from '../services/common.service';
import {utils} from 'perfmjs/utils';
import {joquery} from 'perfmjs/joquery';
import {jsonPipeInjectable, jsonPipe} from './jsonPipe';
import {filterPipeInjectable, filterPipe} from './filterPipe';

@Component({
    selector: 'ssq',
    viewInjector: [Pipes.extend({'filterPipe':filterPipe, 'jsonPipe':jsonPipe})]
})
@View({
    templateUrl: 'templates/ssq/ssq.html',
    directives: [coreDirectives, RouterOutlet, RouterLink, CSSClass]
})
export class Ssq {
    utils:any = utils;
    jsonValue:any = {a:123};
    router: Router;
    redCodes: Array<String> = ["01","02","03","04","05","06","07","08","09","10",
                                "11","12","13","14","15","16","17","18","19","20","21","22","23",
                                "24","25","26","27","28","29","30","31","32","33"];
    blueCodes: Array<String> = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16"];
    redCodeMap:any = new Map();
    blueCodeMap:any = new Map();

    constructor(@Inject(Router) router: Router, commonService: CommonService) {
        this.router = router;
        var self = this;
        utils.forEach(this.redCodes, function (item) {
            self.redCodeMap.set(item, {'code': item,'area':'red','selected':false});
        });
        utils.forEach(this.blueCodes, function (item) {
            self.blueCodeMap.set(item, {'code': item,'area':'blue','selected':false});
        });
    }

    xuanhao(code) {
        code.selected = !code.selected;
    }

    //@asPipe
    //onlySelected(collection) {
    //    return collection.filter(item => item.complete);
    //}
}