import {Component, View, Injectable, coreDirectives, Directive, ElementRef, Renderer} from 'angular2/angular2';
import {Inject, bind} from 'angular2/di';
import {CSSClass} from 'angular2/src/directives/class';


@Directive({selector: '[red-better]'})
class RedDec {
    constructor(@Inject(ElementRef) el: ElementRef, @Inject(Renderer) renderer: Renderer) {
        renderer.setElementAttribute(el, 'class', 'red-better');
    }
}

@Component({
    selector: 'ssq-bobao'
})
@View({
    template: `
    <p class="i-report">2015001期 <span red-better>周二21:30开奖</span></p>
    `,
    directives: [coreDirectives, CSSClass, RedDec]
})
export class SsqBobao {

    constructor() {
    }
}