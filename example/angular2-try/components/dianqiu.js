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
    var Dianqiu;
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
            Dianqiu = (function () {
                function Dianqiu(router) {
                    this.router = router;
                    this.init();
                }
                Dianqiu.prototype.init = function () {
                    var $ = jquery_1.JQuery;
                    if (document.getElementById("jsfoot01")) {
                        var scrollup = new ScrollText("jsfoot01");
                        scrollup.LineHeight = 30;
                        scrollup.Amount = 1;
                        scrollup.Delay = 30;
                        scrollup.Start();
                        scrollup.Direction = "up";
                    }
                    $(window).scroll(function () {
                        if ($(window).scrollTop() >= 50) {
                            $(".upCon").fadeIn(100);
                        }
                        else {
                            $(".upCon").fadeOut(100);
                        }
                    });
                    $(".upCon .top").click(function () {
                        $('body,html').animate({ scrollTop: 0 }, 1000);
                        return false;
                    });
                    $(document).mouseup(function (event) {
                        if ($(event.target).parents(".pop").length == 0) {
                            $(".layerBoxCon").hide();
                        }
                        $(".penasLayer .close").click(function () {
                            $(".penasLayer").fadeOut(100);
                        });
                        $(".title2 .more").click(function () {
                            $(".j_rank").fadeIn(100);
                        });
                    });
                    /*点球大战开始*/
                    $('#startPlayBall').on('click', function () {
                        $('#playTips,#playTwinkle,#playTargetArea').show(); // 显示提示文字和显示闪动和点击区域
                        $('#playTargetArea span').addClass('cursor-pointer');
                        $(this).addClass('disabled'); //  让点击按钮禁用
                    });
                    $('#playTargetArea span.targetShootPoint').on('click', function (e) {
                        $('#playTwinkle,#playTargetArea').hide(); // 隐藏闪亮区域和点击区域
                        var $target = $(e.target), $goalkeeperPer = $('#goalkeeperPer'), $footballerPer = $('#footballerPer'), $footballPlay = $('#footballPlay'), playResult = 0, ballPointPositLeft = 0, ballPointPositTop = 0, footballerPerPlayDirec = 0, goalKeeperPerDirec = 0, goalKeeperPerMoveDirec = '+', ballLastMoveDistanceTop = 30, message = '';
                        if ($target.hasClass('areaLeftTop')) {
                            ballPointPositLeft = 80;
                            ballPointPositTop = 12;
                            goalKeeperPerMoveDirec = '-';
                        }
                        else if ($target.hasClass('areaLeftBottom')) {
                            ballPointPositLeft = 80;
                            ballPointPositTop = 40;
                            goalKeeperPerMoveDirec = '-';
                            ballLastMoveDistanceTop = 15;
                        }
                        else if ($target.hasClass('areaCenter')) {
                            ballPointPositLeft = 138;
                            ballPointPositTop = 8;
                        }
                        else if ($target.hasClass('areaRightTop')) {
                            ballPointPositLeft = 200;
                            ballPointPositTop = 12;
                            footballerPerPlayDirec = 1;
                            goalKeeperPerDirec = 1;
                        }
                        else if ($target.hasClass('areaRightBottom')) {
                            ballPointPositLeft = 200;
                            ballPointPositTop = 40;
                            footballerPerPlayDirec = 1;
                            goalKeeperPerDirec = 1;
                            ballLastMoveDistanceTop = 15;
                        }
                        $footballerPer // 踢球动作
                            .animate({ left: '+=10px', top: '+=2px' }, { duration: 500, complete: function () {
                                $(this).removeClass('footballer1').addClass('footballer2'); // 通过换样式给踢球人换动作
                            } })
                            .animate({ left: '+=10px', top: '+=2px' }, { duration: 500 })
                            .animate({ left: '+=12px', top: '+=2px' }, { duration: 200, complete: function () {
                                if (footballerPerPlayDirec == 0) {
                                    $(this).removeClass('footballer2').addClass('footballer4');
                                }
                                else if (footballerPerPlayDirec == 1) {
                                    $(this).removeClass('footballer2').addClass('footballer3');
                                }
                            } })
                            .animate({ left: '+=15px', top: '+=2px' }, { duration: 200, complete: function () {
                                $footballPlay // 球运动
                                    .animate({ left: ballPointPositLeft + 'px', top: ballPointPositTop + 'px' }, 1000) // 球运动到固定点
                                    .animate({ left: '+=5px', top: '+=' + ballLastMoveDistanceTop + 'px' }, 1000); // 然后再下落
                                $goalkeeperPer // 守门员远动
                                    .animate({ left: goalKeeperPerMoveDirec + '=5px', top: '-=1px' }, { duration: 500, complete: function () {
                                        $(this).removeClass('goal-shou').addClass('goal-up'); // 换成上举接球图片
                                    } })
                                    .animate({ left: goalKeeperPerMoveDirec + '=5px', top: '+=1px' }, { duration: 500 })
                                    .animate({ left: goalKeeperPerMoveDirec + '=5px', top: '+=6px' }, { duration: 500, complete: function () {
                                        if (goalKeeperPerDirec == 0 && playResult == 0) {
                                            $(this).removeClass('goal-up').addClass('goal-left');
                                        }
                                        else if (goalKeeperPerDirec == 0 && playResult == 1) {
                                            $footballPlay.hide();
                                            $(this).removeClass('goal-up').addClass('goal-cur-left');
                                        }
                                        else if (goalKeeperPerDirec == 1 && playResult == 0) {
                                            $(this).removeClass('goal-up').addClass('goal-right');
                                        }
                                        else if (goalKeeperPerDirec == 1 && playResult == 1) {
                                            $footballPlay.hide();
                                            $(this).removeClass('goal-up').addClass('goal-cur');
                                        }
                                    } })
                                    .animate({ left: goalKeeperPerMoveDirec + '=5px', top: '+=10px' }, { duration: 500, complete: function () {
                                        if (playResult == 0) {
                                            message = '恭喜您中奖了！哈哈哈！';
                                        }
                                        else if (playResult == 1) {
                                            message = '不好意思，您没有中奖，再接再厉哦！';
                                        }
                                        setTimeout(function () {
                                            if (window.confirm(message)) {
                                                $('#playTips').hide(); // 隐藏提示文字
                                                $footballerPer.removeClass('footballer3 footballer4').addClass('footballer1'); // 踢球人恢复原位
                                                $footballerPer.css({ left: '83px', top: '60px' });
                                                $goalkeeperPer.removeClass('goal-cur goal-cur-left goal-left goal-right').addClass('goal-shou'); // 守门人恢复原位
                                                $goalkeeperPer.css({ top: '30px', left: '120px' });
                                                $footballPlay.css({ left: '137px', top: '122px' }).show(); //球恢复原位
                                                $('#startPlayBall').removeClass('disabled'); // 恢复开始挑战按钮
                                            }
                                        }, 1000);
                                    } });
                            } });
                    });
                };
                Dianqiu.prototype.gotoLogin = function () {
                    this.router.navigate('/login');
                };
                Dianqiu = __decorate([
                    angular2_1.Component({
                        selector: 'dianqiu'
                    }),
                    angular2_1.View({
                        templateUrl: 'templates/dianqiu.html'
                    }),
                    __param(0, di_1.Inject(router_1.Router)), 
                    __metadata('design:paramtypes', [(typeof Router !== 'undefined' && Router) || Object])
                ], Dianqiu);
                return Dianqiu;
            })();
            exports_1("Dianqiu", Dianqiu);
        }
    }
});
