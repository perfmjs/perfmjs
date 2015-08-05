import {Component, View, Injectable, coreDirectives, Directive, ElementRef, Renderer} from 'angular2/angular2';
import {Inject, bind} from 'angular2/di';
import {CSSClass} from 'angular2/src/directives/class';
import {MessageEvent} from '../directives/MessageEvent';

import {utils} from 'perfmjs/utils';

@Directive({
    selector: 'my-directive',
    properties: [
        'text: message'
    ],
    host: {
        '(^mouseover)': 'onMousedown()'
    }
})
class MyDirective {
    text:string;

    constructor(@Inject(ElementRef) elem: ElementRef, @Inject(Renderer) renderer: Renderer) {
    }

    onMousedown() {
        console.log("MyDirective#onMousedown" + this.text);
    }
}

@Directive({
    selector: '[red-better]'
})
class RedDec {
    constructor(@Inject(ElementRef) el: ElementRef, @Inject(Renderer) renderer: Renderer) {
        renderer.setElementAttribute(el, 'class', 'red-better');
    }
}

@Component({
    selector: 'ssqbobao',
    events: ['messageEvent']
})
@View({
    template: `
    <my-directive message="MediterraneaJS">
        <p class="i-report">2015001期 <span red-better>周二21:30开奖{{text}}</span></p>
    </my-directive>
    `,
    directives: [coreDirectives, CSSClass, RedDec, MyDirective]
})
export class SsqBobao {
    messageEvent:MessageEvent = new MessageEvent(this);
    text:string = '';

    constructor() {
        this.text = '123456';
    }

    onMessage(message) {
        console.log('SsqBobao#callback=' + message);
    }
}