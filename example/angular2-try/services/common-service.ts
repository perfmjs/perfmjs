import {Injectable} from 'angular2/di';
import {Router} from 'angular2/router';
import {Perfmjs} from 'perfmjs/core';

@Injectable()
export class CommonService {
    rootRouter: Router;
    names: Array<String>;

    constructor() {
        this.rootRouter = Perfmjs.globalRef.newInstance().option('rootRouter');
        this.names = ["Aarav2", "Martin1", "Shannon1", "Ariana1", "Kai33"];
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