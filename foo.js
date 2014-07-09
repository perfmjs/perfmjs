perfmjs.plugin('foo', function($$) {
    $$.base("foo", {
        init: function(eventProxy) {
            this.option('eventProxy', eventProxy);
            this.sayHello();
            return this;
        },
        sayHello: function() {
            alert('hello perfmjs!');
        },
        end: 0
    });
    $$.foo.defaults = {
        eventProxy: {},
        scope: 'singleton',
        end: 0
    };
});