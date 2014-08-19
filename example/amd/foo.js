/**
 * Created by Administrator on 2014/8/13.
 */
define('foo', ['base'], function(base) {
    base("foo", {
        init: function(initParam) {
            return this;
        },
        sayHello: function(name) {
            return 'hi- ' + name;
        },
        foo: function() {
            return 'foo!';
        },
        end: 0
    });
    base.foo.defaults = {
        end: 0
    };
    return base.foo;
});