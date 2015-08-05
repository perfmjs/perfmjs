import {utils} from 'perfmjs/utils';

/**
 * 投注基础算法
 */
class BetBaseSuanfa {

    /**
     * 随机选出一个随机数字(前面没有0),e,g 3或10
     * mins,maxs表示选出的随机数在mins到maxs这个范围之间,e.g mins = 1, max = 10
     * killingCodes 表示选出的号码中不能含有的号码,e.g. killingCodes = ['03','04','10']表示选中的号码中不能含有'03'，'04'，'10'这三个号码,注意该数组长度+出号个数不可大于maxs-mins+1
     * 调用例子：rndNumber(1,12,['03','11']);
     */
    rndNumber(mins:number,maxs:number,killingCodes:any):number {
        var codeNum = 1; //选1个号码
        //防止杀掉了所有的号码
        killingCodes = ((killingCodes||[]).length+codeNum>(maxs-mins+1))?[]:(killingCodes||[]);

        var tmp=Math.round(mins+Math.random()*(maxs-mins));
        while(killingCodes.indexOf(this.formartBallNum(tmp,false)) >= 0) {
            tmp=Math.round(mins+Math.random()*(maxs-mins));
        }
        return tmp;
    }

    /*
     * 随机选出一串数字号码，e.g. '01,02,03'
     * mins和maxs表示出号的范围
     * nums表示在mins到maxs范围内出号的个数
     * isChongfu表示出的号码是否可以重复: 0表示不可以重复(false); 1表示可以重复（true）
     * isOrder排序方式：-1小到大，1大到小,0不排序的
     * tmps 原始的数字号码，相当于胆码（如没有则传入空字符串''). e.g. temps = '1,2,11'表示出的号码(假设为'15,16')要放在'1,2,11'字符串之后,即：'1,2,11,15,16'
     × killingCodes 表示选出的号码中不能含有的号码,e.g. killingCodes = ['03','04','10']表示选中的号码中不能含有'03'，'04'，'10'这三个号码,注意该数组长度+出号个数不可大于maxs-mins+1
     * fillIntWith2Char: true-e.g.将'1,4,5,12'变成"01,04,05,12", 默认为false-e.g.将'01,04,5,12'变成"1,4,5,12"
     * 如：rndNumbersAndFormat(1,5,3,0,-1,'01,02,11',['01','02','03'],true) 得到从1-5之间3个数字组成的串,不可以重复,并且从小到大排序
     * 如机选红球：rndNumbersAndFormat(1,33,6,0,-1,'',[],true)
     */
    rndNumbersAndFormat(mins:number,maxs:number,nums:number,isChongfu:number,isOrder:number,tmps:string,killingCodes:any, fillIntWith2Char:boolean):string {
        fillIntWith2Char = fillIntWith2Char || false;
        if(nums < 1){return '';}
        // 防止杀掉了所有的号码
        killingCodes = ((killingCodes||[]).length+nums>(maxs-mins+1))?[]:(killingCodes||[]);
        if (typeof(mins) != "number" || typeof(maxs) != "number"||typeof(nums) != "number") {
            return '';
        }
        isOrder = isOrder || 0;
        isChongfu = isChongfu || 0;
        if (tmps == undefined || tmps.length < 1) tmps = ""; else tmps = "," + tmps;
        var tnum:number;
        for (var i = 1; i <= nums; i++) {
            tnum = this.rndNumber(mins, maxs, killingCodes);
            if (!isChongfu) {
                while ((this.formartBallNum(tmps, fillIntWith2Char)+",").indexOf(","+this.formartBallNum(tnum, fillIntWith2Char)+",") != -1) {
                    tnum = this.rndNumber(mins, maxs, killingCodes)
                }
            }
            tmps = tmps + "," + tnum;
        }
        tmps = tmps.substr(1);
        tmps = this.getSorts(tmps, isOrder);
        return this.formartBallNum(tmps, fillIntWith2Char);
    }

    /**
     * 将小于10的球号码数前加0或去掉0,如将'1,4,5,12'变成"01,04,05,12"
     * fillIntWith2Char: true-e.g.将'1,4,5,12'变成"01,04,05,12", 默认为false-e.g.将'01,04,5,12'变成"1,4,5,12"
     */
    formartBallNum(balls:any, fillIntWith2Char:boolean):string {
        var ballArray = [];
        fillIntWith2Char = fillIntWith2Char || false;
        if (fillIntWith2Char) {
            utils.forEach(balls.toString().split(','), function(item) {
                ballArray[ballArray.length] = (utils.toNumber(item)<10&&item.length<2)?'0'+item:item;
            });
        } else {
            utils.forEach(balls.toString().split(','), function(item) {
                ballArray[ballArray.length] = utils.toNumber(item)+"";
            });
        }
        return ballArray.join(',');
    }

    //isOrder =-1 小到大，1大到小,0不排序
    getSorts(mins:string,isOrder:number):string {
        var tmps=mins||'1';
        if(Math.abs(isOrder)==1)tmps=isOrder==1?tmps.split(",").sort(function(x,y){return parseFloat(x)>parseFloat(y)?-1:1}).join(","):tmps.split(",").sort(function(x,y){return parseFloat(x)>parseFloat(y)?1:-1}).join(",");
        return tmps;
    }

    /*FIXME, 计算选择的注数(该方法有待完善), e.g getCodeNumber(6,7,2) */
    getCodeNumber(redNumOfOneZhu:number, redNum:number, blueNum:number):number {
        if(redNum<redNumOfOneZhu) return 0;
        if(blueNum==0) return 0;
        if(redNum==redNumOfOneZhu) return blueNum;
        var tempNum:number=1;
        for(var i=redNumOfOneZhu+1;i<=redNum;i++) {
            tempNum=tempNum*i;
        }
        for(var i=2;i<=redNum-redNumOfOneZhu;i++) {
            tempNum=tempNum/i;
        }
        return tempNum*blueNum;
    }

    /**
     * 计算胆拖玩法中拖区的选号组合结果(假设胆区和其它非胆拖区选号数都为1个)
     * minSumOfDanPlusTuo:构成一单注的选胆和选拖号码数的最小和值(如构成一单注中选胆为5,选拖为1,则最小和值为6)
     */
    combinDanTuoArea(minSumOfDanPlusTuo:number, dan:number, tuo:number):number {
        if (dan<=0 || dan>=minSumOfDanPlusTuo) return 0;
        return this.combination(tuo, minSumOfDanPlusTuo - dan, true);
    }

    /**
     * 排列组合算法: m为下标，n为上标  ,m为拖号个数,n为"6-胆码数"
     * iszhuhe: 是组合算法-true, 排列算法: false
     */
    combination(m:number, n:number,iszhuhe:boolean):number {
        if(m<0||n<0||m<n) return 0;
        iszhuhe = (iszhuhe==undefined)?true:iszhuhe;
        //数据不符合要求，返回错误信息
        if (iszhuhe) n=n<(m-n)?n:m-n;//C(m,n)=C(m,m-n)
        if(n==0) return 1;
        var result:number = m;//C(m,1);
        for(var i=2,j=result-1;i<=n;i++,j--) {
            result=result*j/(iszhuhe?i:1);//得到C(m,i)
        }
        return (result<=0)?0:result;
    }
}

export var betBaseSuanfa = new BetBaseSuanfa();