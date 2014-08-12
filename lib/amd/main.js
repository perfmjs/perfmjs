define('myModule1', function (require, exports, module) {
    alert('loaded xxx myModule1');
    return {
        getFoo: function() {
            return "../myModule1#foo1---";
        }
    }
});
define('myModule', function (require) {
    alert('xxx myModule loaded!, deps myModule3');
    var myModule3 = require('./amd1/myModule3');
    return {
        getFoo: function() {
            return 'foo/' + myModule3.getFoo();
        }
    }
});
require(['myModule'], function (myModule) {
    alert('main: ' + myModule.getFoo());
});