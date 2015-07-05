import {Component, View, bootstrap, NgFor, NgIf, Injectable} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {Router, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';

import {Zippy} from './zippy';
import {Start} from './start';
import {FriendService} from '../services/FriendService';

@Component({
    selector: 'router-app',
    appInjector: [routerInjectables, FriendService]
})
@View({
    templateUrl: 'templates/app.html',
    directives: [NgFor, NgIf, RouterOutlet, RouterLink, Zippy]
})

export class RouterApp {
    myName: string;
    names: Array<String>;
    router: Router;

    constructor(@Inject(Router) router: Router, @Inject(FriendService) friendService: FriendService) {
        this.myName = 'AngularJS2@爱彩';
        this.names = friendService.names;
        this.router = router;
        this.router.config([
            {path: '/start', component: Start, as: 'start'}
        ]);
    }
    myCtrlMethod(inputStr: String) {
        alert('call myControllerMethod:' + inputStr);
        this.router.navigate('/start');
    }
}