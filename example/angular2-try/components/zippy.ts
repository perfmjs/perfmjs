import {Component, View, ElementRef, Renderer} from 'angular2/angular2';
import {Inject, bind} from 'angular2/di';

@Component({
    selector: 'zippy',
    properties: ['title:zippy-title']
})
@View({
    templateUrl: 'templates/zippy.html'
})
export class Zippy {
    visible: boolean;

    constructor(@Inject(ElementRef) ref: ElementRef, @Inject(Renderer) renderer: Renderer) {
        this.visible = true;
    }

    toggle() {
        this.visible = !this.visible;
    }
}