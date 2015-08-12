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
};System.register(['angular2/angular2', '../services/common-service'], function(exports_1) {
    var angular2_1, common_service_1;
    var MainHeader, MainFooter, MainRight, DetailHeader, DetailFooter, DetailRight, DetailSNS, DetailMoreArticle;
    return {
        setters:[
            function (_angular2_1) {
                angular2_1 = _angular2_1;
            },
            function (_common_service_1) {
                common_service_1 = _common_service_1;
            }],
        execute: function() {
            MainHeader = (function () {
                function MainHeader(commonService) {
                    this.commonService = commonService;
                }
                MainHeader.prototype.gotoMainPage = function () {
                    this.commonService.gotoMainPage();
                };
                MainHeader.prototype.gotoDetailPage = function () {
                    this.commonService.gotoDetailPage();
                };
                MainHeader = __decorate([
                    angular2_1.Component({
                        selector: 'biz-header'
                    }),
                    angular2_1.View({ templateUrl: 'templates/main/biz-index.html' }), 
                    __metadata('design:paramtypes', [common_service_1.CommonService])
                ], MainHeader);
                return MainHeader;
            })();
            exports_1("MainHeader", MainHeader);
            MainFooter = (function () {
                function MainFooter() {
                }
                MainFooter = __decorate([
                    angular2_1.Component({ selector: 'biz-footer' }),
                    angular2_1.View({ templateUrl: 'templates/main/biz-footer.html' }), 
                    __metadata('design:paramtypes', [])
                ], MainFooter);
                return MainFooter;
            })();
            exports_1("MainFooter", MainFooter);
            MainRight = (function () {
                function MainRight() {
                }
                MainRight = __decorate([
                    angular2_1.Component({ selector: 'biz-right' }),
                    angular2_1.View({ templateUrl: 'templates/main/biz-right.html' }), 
                    __metadata('design:paramtypes', [])
                ], MainRight);
                return MainRight;
            })();
            exports_1("MainRight", MainRight);
            DetailHeader = (function () {
                function DetailHeader() {
                }
                DetailHeader = __decorate([
                    angular2_1.Component({ selector: 'biz-header' }),
                    angular2_1.View({ templateUrl: 'templates/detail/biz-index.html' }), 
                    __metadata('design:paramtypes', [])
                ], DetailHeader);
                return DetailHeader;
            })();
            exports_1("DetailHeader", DetailHeader);
            DetailFooter = (function () {
                function DetailFooter() {
                }
                DetailFooter = __decorate([
                    angular2_1.Component({ selector: 'biz-footer' }),
                    angular2_1.View({ templateUrl: 'templates/detail/biz-footer.html' }), 
                    __metadata('design:paramtypes', [])
                ], DetailFooter);
                return DetailFooter;
            })();
            exports_1("DetailFooter", DetailFooter);
            DetailRight = (function () {
                function DetailRight() {
                }
                DetailRight = __decorate([
                    angular2_1.Component({ selector: 'biz-right' }),
                    angular2_1.View({ templateUrl: 'templates/detail/biz-right.html' }), 
                    __metadata('design:paramtypes', [])
                ], DetailRight);
                return DetailRight;
            })();
            exports_1("DetailRight", DetailRight);
            DetailSNS = (function () {
                function DetailSNS() {
                }
                DetailSNS = __decorate([
                    angular2_1.Component({ selector: 'biz-sns' }),
                    angular2_1.View({ templateUrl: 'templates/detail/biz-sns.html' }), 
                    __metadata('design:paramtypes', [])
                ], DetailSNS);
                return DetailSNS;
            })();
            exports_1("DetailSNS", DetailSNS);
            DetailMoreArticle = (function () {
                function DetailMoreArticle() {
                }
                DetailMoreArticle = __decorate([
                    angular2_1.Component({ selector: 'biz-morearticle' }),
                    angular2_1.View({ templateUrl: 'templates/detail/biz-morearticle.html' }), 
                    __metadata('design:paramtypes', [])
                ], DetailMoreArticle);
                return DetailMoreArticle;
            })();
            exports_1("DetailMoreArticle", DetailMoreArticle);
        }
    }
});
