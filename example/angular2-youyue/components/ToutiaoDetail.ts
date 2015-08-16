import {Component, View} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {RouteConfig, Router, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';
import {BrowserDomAdapter} from 'angular2/src/dom/browser_adapter';

@Component({
    selector: 'toutiao-detail'
})
@View({
    templateUrl: `templates/toutiao/detail.html`
})
export class ToutiaoDetail {
    router: Router;
    dom:BrowserDomAdapter = new BrowserDomAdapter();

    constructor(@Inject(Router) router: Router) {
        this.router = router;
        var elem = this.dom.querySelector(document, "body");
        this.dom.removeClass(elem, "withHeader");
        this.dom.removeClass(elem, "article");
        this.dom.removeClass(elem, "utms-toutiao");
        this.dom.removeClass(elem, "utmm-None");
        this.dom.removeClass(elem, "utmc-None");
        this.dom.querySelector(document, "title").textContent = "新闻明细内容";
    }

    goto(page:string) {
        //this.router.navigate("/toutiaoDetail");
    }
}