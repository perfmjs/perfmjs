import {Component, View, coreDirectives} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {Router, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';

import {CommonService} from '../services/common.service';
import {Zippy} from './zippy';
import {CKEditor} from '../directives/ckeditor';
import {CommonLogin} from '../directives/common.login';


@Component({
    selector: 'start'
})
@View({
    templateUrl: 'templates/start.html',
    directives: [coreDirectives, RouterOutlet, RouterLink, Zippy, CKEditor, CommonLogin]
})
export class Start {
    myName: string;
    names: Array<String>;
    router: Router;
    event:any;

    constructor(@Inject(Router) router: Router, commonService: CommonService) {
        this.myName = 'AngularJS2@爱彩';
        this.names = commonService.names;
        this.router = router;
    }
    myCtrlMethod(inputStr: String) {
        console.log('call myControllerMethod:' + inputStr);
        this.router.navigate('/login');
    }
    ng2ckeditorCompleted(event) {
        this.event = event;
        console.log('CKEditor comming...');
    }
    printCKEditorHtml() {
        console.log('ckedit html:' + this.event.source.getData());
    }
}