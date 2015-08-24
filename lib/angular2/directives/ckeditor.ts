import {Component, View, Injectable, CORE_DIRECTIVES, Directive, ElementRef, Renderer} from 'angular2/angular2';
import {LifecycleEvent} from 'angular2/src/core/metadata/directives';
import {Inject} from 'angular2/di';
import {CSSClass} from 'angular2/src/directives/class';
import {BrowserDomAdapter} from 'angular2/src/dom/browser_adapter';

import {MessageEvent} from 'perfmjs/angular2/directives/message-event';
import {utils} from 'perfmjs/utils';
import {async} from 'perfmjs/async';

/**
 * ng2-ckeditor
 * 指令使用方法：<ng2ckeditor (message-event)="ng2ckeditorCompleted($event)"></ng2ckeditor>
 */
@Component({
    selector: 'ng2ckeditor',
    properties: ['height: ckheight'],
    events: ['messageEvent'],
    lifecycle: [LifecycleEvent.onInit]
})
@View({
    styles: [`
        .ng-ckeditor {
          border:0;
        }
    `],
    template: `
    <textarea id="ng2ckeditorElement" name="ng2ckeditorElement"></textarea>
    `,
    directives: [CORE_DIRECTIVES]
})
export class CKEditor {
    messageEvent:MessageEvent = new MessageEvent(this);
    elem:ElementRef;
    renderer:Renderer;
    editorOptions:any = {
        language: 'en',
        uiColor: '#000000'
    };
    height:number = 150;

    constructor(@Inject(ElementRef) elem: ElementRef, @Inject(Renderer) renderer: Renderer) {
        this.elem = elem;
        this.renderer = renderer;
    }
    onInit() {
        CKEDITOR.config.height = this.height;
        CKEDITOR.config.width = 'auto';
        if (CKEDITOR.revision == ('%RE' + 'V%') || !!CKEDITOR.plugins.get('wysiwygarea')) {
            CKEDITOR.replace('ng2ckeditorElement');
        } else {
            CKEDITOR.document.getById('ng2ckeditorElement').setAttribute('contenteditable', 'true');
            CKEDITOR.inline('ng2ckeditorElement');
        }
    }
    setData(html:string) {
        CKEDITOR.instances.ng2ckeditorElement.setData(html);
    }

    getData():string {
        return CKEDITOR.instances.ng2ckeditorElement.getData();
    }
}