import {Injectable} from 'angular2/di';
import {base} from 'perfmjs/base';

@Injectable()
export class CommonService {

    constructor() {
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
    names: [],
    serviceName: '11111',
    scope: 'singleton',
    end: 0
};