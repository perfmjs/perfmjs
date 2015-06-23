//import {Component, View, bootstrap, For, If, Injectable} from 'angular2/angular2';
//import {reflector} from 'angular2/src/reflection/reflection';
//import {ReflectionCapabilities} from 'angular2/src/reflection/reflection_capabilities';
//import { RouteConfigAnnotation as RouteConfig, Router, RouterOutlet, RouterLink, routerInjectables } from 'angular2/router';
//import { RootRouter } from 'angular2/src/router/router';
//import { Pipeline } from 'angular2/src/router/pipeline';
//import { bind } from 'angular2/di';

import {reflector} from 'angular2/src/reflection/reflection';
import {ReflectionCapabilities} from 'angular2/src/reflection/reflection_capabilities';
import {Component, View, bootstrap, For, If, Injectable} from 'angular2/angular2';
import {bind} from 'angular2/di';
import {RootRouter} from 'angular2/src/router/router';
import {RouteRegistry} from 'angular2/src/router/route_registry';
import {Location} from 'angular2/src/router/location'
import {Pipeline} from 'angular2/src/router/pipeline';
import {BrowserLocation} from 'angular2/src/router/browser_location';
import {RouteConfigAnnotation as RouteConfig, Router, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';

import {Zippy} from 'zippy';
import {Start} from 'start';

@Component({
    selector: 'display'
})
@View({
    templateUrl: '../templates/app.html',
    directives: [For, If, Zippy]
})

class DisplayComponent {
    myName: string;
    names: Array<String>;

    constructor() {
        this.myName = 'AICAI';
        this.names = ["Aarav1", "Martin1", "Shannon1", "Ariana1", "Kai33"];
    }

    myControllerMethod(inputStr: String) {
        alert('call myControllerMethod:' + inputStr);
    }
}

//@RouteConfig([
//    {path: '/start', components: {start: Start}, as: 'start'}
//])
class FriendsService {
    names: Array<String>;

    constructor() {
        this.names = ["Aarav1", "Martin1", "Shannon1", "Ariana1", "Kai33"];
    }
}


reflector.reflectionCapabilities = new ReflectionCapabilities();
bootstrap(DisplayComponent, [
    routerInjectables
    //bind(Router).toValue(new RootRouter(new Pipeline()))
]);
