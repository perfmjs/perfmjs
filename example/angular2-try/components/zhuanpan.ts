import {Component, View} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {RouteConfig, Router, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';

import {JQuery} from 'perfmjs/jquery';

@Component({
    selector: 'zhuanpan'
})
@View({
    templateUrl: 'templates/zhuanpan.html'
})
export class Zhuanpan {

    router: Router;

    constructor(@Inject(Router) router: Router) {
        this.router = router;
        this.init();
    }

    init() {
        var $ = JQuery;
        $('#winningInfo').jcMarquee({'speed':15,'margin_right':'100px'});   // 初始化文字无限滚动插件

        $(".Instructions h3").click(function(){
            if($(this).next().is(":hidden")){
                $(this).next().fadeIn(10);
                $(this).children("i").addClass("down");
            }
            else{
                $(this).next().fadeOut(10);
                $(this).children("i").removeClass("down");
            }
        });
        $(".layerBoxCon .close").click(function(){
            $(".layerBoxCon").fadeOut(100);
        });
        $(".j_example").click(function(){
            $(".j_example_c").show();
        });

        // jQueryRotate是一个简单的jQuery插件能够直接在浏览器端通过给定一个角度来旋转图片。jQueryRotate使用HTML5 Canvas元素和IE的VML技术来实现此功能。　VML是The Vector Markup Language(矢量可标记语言)的缩写。
        function rotateFunc(awards,angle,text){  //awards:奖项，angle:奖项对应的角度，text 抽中对应说明文字
            var $wheelTurnLayer = $('#wheelTurnLayer'); // 获得需要转动的层
            $wheelTurnLayer.stopRotate();
            $wheelTurnLayer.rotate({    // 调用插件
                angle:0,               //起始角度
                duration: 8000,       //转动时间
                animateTo: angle+3600, //angle是图片上各奖项对应的角度，3600是我要让指针旋转10圈。所以最后的结束的角度就是这样子^^
                callback:function(){     //回调函数
                    setTimeout(function() {
                        alert(text);
                        $wheelTurnLayer.rotate({angle:0});    //  使开始抽奖指针回归原位
                        $("#lotteryBtn").removeClass('disabled');  // 开始抽奖按钮解除禁用状态
                    }, 400);
                }
            });
        };

        $("#lotteryBtn").on( 'click', function(){       //  开始抽奖按钮的点击事件
            $("#lotteryBtn").addClass('disabled');     // 点击开始抽奖后把按钮变成禁用状态
            var awards = Math.floor(Math.random() * (5- 1) + 1);  // 随机产生一个1-5 的随机数
            console.log('产生的随机数是 : ' + awards);

            if(awards ==1){                    // 根据结果控制开始抽奖指针的旋转位置和提示语句
                rotateFunc(1,32,'恭喜您抽中10元抵扣卷');
            }else if(awards ==2){
                rotateFunc(2,102,'恭喜您抽中5元彩金卡');
            }else if(awards ==3){
                rotateFunc(3,186,'恭喜您抽中充20送8优惠劵');
            }else if(awards ==4){
                rotateFunc(4,265,'恭喜您抽中免单无上限');
            }else if(awards ==5){
                rotateFunc(5,328,'恭喜您抽中8元抵扣卷');
            }
        });
    }

    gotoLogin() {
        this.router.navigate('/login');
    }
}