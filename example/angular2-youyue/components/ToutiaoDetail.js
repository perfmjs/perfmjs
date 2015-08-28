var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};System.register(['angular2/angular2', 'angular2/di', 'angular2/router', 'angular2/src/dom/browser_adapter', 'angular2/forms', 'perfmjs/utils', 'perfmjs/angular2/directives/popup'], function(exports_1) {
    var angular2_1, di_1, router_1, browser_adapter_1, forms_1, utils_1, popup_1;
    var ToutiaoDetail;
    return {
        setters:[
            function (_angular2_1) {
                angular2_1 = _angular2_1;
            },
            function (_di_1) {
                di_1 = _di_1;
            },
            function (_router_1) {
                router_1 = _router_1;
            },
            function (_browser_adapter_1) {
                browser_adapter_1 = _browser_adapter_1;
            },
            function (_forms_1) {
                forms_1 = _forms_1;
            },
            function (_utils_1) {
                utils_1 = _utils_1;
            },
            function (_popup_1) {
                popup_1 = _popup_1;
            }],
        execute: function() {
            ToutiaoDetail = (function () {
                function ToutiaoDetail(router, location, routeParams) {
                    this.dom = new browser_adapter_1.BrowserDomAdapter();
                    this.likeCount = 0;
                    this.unlikeCount = 0;
                    this.comment = new forms_1.Control('');
                    this.cmsComments = [];
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
                    utils_1.utils.fetch({ url: 'http://localhost:8888/youyue/cms/id/' + this.cmsId }).then(function (jsonData) {
                        var cms = jsonData.result.cms;
                        self.title = cms[2];
                        self.dom.querySelector(document, "title").textContent = self.title;
                        self.source = cms[4];
                        if (cms[5].length > 0) {
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
                ToutiaoDetail.prototype.goback = function () {
                    this.location.back();
                };
                ToutiaoDetail.prototype.like = function () {
                    this.likeCount++;
                    utils_1.utils.fetch({ url: 'http://localhost:8888/youyue/cms/like/' + this.cmsId });
                };
                ToutiaoDetail.prototype.unlike = function () {
                    this.unlikeCount++;
                    utils_1.utils.fetch({ url: 'http://localhost:8888/youyue/cms/unlike/' + this.cmsId });
                };
                ToutiaoDetail.prototype.publish = function () {
                    var self = this;
                    if (!utils_1.utils.toBoolean(this.comment.value)) {
                        return;
                    }
                    utils_1.utils.fetch({
                        url: 'http://localhost:8888/youyue/comment/add',
                        method: 'POST',
                        jsonParam: { cmsId: self.cmsId, content: self.comment.value }
                    }).then(function (jsonData) {
                        if (jsonData.status === 'success') {
                            var id = jsonData.result.id, createTime = jsonData.result.createTime;
                            var user = jsonData.result.user;
                            popup_1.popup.pop("发表评论成功");
                            self.cmsComments.splice(0, 0, [id, user, 0, self.comment.value, createTime]);
                            self.comment.updateValue("");
                        }
                        else if (jsonData.code === 401) {
                            popup_1.popup.pop("请先登录再发表评论！");
                        }
                        else {
                            popup_1.popup.pop("提交评论失败，请稍后重试！");
                        }
                    });
                };
                ToutiaoDetail.prototype.likeComment = function (commentIndex, commentId) {
                    var self = this;
                    utils_1.utils.fetch({
                        url: 'http://localhost:8888/youyue/comment/like/' + commentId
                    }).then(function (jsonData) {
                        if (jsonData.status === 'success') {
                            self.cmsComments[commentIndex][2] += 1;
                        }
                        else {
                            popup_1.popup.pop("点赞失败，请稍后重试！");
                        }
                    });
                };
                ToutiaoDetail = __decorate([
                    angular2_1.Component({
                        selector: 'toutiao-detail'
                    }),
                    angular2_1.View({
                        styles: ["\n    header {\n        display: block;\n        z-index: 999;\n        overflow: hidden;\n        position: fixed;\n        top: 0;\n        left: 0;\n        right: 0;\n    }\n    header .v-btn-prev {\n        left: 0px;\n        width: 47px;\n        padding-left: 5px;\n        z-index: 888;\n    }\n    header .v-btn-prev, .v-header .v-btn-home {\n        position: absolute;\n        height: 33px;\n        top: 6px;\n        font-size: 14px;\n        line-height: 35px;\n        text-align: center;\n        color: #fff;\n        background: url(/perfmjs/example/angular2-youyue/images/toutiao/backIcon.png) 0 1px no-repeat;\n        background-size: 100% auto;\n    }\n    "],
                        templateUrl: "templates/toutiao/detail.html",
                        directives: [angular2_1.CORE_DIRECTIVES, forms_1.FORM_DIRECTIVES]
                    }),
                    __param(0, di_1.Inject(router_1.Router)),
                    __param(1, di_1.Inject(router_1.Location)),
                    __param(2, di_1.Inject(router_1.RouteParams)), 
                    __metadata('design:paramtypes', [(typeof Router !== 'undefined' && Router) || Object, (typeof Location !== 'undefined' && Location) || Object, (typeof RouteParams !== 'undefined' && RouteParams) || Object])
                ], ToutiaoDetail);
                return ToutiaoDetail;
            })();
            exports_1("ToutiaoDetail", ToutiaoDetail);
        }
    }
});
