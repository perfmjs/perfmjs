describe("core核心", function() {

    beforeEach(function() {
    });

    it("model应该能运行正常", function() {
        perfmjs.ready(document, function() {
            perfmjs.model.plan.multiple(20);
            expect(perfmjs.model.plan.multiple()).toEqual(20);
        });
    });
    it("event应该能运行正常", function() {
        perfmjs.ready(document, function() {
            perfmjs.app.newInstance();
            perfmjs.app.instance.unregister('lottevent');
            perfmjs.app.instance.register('lottevent', perfmjs.lottevent);
            perfmjs.app.instance.startAll();
            perfmjs.lottevent.instance.buy(999);
            expect(perfmjs.model.plan.multiple()).toEqual(999);
        });
    });
    it("aop功能应该可以正常运行", function() {
        perfmjs.ready(document, function() {
            var aop = perfmjs.utils.aop(this, perfmjs.model.plan.multiple, function(){return 2}, function(){return 3});
            perfmjs.model.plan.multiple = aop;
            expect(perfmjs.model.plan.multiple()).toEqual(2);
        });
    });
    it("opera功能应该可以正常运行", function() {
        perfmjs.ready(document, function() {
            perfmjs.app.newInstance();
            perfmjs.app.instance.unregister('lottevent');
            perfmjs.app.instance.register('lottevent', perfmjs.lottevent);
            perfmjs.app.instance.startAll();
            perfmjs.ssqopera.newInstance();
            expect(perfmjs.model.plan.multiple()).toEqual(2);
        });
    });
    it("fsm功能应该可以正常运行", function() {
        perfmjs.ready(document, function() {
            perfmjs.ssqfsm.newInstance().event('changePlay');
            expect(perfmjs.ssqfsm.instance.current()).toEqual('dantuo');
        });
    });
    it("ajax功能应该可以正常运行", function() {
        beforeEach(function() {
            jasmine.Ajax.install();
        });
        afterEach(function() {
            jasmine.Ajax.uninstall();
        });

        it("allows use in a single spec", function() {
            var doneFn = jasmine.createSpy('success');
            jasmine.Ajax.withMock(function() {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function(arguments) {
                    if (this.readyState == this.DONE) {
                        doneFn(this.responseText);
                    }
                };

                xhr.open("GET", "/some/cool/url");
                xhr.send();

                expect(doneFn).not.toHaveBeenCalled();

                jasmine.Ajax.requests.mostRecent().response({
                    "status": 200,
                    "responseText": 'in spec response'
                });

                expect(doneFn).toHaveBeenCalledWith('in spec response');
            });
        });
    });
});