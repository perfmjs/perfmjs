/**
 * 双色球-有限状态机
 * Created by Administrator on 2014/4/11.
 */
perfmjs.plugin('unittest.ssqfsm', function($$) {
    $$.base("fsm.ssqfsm", {
        init: function() {
            this._super('init');
        },
        onEnterToFushi: function(event) {
          //do something
        },
        end: 0
    });
    $$.fsm.ssqfsm.defaults = {
        initial: {event: 'startup', from: 'init', to: 'fushi'},
        stateMap: {'changePlay': {'fushi': 'dantuo'}},
        end: 0
    };
});