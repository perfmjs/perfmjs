import {Component, View, Injectable, coreDirectives, Directive, ElementRef, Renderer} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {Router, routerInjectables} from 'angular2/router';
import {BrowserDomAdapter} from 'angular2/src/dom/browser_adapter';
import {CSSClass} from 'angular2/src/directives/class';

import {utils} from 'perfmjs/utils';
import {CKEditor} from '../directives/ckeditor';


@Component({
    selector: 'cms-edit'
})
@View({
    styles:[`
        .pure-form .pure-input-1-2, .pure-form .pure-button {
            display: block;
            width: 96%;
            margin: 10px auto
        }
        .pure-group {
            margin: 0 0 0 0
        }
    `],
    templateUrl: `templates/cms/index.html`,
    directives: [coreDirectives, CSSClass, CKEditor]
})
export class CmsEdit {
    constructor() {
    }

    ng2ckeditorCompleted(event) {
        console.log("ng2ckeditorCompleted...");
    }
}