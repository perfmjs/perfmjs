import {Injectable} from 'angular2/di';
import {Router} from 'angular2/router';
import {Perfmjs} from 'perfmjs/core';

@Injectable()
export class CommonService {
    globalRef: any;

    constructor() {
        this.globalRef = Perfmjs.globalRef.newInstance();
    }

    getRootRouter() {
        return this.globalRef.option('rootRouter');
    }

    setRootRouter(rootRouter: Router) {
        this.globalRef.option('rootRouter', rootRouter);
    }

    gotoMainPage() {
        this.getRootRouter().navigate("/main");
    }

    gotoDetailPage() {
        this.getRootRouter().navigate("/detail");
    }

    request(url: String, handler) {
        fetch(url).then(res => res.json())
        .then(function(json) {
            handler(json);
        }).catch(function(ex) {
            console.log('request:' + url + ' failed:', ex)
        })
    }

}