import {Component, View, Injectable, CORE_DIRECTIVES, Directive, ElementRef, Renderer} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {Router, routerInjectables} from 'angular2/router';
import {BrowserDomAdapter} from 'angular2/src/dom/browser_adapter';

import {utils} from 'perfmjs/utils';
import {CKEditor} from 'perfmjs/angular2/directives/ckeditor';


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
    directives: [CORE_DIRECTIVES, CKEditor]
})
export class CmsEdit {

    constructor() {
        var dom = new BrowserDomAdapter();
        dom.setInnerHTML(dom.querySelectorAll(document, "title")[0], 'cms-edit')
    }

    ng2ckeditorCompleted(event) {
        console.log("ng2ckeditorCompleted...");
    }
}