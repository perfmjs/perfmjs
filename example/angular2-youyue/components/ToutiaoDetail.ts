import {Component, View, CORE_DIRECTIVES} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {RouteConfig, Router, RouterOutlet, RouterLink, routerInjectables, Location, RouteParams} from 'angular2/router';
import {BrowserDomAdapter} from 'angular2/src/dom/browser_adapter';
import {FormBuilder, Validators, FORM_DIRECTIVES, ControlGroup, Control} from 'angular2/forms';

import {utils} from 'perfmjs/utils';
import {popup} from 'perfmjs/angular2/directives/popup';

@Component({
    selector: 'toutiao-detail'
})
@View({
    styles: [`
    header {
        display: block;
        z-index: 999;
        overflow: hidden;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
    }
    header .v-btn-prev {
        left: 0px;
        width: 47px;
        padding-left: 5px;
        z-index: 888;
    }
    header .v-btn-prev, .v-header .v-btn-home {
        position: absolute;
        height: 33px;
        top: 6px;
        font-size: 14px;
        line-height: 35px;
        text-align: center;
        color: #fff;
        background: url(/perfmjs/example/angular2-youyue/images/toutiao/backIcon.png) 0 1px no-repeat;
        background-size: 100% auto;
    }
    `],
    templateUrl: `templates/toutiao/detail.html`,
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class ToutiaoDetail {
    router: Router;
    dom:BrowserDomAdapter = new BrowserDomAdapter();
    location:Location;
    cmsId:number;
    title:string;
    source:string;
    sourceUrl:string;
    createTime:string;
    likeCount:number = 0;
    unlikeCount:number = 0;
    comment:Control = new Control('');
    cmsComments:any = [];

    constructor(@Inject(Router) router: Router, @Inject(Location) location:Location, @Inject(RouteParams) routeParams:RouteParams) {
        var self = this, elem = this.dom.querySelector(document, "body");
        this.router = router;
        this.cmsId = routeParams.get("cmsId");
        this.location = location;

        this.dom.removeClass(elem, "withHeader");
        this.dom.removeClass(elem, "article");
        this.dom.removeClass(elem, "utms-toutiao");
        this.dom.removeClass(elem, "utmm-None");
        this.dom.removeClass(elem, "utmc-None");
        this.dom.querySelector(document, "title").textContent = "新闻详情！";

        utils.fetch({url: 'http://localhost:8888/youyue/cms/id/' + this.cmsId}).then(function(jsonData){
            var cms = jsonData.result.cms;
            self.title = cms[2];
            self.dom.querySelector(document, "title").textContent = self.title;
            self.source = cms[4];
            if (cms[5].length>0) {
                self.sourceUrl = cms[5];
            }
            self.createTime = cms[6];
            self.likeCount = cms[8];
            self.unlikeCount = cms[9];
            self.cmsComments = cms[10];
            var articleContent = self.dom.querySelectorAll(document, ".article-content")[0];
            articleContent.innerHTML = cms[7];
        });
    }

    goback() {
        this.location.back();
    }
    like() {
        this.likeCount++;
        utils.fetch({url: 'http://localhost:8888/youyue/cms/like/' + this.cmsId});
    }
    unlike() {
        this.unlikeCount++;
        utils.fetch({url: 'http://localhost:8888/youyue/cms/unlike/' + this.cmsId});
    }
    publish() {
        var self = this;
        if (!utils.toBoolean(this.comment.value)) {
            return;
        }
        utils.fetch({
            url: 'http://localhost:8888/youyue/comment/add',
            method: 'POST',
            jsonParam: {cmsId:self.cmsId,content:self.comment.value}
        }).then(function(jsonData) {
            if (jsonData.status === 'success') {
                var id = jsonData.result.id, createTime = jsonData.result.createTime;
                var user = jsonData.result.user;
                popup.pop("发表评论成功");
                self.cmsComments.splice(0, 0, [id, user, 0, self.comment.value, createTime]);
                self.comment.updateValue("");
            } else if (jsonData.code === 401) {
                popup.pop("请先登录再发表评论！");
            } else {
                popup.pop("提交评论失败，请稍后重试！");
            }
        });
    }
    likeComment(commentIndex:number, commentId:number) {
        var self = this;
        utils.fetch({
            url: 'http://localhost:8888/youyue/comment/like/' + commentId
        }).then(function(jsonData) {
            if (jsonData.status === 'success') {
                self.cmsComments[commentIndex][2] += 1;
            } else {
                popup.pop("点赞失败，请稍后重试！");
            }
        });
    }
}