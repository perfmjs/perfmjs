import {Injectable} from 'angular2/di';

import {base} from 'perfmjs/base';
import {utils} from 'perfmjs/utils';

@Injectable()
export class CommonService {

    constructor() {
    }

    get betPlanContent():BetPlanContent {
        return this.proxy.option('betPlanContent');
    }

    request(url:string, handler:any) {
        this.proxy.request(url, handler);
    }

    get serviceName() {
        return this.proxy.option('serviceName');
    }

    set serviceName(name:any) {
        this.proxy.option('serviceName', name);
    }

    get names() {
        return this.proxy.option('names');
    }

    get proxy() {
        return base.commonService.newInstance();
    }
}
base("commonService", {
    init: function(args:any) {
        this.option('names', ["Aarav", "Martin", "Shannon", "Ariana", "Kai"]);
        this.option('betPlanContent', new BetPlanContent());
        return this;
    },
    end: 0
});
base.commonService.defaults = {
    names: [],
    serviceName: 'fooo',
    betPlanContent: {}, //e.g. {red:[], blue:[], betCount:0}
    scope: 'singleton',
    end: 0
};

export class BetPlanContent {

    private _lottery:string = '';
    private _content:any = [];
    private _totalBetCount:number = 0;
    private _betAmount:number = 0;
    private _multiple:number = 1; //倍数
    private _chaseItemCount:number = 1; //追号期数

    constructor() {
    }

    init() {
        this._lottery = '';
        this._content = [];
        this._totalBetCount = 0;
        this._betAmount = 0;
        this._multiple = 1;
        this._chaseItemCount = 1;
    }

    get lottery():string {
        return  this._lottery;
    }
    set lottery(game:string) {
        this._lottery = game;
    }
    get content() {
       return this._content;
    }
    get totalBetCount():number {
        return this._totalBetCount;
    }
    set totalBetCount(totalBetCount:number) {
        this._totalBetCount = totalBetCount;
    }
    get betAmount():number {
        return this._betAmount;
    }
    set betAmount(betAmount:number) {
        this._betAmount = betAmount;
    }
    get multiple():number {
        return this._multiple;
    }
    set multiple(multiple:number) {
        this._multiple = multiple;
    }
    get chaseItemCount():number {
        return this._chaseItemCount;
    }
    set chaseItemCount(chaseItemCount:number) {
        this._chaseItemCount = chaseItemCount;
    }
    get unitPrice():number {
        return 2; //注意：dlt可以追加到3元
    }

    /**
     * FIXME 算法待完善
     * @returns {number}
     */
    calcTotalAmount() {
        return this._totalBetCount
        * this.unitPrice
        * this._multiple
        * this._chaseItemCount
    }

}