/**
 * Created by Administrator on 2014/8/13.
 */
define('bar', ['base', 'foo'], function(base, foo) {
    base("foo.bar", {
        init: function(initParam) {
            return this;
        },
        sayHello: function(name) {
            var superName = this._super('sayHello', name);
            return 'call super:' + superName + ', call self: hello- '
                + name + "/foo:" + this.foo();
        },
        end: 0
    });
    base.bar.defaults = {
        end: 0
    };
    return base.bar;
});