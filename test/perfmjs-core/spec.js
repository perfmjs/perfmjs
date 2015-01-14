describe("core核心", function() {
    beforeEach(function() {
    });

    it("utils应该能运行正常", function() {
        perfmjs.ready(function($$, app) {
            $$.utils.forEach(['one', 'two', 'three'], function(item, index) {
                expect(item).toEqual(['one', 'two', 'three'][index]);
            });
        });
    });
    it("应能测试通过perfmjs.utils.fastBind方法", function() {
        perfmjs.ready(function($$, app) {
            var fastBind = $$.utils._fastBind(function(arg) {
                return 100 + arg;
            }, null);

            var fastBind2 = $$.utils._fastBind(function(arg1, arg2, arg3, arg4) {
                return 100 + arg1 + arg2 + arg3 + arg4;
            }, null, 100);
            expect(fastBind(100)).toEqual(200);
            expect(fastBind2(1, 2, 3)).toEqual(206);
        });
    });
    it("应能测试通过perfmjs.utils.fmtJSONMsg方法", function() {
        perfmjs.ready(function($$, app) {
            expect($$.utils.fmtJSONMsg().status).toEqual('fail');
            expect($$.utils.fmtJSONMsg(new Date).status).toEqual('success');
            expect($$.utils.fmtJSONMsg('{"key":1}').result.key).toEqual(1);
            expect($$.utils.fmtJSONMsg('{"key":1}').status).toEqual('success');
            expect($$.utils.fmtJSONMsg({"key":1}).result.key).toEqual(1);
            expect($$.utils.fmtJSONMsg({"key":2}).status).toEqual('success');
        });
    });
    it("应能测试通过perfmjs.utils.type方法", function() {
        perfmjs.ready(function($$, app) {
            expect($$.utils.type(new Date)).toEqual('date');
            expect($$.utils.type({})).toEqual('object');
            expect($$.utils.type([1,2])).toEqual('array');
        });
    });
    it("应能测试通过joquery.lib-updateOrInsert", function () {
        perfmjs.ready(function($$, app) {
            var data = [
                { ID: 1, firstName: "Chris", lastName: "Pearson", BookIDs: [1001, 1002, 1003] },
                { ID: 9, firstName: "Bernard", lastName: "Sutherland", BookIDs: [1001, 2002, 3003] },
                { ID: 20, firstName: "Kate", lastName: "Pinkerton", BookIDs: [4001, 3002, 2003] }
            ];
            var result = $$.joquery.newInstance(data).updateOrInsert({ID: 0, firstName: "Chris", lastName: "Pearson", BookIDs: [1001, 1002, 1003]}, function(item, index) {
                return item.ID == 9;
            }, function(item, index) {
                return item.ID > 15;
            });
            expect(result.index).toEqual(1);
        });
    });
    it("应能测试通过joquery.lib-first", function () {
        perfmjs.ready(function($$, app) {
            var data = [
                { ID: 1, firstName: "Chris", lastName: "Pearson", BookIDs: [1001, 1002, 1003] },
                { ID: 9, firstName: "Kate", lastName: "Sutherland", BookIDs: [1001, 2002, 3003] },
                { ID: 20, firstName: "Kate", lastName: "Pinkerton", BookIDs: [4001, 3002, 2003] }
            ];
            var first = $$.joquery.newInstance(data).first(function(item, index) {
                return item.firstName === 'Kate';
            });
            var last = $$.joquery.newInstance(data).last(function(item, index) {
                    return item.firstName === 'Kate';
            });
            expect(first.ID).toEqual(9);
            expect(last.ID).toEqual(20);
        });
    });
    it("perfmjs.utils#keys应该能运行正常", function() {
        perfmjs.ready(function($$, app) {
            var arr = [1,2,3,4,5];
            var jsonObj = {'a':1, 'b':2};
            expect($$.utils.keys(arr).length).toEqual(5);
            expect($$.utils.keys(jsonObj).length).toEqual(2);
        });
    });
    it("event应该能运行正常", function() {
        perfmjs.ready(function($$, app) {
            app.unregister('lottevent');
            app.register($$.lottevent);
            app.startAll();
            $$.lottevent.instance.buy(999);
            expect($$.model.plan.multiple()).toEqual(999);
        });
    });
    it("aop功能应该可以正常运行", function() {
        perfmjs.ready(function($$, app) {
            var aop = perfmjs.utils.aop(this, perfmjs.model.plan.multiple, function(){return 2}, function(){return 3});
            perfmjs.model.plan.multiple = aop;
            expect(perfmjs.model.plan.multiple()).toEqual(2);
        });
    });
    it("没使用setTimeout的错误场景应该可以正常运行", function() {
        var getTryObj = function(callback) {
            callback();
            return {
                try: function() {console.log("settimeout running try1....");}
            };
        };
        try {
            var tryObj = getTryObj(function () {
                tryObj.try();
            });
        } catch (e) {
            console.log("error happened!-" + e);
        }
        expect(1).toEqual(1);
    });

    it("使用setTimeout的最佳场景应该可以正常运行", function() {
        var getTryObj = function(callback) {
            callback();
            return {
                try: function() {console.log("settimeout running try2....");}
            };
        };
        var tryObj = getTryObj(function () {
            setTimeout(function(){tryObj.try();}, 0);
        });
        expect(1).toEqual(1);
    });

    it("setTimeout功能应该可以正常运行", function() {
        var result = 0, sum = 0, testSetTimeout = function () {
            for (var k = 1; k <= 3; k++) {
                setTimeout(function () {
                    result += k;
                    console.log("setTimeout result=" + result);
                }, 0);
            }
        };
        testSetTimeout();
        for (var j = 1; j < 999999; j++) {
            sum += j;
        }
        result = 1000;
        expect(result).toEqual(1000);
    });

    it('应能正确运行async的功能', function(done) {
        var deferred = perfmjs.async.defer();
        deferred.promise.then(function(result) {
            expect(result).toEqual('ok');
            done();
        });
        perfmjs.utils.nextTick(function() {
            deferred.resolve('ok');
        });
    });
});