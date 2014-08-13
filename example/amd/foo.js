/**
 * Created by Administrator on 2014/8/13.
 */
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