import {Component, View, Injectable, coreDirectives, Directive, ElementRef, Renderer} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {Router, routerInjectables} from 'angular2/router';
import {BrowserDomAdapter} from 'angular2/src/dom/browser_adapter';
import {CSSClass} from 'angular2/src/directives/class';

import {utils} from 'perfmjs/utils';

@Component({
    selector: 'toutiao-index'
})
@View({
    templateUrl: `templates/toutiao/index.html`,
    directives: [coreDirectives, CSSClass]
})
export class ToutiaoIndex {
    router:Router;
    dom:BrowserDomAdapter = new BrowserDomAdapter();
    channelsMap:Map = new Map();

    constructor(@Inject(Router) router: Router) {
        this.router = router;
        var elem = this.dom.querySelector(document, "body");
        this.dom.addClass(elem, "withHeader");
        this.dom.addClass(elem, "article");
        this.dom.addClass(elem, "utms-toutiao");
        this.dom.addClass(elem, "utmm-None");
        this.dom.addClass(elem, "utmc-None");
        this.dom.querySelector(document, "title").textContent = "悠阅空间 - 你要的知识和经验，才是头条！";
        this.queryAllChannels();
    }

    refresh() {
        window.location.reload();
    }

    queryAllChannels() {
        var self = this;
        utils.fetch('http://localhost:8888/youyue/query/channel', function(jsonData) {
            if (jsonData.status === 'success') {
                var channelList = jsonData.result.list;
                var scrollLefts = '0,0,0,-19,34,87,140,193,246,299,352,426,426,426,426'.split(',');
                utils.forEach(jsonData.result.list, function(item, index) {
                    self.channelsMap.set(item, {'name':item, 'selected':index<1?true:false, 'scrollLeft':(index < scrollLefts.length-1)?scrollLefts[index]:0});
                });
            }
        });
    }

    gotoLoginPage() {
        this.router.navigate("/login/toutiaoIndex");
    }
    gotoDetailPage() {
        this.router.navigate("/toutiaoDetail");
    }
}