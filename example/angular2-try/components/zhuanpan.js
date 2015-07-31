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
};System.register(['angular2/angular2', 'angular2/di', 'angular2/router', 'perfmjs/jquery'], function(exports_1) {
    var angular2_1, di_1, router_1, jquery_1;
    var Zhuanpan;
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
            function (_jquery_1) {
                jquery_1 = _jquery_1;
            }],
        execute: function() {
            Zhuanpan = (function () {
                function Zhuanpan(router) {
                    this.router = router;
                    this.init();
                }
                Zhuanpan.prototype.init = function () {
                    var $ = jquery_1.JQuery;
                    $('#winningInfo').jcMarquee({ 'speed': 15, 'margin_right': '100px' }); // 初始化文字无限滚动插件
                    $(".Instructions h3").click(function () {
                        if ($(this).next().is(":hidden")) {
                            $(this).next().fadeIn(10);
                            $(this).children("i").addClass("down");
                        }
                        else {
                            $(this).next().fadeOut(10);
                            $(this).children("i").removeClass("down");
                        }
                    });
                    $(".layerBoxCon .close").click(function () {
                        $(".layerBoxCon").fadeOut(100);
                    });
                    $(".j_example").click(function () {
                        $(".j_example_c").show();
                    });
                    // jQueryRotate是一个简单的jQuery插件能够直接在浏览器端通过给定一个角度来旋转图片。jQueryRotate使用HTML5 Canvas元素和IE的VML技术来实现此功能。　VML是The Vector Markup Language(矢量可标记语言)的缩写。
                    function rotateFunc(awards, angle, text) {
                        var $wheelTurnLayer = $('#wheelTurnLayer'); // 获得需要转动的层
                        $wheelTurnLayer.stopRotate();
                        $wheelTurnLayer.rotate({
                            angle: 0,
                            duration: 8000,
                            animateTo: angle + 3600,
                            callback: function () {
                                setTimeout(function () {
                                    alert(text);
                                    $wheelTurnLayer.rotate({ angle: 0 }); //  使开始抽奖指针回归原位
                                    $("#lotteryBtn").removeClass('disabled'); // 开始抽奖按钮解除禁用状态
                                }, 400);
                            }
                        });
                    }
                    ;
                    $("#lotteryBtn").on('click', function () {
                        $("#lotteryBtn").addClass('disabled'); // 点击开始抽奖后把按钮变成禁用状态
                        var awards = Math.floor(Math.random() * (5 - 1) + 1); // 随机产生一个1-5 的随机数
                        console.log('产生的随机数是 : ' + awards);
                        if (awards == 1) {
                            rotateFunc(1, 32, '恭喜您抽中10元抵扣卷');
                        }
                        else if (awards == 2) {
                            rotateFunc(2, 102, '恭喜您抽中5元彩金卡');
                        }
                        else if (awards == 3) {
                            rotateFunc(3, 186, '恭喜您抽中充20送8优惠劵');
                        }
                        else if (awards == 4) {
                            rotateFunc(4, 265, '恭喜您抽中免单无上限');
                        }
                        else if (awards == 5) {
                            rotateFunc(5, 328, '恭喜您抽中8元抵扣卷');
                        }
                    });
                };
                Zhuanpan.prototype.gotoLogin = function () {
                    this.router.navigate('/login');
                };
                Zhuanpan = __decorate([
                    angular2_1.Component({
                        selector: 'zhuanpan'
                    }),
                    angular2_1.View({
                        templateUrl: 'templates/zhuanpan.html'
                    }),
                    __param(0, di_1.Inject(router_1.Router)), 
                    __metadata('design:paramtypes', [(typeof Router !== 'undefined' && Router) || Object])
                ], Zhuanpan);
                return Zhuanpan;
            })();
            exports_1("Zhuanpan", Zhuanpan);
        }
    }
});
