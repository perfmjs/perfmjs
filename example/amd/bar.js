/**
 * Created by Administrator on 2014/8/13.
 */
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