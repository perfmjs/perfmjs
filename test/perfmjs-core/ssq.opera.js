/**
 * 操作类
 * Created by Administrator on 2014/4/11.
 */
perfmjs.plugin('unit.ssqopera', function($$) {
    $$.base("ssqopera", {
        init: function() {
            this.dispatcher();
            return this;
        },
        dispatcher: function() {
            this['doBuy']();
        },
        'doBuy': function() {
            $$.lottevent.instance.buy(888);
        }
    });
    $$.ssqopera.defaults = {
        scope: 'singleton',
        lottery: 'ssq',
        end: 0
    };
});