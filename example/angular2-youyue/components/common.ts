import {Component, View} from 'angular2/angular2';
import {Inject} from 'angular2/di';

import {CommonService} from '../services/common-service';


@Component({
    selector: 'biz-header'
})
@View({templateUrl: 'templates/main/biz-index.html'})
export class MainHeader {
    commonService: CommonService;

    constructor(commonService: CommonService) {
        this.commonService = commonService;
    }

    gotoMainPage() {
        this.commonService.gotoMainPage();
    }

    gotoDetailPage() {
        this.commonService.gotoDetailPage();
    }
}

@Component({selector: 'biz-footer'})
@View({templateUrl: 'templates/main/biz-footer.html'})
export class MainFooter {

    constructor() {
    }
}

@Component({selector: 'biz-right'})
@View({templateUrl: 'templates/main/biz-right.html'})
export class MainRight {

    constructor() {
    }
}

@Component({selector: 'biz-header'})
@View({templateUrl: 'templates/detail/biz-index.html'})
export class DetailHeader {

    constructor() {
    }
}

@Component({selector: 'biz-footer'})
@View({templateUrl: 'templates/detail/biz-footer.html'})
export class DetailFooter {

    constructor() {
    }
}

@Component({selector: 'biz-right'})
@View({templateUrl: 'templates/detail/biz-right.html'})
export class DetailRight {

    constructor() {
    }
}

@Component({selector: 'biz-sns'})
@View({templateUrl: 'templates/detail/biz-sns.html'})
export class DetailSNS {

    constructor() {
    }
}

@Component({selector: 'biz-morearticle'})
@View({templateUrl: 'templates/detail/biz-morearticle.html'})
export class DetailMoreArticle {

    constructor() {
    }
}