perfmjs.plugin('globalRef', function($$) {

    $$.base("globalRef", {
        init: function(initParam) {
            return this;
        },

        getRootRouter: function(){
            return this.option('rootRouter');
        },

        setRootRouter: function(rootRouter) {
            return this.option('rootRouter', rootRouter);
        },

        end: 0
    });
    $$.globalRef.defaults = {
        rootRouter: {},
        end: 0
    };
});