import {Injectable} from 'angular2/di';
import {base} from 'perfmjs/base';

@Injectable()
export class CommonService {

    constructor() {
    }

    request(url:string, handler:any) {
        this.proxy.request(url, handler);
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
    request: function(url:string, handler:any) {
        fetch(url).then(res => res.json())
            .then(function(json) {
                handler(json);
            }).catch(function(ex) {
                console.log('request:' + url + ' failed:', ex)
            })
    },
    end: 0
});
base.commonService.defaults = {
    scope: 'singleton',
    end: 0
};