/**
 * 异步模块测试，参考：http://jasmine.github.io/2.0/introduction.html#section-Asynchronous_Support
 * Created by Administrator on 2014/8/26.
 */
describe("异步模块测试specs", function() {
    var value;
    beforeEach(function(done) {
        setTimeout(function() {
            value = 0;
            done();
        }, 1);
    });
    it("should support async execution of test preparation and expectations", function(done) {
        value++;
        expect(value).toBeGreaterThan(0);
        done();
    });
});
describe("long asynchronous specs", function() {
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });
    it("takes a long time", function(done) {
        setTimeout(function() {
            done();
        }, 2000);
    });
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});