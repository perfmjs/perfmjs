var core_1 = require('perfmjs/core');
var CommonService = (function () {
    function CommonService() {
        this.globalRef = core_1.Perfmjs.globalRef.newInstance();
    }
    CommonService.prototype.getRootRouter = function () {
        return this.globalRef.option('rootRouter');
    };
    CommonService.prototype.setRootRouter = function (rootRouter) {
        this.globalRef.option('rootRouter', rootRouter);
    };
    CommonService.prototype.gotoMainPage = function () {
        this.getRootRouter().navigate("/main");
    };
    CommonService.prototype.gotoDetailPage = function () {
        this.getRootRouter().navigate("/detail");
    };
    CommonService.prototype.request = function (url, handler) {
        fetch(url).then(function (res) { return res.json(); })
            .then(function (json) {
            handler(json);
        }).catch(function (ex) {
            console.log('request:' + url + ' failed:', ex);
        });
    };
    return CommonService;
})();
exports.CommonService = CommonService;
