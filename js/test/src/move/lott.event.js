/**
 * MOVE模式的EVENT
 * Created by Administrator on 2014/4/10.
 */
perfmjs.plugin('unit.lottevent', function($$) {
    $$.base("base.lottevent", {
        init: function (sb) {
            var self = this;
            sb.on('lottevent/heartbeat', function (data) {
                $.model.plan.multiple(data.multiple);
            });
            return this;
        },
        buy: function(multiple) {
            //ajaxcall
            perfmjs.eventproxy.instance.emit('lottevent/heartbeat', {multiple: multiple});
            //modify model
        },
        end: 0
    });
    $$.base.lottevent.defaults = {
        scope: 'singleton',
        end: 0
    };
});