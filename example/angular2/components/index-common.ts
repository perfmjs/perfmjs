import {ElementRef, Component, Directive, View, Injectable} from 'angular2/angular2';

class GreetingService {
    greeting: string = 'hello';
}

@Directive({selector: '[red]'})
class RedDec {
    constructor(el: ElementRef) { el.domElement.style.color = 'red'; }
}

@Component({
    selector: 'hello-app',
    appInjector: [GreetingService]
})

@View({
    template: `<div class="greeting">{{greeting}} <span red>world</span>!</div>
           <button class="changeButton" (click)="changeGreeting()">change greeting</button>`,
    directives: [RedDec]
})
export class HelloCmp {
    greeting: string;

    constructor(service: GreetingService) { this.greeting = service.greeting; }

    changeGreeting(): void { this.greeting = 'howdy'; }
}