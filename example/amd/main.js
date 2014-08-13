if (typeof define === "function" && define.amd && define.amd['async']) {
    define.config.baseUrl = 'http://localhost:63342/perfmjs/example/amd/';
    define.config.alias['jquery'] = 'plugins/jquery.min';
}
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
define('foo', ['perfmjs'], function($$) {
    $$.base("foo", {
        init: function(initParam) {
            return this;
        },
        sayHello: function(name) {
            return 'hi- ' + name;
        },
        end: 0
    });
    $$.foo.defaults = {
        end: 0
    };
    return $$.foo;
});
define('bar', ['perfmjs', 'foo'], function($$, foo) {
    $$.base("foo.bar", {
        init: function(initParam) {
            return this;
        },
        sayHello: function(name) {
            var superName = this._super('sayHello', name);
            return 'call super:' + superName + ', call self: hello- ' + name;
        },
        end: 0
    });
    $$.bar.defaults = {
        end: 0
    };
    return $$.bar;
});
//require(['perfmjs', 'app', 'bar'], function($$, app, bar) {
//    app.register("bar", bar);
//    app.start('bar');
//    alert(bar.instance.sayHello('bar'));
//});
require(['myModule'], function (myModule) {
    alert('main: ' + myModule.getFoo());
});
//require(['myModule', 'perfmjs', 'jquery'], function (myModule, $$, $) {
//    alert('main: ' + myModule.getFoo() + "/perfmjs:" + $$.utils.isAmdSupport() + "/jquery:" + $.isArray([]));
//});

