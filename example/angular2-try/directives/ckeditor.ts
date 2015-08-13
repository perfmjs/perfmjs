import {Component, View, Injectable, coreDirectives, Directive, ElementRef, Renderer} from 'angular2/angular2';
import {Inject, bind} from 'angular2/di';
import {CSSClass} from 'angular2/src/directives/class';

import {MessageEvent} from './message.event';
import {utils} from 'perfmjs/utils';
import {async} from 'perfmjs/async';

/**
 * ng2-ckeditor
 * 指令使用方法：<ng2ckeditor (message-event)="ng2ckeditorCompleted($event)"></ng2ckeditor>
 */
@Component({
    selector: 'ng2ckeditor',
    events: ['messageEvent']
})
@View({
    styles: [`
        .ng-ckeditor {
          border:0;
        }
    `],
    template: `<textarea id="ng2ckeditorElement" name="ng2ckeditorElement"></textarea>`,
    directives: [coreDirectives, CSSClass]
})
export class CKEditor {
    messageEvent:MessageEvent = new MessageEvent(this);
    elem:ElementRef;
    renderer:Renderer;
    editorOptions:any = {
        language: 'en',
        uiColor: '#000000'
    };

    constructor(@Inject(ElementRef) elem: ElementRef, @Inject(Renderer) renderer: Renderer) {
        this.elem = elem;
        this.renderer = renderer;

        CKEDITOR.config.height = 150;
        CKEDITOR.config.width = 'auto';
        if (CKEDITOR.revision == ('%RE' + 'V%' ) || !!CKEDITOR.plugins.get('wysiwygarea')) {
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