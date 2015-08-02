import {Directive, ElementRef} from 'angular2/angular2';
import {Injectable} from 'angular2/di';

//@Directive({
//    selector: 'hightlight',
//    hostListeners: {
//        'mouseenter': 'onMouseEnter()',
//        'mouseleave': 'onMouseLeave()'
//    }
//})
//export class Highlight {
//
//    constructor(private element:ElementRef) {
//    }
//
//    onMouseEnter() {
//        this.outline('#f00 solid 1px');
//    }
//
//    onMouseLeave() {
//        this.outline();
//    }
//
//    private outline(outline:string = "") {
//        this.element.domElement.style.outline = outline;
//    }
//}

@Directive({selector: '[red]'})
class RedDec {
    // ElementRef is always injectable and it wraps the element on which the
    // directive was found by the compiler.
    constructor(el: ElementRef, renderer: Renderer) { renderer.setElementStyle(el, 'color', 'red'); }
}

//@Directive({
//    selector: '[tooltip]',
//    properties: ['text: tooltip']
//})
//export class Tooltip {
//    set text(value: string) {
//        console.log("Tooltip Directive new value: " + value);
//    }
//}

//@Directive({selector: 'needs-greeter'})
//export class NeedsGreeter {
//  greeter: Greeter;
//
//  //constructor(greeter: Greeter) {
//  //    this.greeter = greeter;
//  //}
//    constructor() {
//        //this.greeter = greeter;
//    }
//}

@Injectable()
export class Greeter {
   greet(name:string) {
      return 'Hello ' + name + '!';
    }
 }