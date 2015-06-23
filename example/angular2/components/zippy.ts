import {Component, View} from 'angular2/angular2';

@Component({
    selector: 'zippy',
    properties: ['title:zippy-title']
})
@View({
    templateUrl: 'templates/zippy.html'
})

export class Zippy {
    visible: boolean;

    constructor() {
        this.visible = true;
    }

    toggle() {
        this.visible = !this.visible;
    }
}