import {Router} from 'angular2/router';
import {Perfmjs} from 'perfmjs/core';

export class CommonService {
    rootRouter: Router;

    constructor() {
        this.rootRouter = Perfmjs.globalRef.newInstance().option('rootRouter');
    }

    getRootRouter() {
        return this.rootRouter;
    }

    setRootRouter(rootRouter: Router) {
        this.rootRouter = rootRouter;
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

//export let datacontextInjectables = [
//    httpInjectables,
//    Datacontext
//];