import {Component, View} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {RouteConfig, Router, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';

import {JQuery} from 'perfmjs/jquery';

@Component({
    selector: 'dianqiu'
})
@View({
    templateUrl: 'templates/dianqiu.html'
})
export class Dianqiu {

    router: Router;

    constructor(@Inject(Router) router: Router) {
        this.router = router;
        this.init();
    }

    init() {
        var $ = JQuery;
        if(document.getElementById("jsfoot01")){
            var scrollup = new ScrollText("jsfoot01");
            scrollup.LineHeight = 30;
            scrollup.Amount = 1;
            scrollup.Delay = 30;
            scrollup.Start();
            scrollup.Direction = "up";
        }

        $(window).scroll(function(){
            if ($(window).scrollTop() >= 50){
                $(".upCon").fadeIn(100);
            }
            else
            {
                $(".upCon").fadeOut(100);

            }
        });
        $(".upCon .top").click(function(){
            $('body,html').animate({scrollTop:0},1000);
            return false;
        });

        $(document).mouseup(function(event){
            if($(event.target).parents(".pop").length==0)
            {
                $(".layerBoxCon").hide();
            }
            $(".penasLayer .close").click(function(){
                $(".penasLayer").fadeOut(100)
            })
            $(".title2 .more").click(function(){
                $(".j_rank").fadeIn(100)
            })
        });

        /*点球大战开始*/
        $('#startPlayBall').on('click', function(){
            $('#playTips,#playTwinkle,#playTargetArea').show();          // 显示提示文字和显示闪动和点击区域
            $('#playTargetArea span').addClass('cursor-pointer');
            $(this).addClass('disabled');                               //  让点击按钮禁用
        });

        $('#playTargetArea span.targetShootPoint').on('click', function(e){      // 门框内5个区域的点击事件
            $('#playTwinkle,#playTargetArea').hide();               // 隐藏闪亮区域和点击区域
            var $target = $(e.target),                         // 当前点击的目标对象
                $goalkeeperPer = $('#goalkeeperPer'),       // 守门员
                $footballerPer = $('#footballerPer'),       // 踢球者
                $footballPlay  = $('#footballPlay'),        // 球
                playResult = 0, // 输赢结果 0 -- 表示球进了，守门人没有接到球,1-- 表示球进去了，守门人没有接到
                ballPointPositLeft = 0,                       // 球飞出去后定点位置左
                ballPointPositTop = 0,                        // 球飞出去后定点位置上
                footballerPerPlayDirec = 0,                   // 踢球人提出球的方向 0-- 左边, 1 -- 右边
                goalKeeperPerDirec = 0,                       // 守门人接球倒的方向 0 -- 左边, 1-- 右边
                goalKeeperPerMoveDirec = '+',                   // 守门人去接球移动的方向 + -- 右 , - -- 左边
                ballLastMoveDistanceTop = 30,                    //  球进入网中后远动的距离
                message = '';

            if($target.hasClass('areaLeftTop')){             // 点击地点是球框左上位置
                ballPointPositLeft = 80;
                ballPointPositTop = 12;
                goalKeeperPerMoveDirec = '-';
            }else if($target.hasClass('areaLeftBottom')){    // 点击地点是球框左下位置
                ballPointPositLeft = 80;
                ballPointPositTop = 40;
                goalKeeperPerMoveDirec = '-';
                ballLastMoveDistanceTop = 15;
            }else if($target.hasClass('areaCenter')){    // 点击地点是球框中间位置
                ballPointPositLeft = 138;
                ballPointPositTop = 8;
            }else if($target.hasClass('areaRightTop')){    // 点击地点是球框右上位置
                ballPointPositLeft = 200;
                ballPointPositTop = 12;
                footballerPerPlayDirec = 1;
                goalKeeperPerDirec = 1;
            }else if($target.hasClass('areaRightBottom')){    // 点击地点是球框右下位置
                ballPointPositLeft = 200;
                ballPointPositTop = 40;
                footballerPerPlayDirec = 1;
                goalKeeperPerDirec = 1;
                ballLastMoveDistanceTop = 15;
            }

            $footballerPer                                            // 踢球动作
                .animate( { left:'+=10px', top: '+=2px'}, {duration:500, complete:function(){
                    $(this).removeClass('footballer1').addClass('footballer2'); // 通过换样式给踢球人换动作
                }})
                .animate({left:'+=10px', top: '+=2px'},{duration:500})
                .animate({ left:'+=12px', top: '+=2px'}, {duration:200, complete:function(){
                    if(footballerPerPlayDirec == 0){                                  // 根据踢球方向换不同方向的图片
                        $(this).removeClass('footballer2').addClass('footballer4');
                    }else if(footballerPerPlayDirec == 1){
                        $(this).removeClass('footballer2').addClass('footballer3');
                    }
                }})
                .animate({ left: '+=15px', top: '+=2px' },{duration:200, complete:function(){
                    $footballPlay                                                     // 球运动
                        .animate({left: ballPointPositLeft+'px',top: ballPointPositTop+'px' },1000) // 球运动到固定点
                        .animate({left: '+=5px',top: '+='+ballLastMoveDistanceTop+'px' },1000);  // 然后再下落

                    $goalkeeperPer                                                  // 守门员远动
                        .animate({ left: goalKeeperPerMoveDirec+'=5px', top: '-=1px'}, {duration:500, complete:function(){
                            $(this).removeClass('goal-shou').addClass('goal-up');  // 换成上举接球图片
                        }})
                        .animate({left: goalKeeperPerMoveDirec+'=5px', top: '+=1px'},{duration:500})
                        .animate({ left: goalKeeperPerMoveDirec+'=5px', top: '+=6px'}, {duration:500, complete:function(){
                            if(goalKeeperPerDirec == 0 && playResult == 0){
                                $(this).removeClass('goal-up').addClass('goal-left');
                            }else if(goalKeeperPerDirec == 0 && playResult == 1){
                                $footballPlay.hide();
                                $(this).removeClass('goal-up').addClass('goal-cur-left');
                            }else if(goalKeeperPerDirec == 1 && playResult == 0){
                                $(this).removeClass('goal-up').addClass('goal-right');
                            }else if(goalKeeperPerDirec == 1 && playResult == 1){
                                $footballPlay.hide();
                                $(this).removeClass('goal-up').addClass('goal-cur');
                            }
                        }})
                        .animate({left: goalKeeperPerMoveDirec+'=5px', top: '+=10px'},{duration:500, complete:function(){
                            if(playResult == 0){
                                message = '恭喜您中奖了！哈哈哈！';
                            }else if(playResult == 1){
                                message = '不好意思，您没有中奖，再接再厉哦！';
                            }

                            setTimeout(function(){
                                if(window.confirm(message)){
                                    $('#playTips').hide();          // 隐藏提示文字
                                    $footballerPer.removeClass('footballer3 footballer4').addClass('footballer1');      // 踢球人恢复原位
                                    $footballerPer.css({left: '83px',top: '60px'});
                                    $goalkeeperPer.removeClass('goal-cur goal-cur-left goal-left goal-right').addClass('goal-shou');   // 守门人恢复原位
                                    $goalkeeperPer.css({top: '30px', left:'120px'});
                                    $footballPlay.css({left: '137px',top: '122px'}).show();     //球恢复原位
                                    $('#startPlayBall').removeClass('disabled');               // 恢复开始挑战按钮
                                }
                            }, 1000);
                        }});
                }} );
        });
    }

    gotoLogin() {
        this.router.navigate('/login');
    }
}