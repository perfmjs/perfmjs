var core_1 = require('perfmjs/core');
var CommonService = (function () {
    function CommonService() {
        this.rootRouter = core_1.Perfmjs.globalRef.newInstance().option('rootRouter');
    }
    CommonService.prototype.getRootRouter = function () {
        return this.rootRouter;
    };
    CommonService.prototype.setRootRouter = function (rootRouter) {
        this.rootRouter = rootRouter;
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
//export let datacontextInjectables = [
//    httpInjectables,
//    Datacontext
//]; 
