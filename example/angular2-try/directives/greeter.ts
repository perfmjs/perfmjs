import {Directive, ElementRef} from 'angular2/angular2';
import {Injectable} from 'angular2/di';

//@Directive({selector: 'red'})
//export class RedDec {
//    constructor(el: ElementRef) { el.domElement.style.color = 'red'; }
//}

@Directive({
    selector: '[tooltip]',
    properties: ['text: tooltip']
})
export class Tooltip {
    set text(value: string) {
        console.log("Tooltip Directive new value: " + value);
    }
}

@Directive({selector: 'needs-greeter'})
export class NeedsGreeter {

  greeter: Greeter;

  //constructor(greeter: Greeter) {
  //    this.greeter = greeter;
  //}
    constructor() {
        //this.greeter = greeter;
    }
}

@Injectable()
export class Greeter {
   greet(name:string) {
      return 'Hello ' + name + '!';
    }
 }