import {Component, View, Injectable, CORE_DIRECTIVES, Directive, ElementRef, Renderer} from 'angular2/angular2';
import {Inject, bind} from 'angular2/di';
import {MessageEvent} from 'perfmjs/angular2/directives/message-event';

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
        console.log("MyDirective#constructor.text=" + this.text);
    }

    onMousedown() {
        console.log("MyDirective#onMousedown.text=" + this.text);
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
    directives: [CORE_DIRECTIVES, RedDec, MyDirective]
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