/**
 * MOVE模式中的model
 * Created by Administrator on 2014/4/10.
 */
perfmjs.plugin('unit.ssq.model', function($$) {
    $$.utils.namespace('model');
    $$.model.plan = {
        _multiple: 1,
        multiple: function(data) {
            return this._multiple=(!!data)?data:this._multiple;
        }
    };
});