import {Component, View, Injectable, coreDirectives, Directive, ElementRef, Renderer} from 'angular2/angular2';
import {Inject, bind} from 'angular2/di';
import {Router, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';
import {CSSClass} from 'angular2/src/directives/class';
import {Pipes, defaultPipes} from 'angular2/src/change_detection/change_detection';

import {CommonService} from '../services/common.service';
import {utils} from 'perfmjs/utils';
import {joquery} from 'perfmjs/joquery';
import {CommonPipeFactory} from '../pipes/commonPipe';
import {betBaseSuanfa} from './betBaseSuanfa';
import {SsqBobao} from './SsqBobao';


//build pipe
var betCountPipeObj = new CommonPipeFactory();
betCountPipeObj.transform = utils.aop(this, betCountPipeObj.transform, function(value, args) {
    var betInfo:Map = value;
    var selectedRedCount = joquery.newInstance(utils.toArray(betInfo.get('red').values())).filter(function(item) {
        return item.selected;
    }).toArray().length;
    var selectedBlueCount = joquery.newInstance(utils.toArray(betInfo.get('blue').values())).filter(function(item) {
        return item.selected;
    }).toArray().length;
    betInfo.set('betCount', betBaseSuanfa.getCodeNumber(6, selectedRedCount, selectedBlueCount));
    return betInfo.get('betCount');
});
var betInfoPipeObj = new CommonPipeFactory();
betInfoPipeObj.transform = utils.aop(this, betInfoPipeObj.transform, function(value, args) {
    var betCount:number = value;
    return betCount<1?'至少选择6个红球+1个蓝球':'共' + betCount + '注，下一步';
});

@Component({
    selector: 'ssq',
    viewBindings: [
        Pipes.extend({
            'betInfoPipe': CommonPipeFactory.toPipe(betInfoPipeObj),
            'betCountPipe': CommonPipeFactory.toPipe(betCountPipeObj)
        })
    ]
})
@View({
    templateUrl: 'templates/ssq/ssq.html',
    directives: [coreDirectives, RouterOutlet, RouterLink, CSSClass, SsqBobao]
})
export class Ssq {
    router: Router;
    commonService:CommonService;
    redCodes: Array<String> = ["01","02","03","04","05","06","07","08","09","10",
                                "11","12","13","14","15","16","17","18","19","20","21","22","23",
                                "24","25","26","27","28","29","30","31","32","33"];
    blueCodes: Array<String> = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16"];
    betInfo:any = new Map();
    page:string = 'bet';

    constructor(@Inject(Router) router: Router, commonService: CommonService) {
        this.router = router;
        this.commonService = commonService;
        this.betInfo.set('red', new Map());
        this.betInfo.set('blue', new Map());
        this.betInfo.set('betCount', 0);
        var self = this;
        utils.forEach(this.redCodes, function (item) {
            self.betInfo.get('red').set(item, {'code': item,'area':'red','selected':false});
        });
        utils.forEach(this.blueCodes, function (item) {
            self.betInfo.get('blue').set(item, {'code': item,'area':'blue','selected':false});
        });
    }

    /**
     * 手选号码
     * @param code
     */
    xuanhao(code) {
        code.selected = !code.selected;
    }

    /**
     * 机选一注|清空
     */
    randomCode() {
        if (this.betInfo.get('betCount') > 0) {
            this.clearAllSelectedCode();
            return;
        }
        var randomRedCodes = betBaseSuanfa.rndNumbersAndFormat(1,33,6,0,-1,'',[],true).split(',');
        var randomBlueCodes = betBaseSuanfa.rndNumbersAndFormat(1,16,1,0,-1,'',[],true).split(',');
        this.clearAllSelectedCode();
        utils.forEach(this.betInfo.get('red'), function(value, key) {
            if (utils.contain(randomRedCodes, key)) value.selected = true;
        });
        utils.forEach(this.betInfo.get('blue'), function(value, key) {
            if (utils.contain(randomBlueCodes, key)) value.selected = true;
        });
    }

    clearAllSelectedCode() {
        utils.forEach(this.betInfo.get('red'), function(value, key) {
            value.selected = false;
        });
        utils.forEach(this.betInfo.get('blue'), function(value, key) {
            value.selected = false;
        });
        this.betInfo.set('betCount', 0);
    }

    betConfirm() {
        var betPlanContent = this.commonService.betPlanContent;
        betPlanContent.lottery = 'ssq';

        if (this.betInfo.get('betCount') < 1) {
            this.router.navigate('/ssqBetConfirm');
            return;
        }

        var selectedRedCode = [];
        joquery.newInstance(utils.toArray(this.betInfo.get('red').values())).filter(function(item) {
            if (item.selected) {
                selectedRedCode[selectedRedCode.length] = item.code
            }
        }).toArray();

        var selectedBlueCode = [];
        joquery.newInstance(utils.toArray(this.betInfo.get('blue').values())).filter(function(item) {
            if (item.selected) {
                selectedBlueCode[selectedBlueCode.length] = item.code
            }
        }).toArray();

        betPlanContent.content[betPlanContent.content.length] = {
            'red':selectedRedCode,
            'blue':selectedBlueCode,
            'betCount': this.betInfo.get('betCount')
        };

        var totalBetCount = 0;
        utils.forEach(betPlanContent.content, function(item, index) {
            totalBetCount = totalBetCount + utils.toNumber(item.betAccount);
        });
        betPlanContent.content.totalBetCount = totalBetCount;
        betPlanContent.content.betAmount = betPlanContent.calcTotalAmount();

        this.router.navigate('/ssqBetConfirm');
    }

    messageEventCompleted(event) {
        event.emit('SSQ#CALL BACK!');
    }
}