/**
 * angular2 common pipe(通用的pipe)
 * e.g.
 import {CommonPipeFactory} from '../pipes/commonPipe';
 var commonPipeObj = new CommonPipeFactory();
 commonPipeObj.transform = utils.aop(this, commonPipeObj.transform, function(value, args) {
    return joquery.newInstance(utils.toArray(value)).filter(function(item){
        return utils.toNumber(item.code) >= 1;
    }).toArray();
});
 @Component({
    selector: 'ssq',
    viewInjector: [
        Pipes.extend({'betInfoPipe':CommonPipeFactory.toPipe(commonPipeObj)})
    ]
})
 @View({
    templateUrl: 'templates/ssq/ssq.html',
})
 export class Ssq {
}
 */
System.register(['angular2/src/change_detection/pipes/pipe', 'angular2/src/facade/lang', 'angular2/src/change_detection/pipes/null_pipe', 'angular2/src/change_detection/change_detection'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            function __() { this.constructor = d; }
            __.prototype = b.prototype;
            d.prototype = new __();
        };
    var pipe_1, lang_1, null_pipe_1, change_detection_1;
    var PipeFactory;
    return {
        setters:[
            function(_pipe_1) {
                pipe_1 = _pipe_1;
            },
            function(_lang_1) {
                lang_1 = _lang_1;
            },
            function(_null_pipe_1) {
                null_pipe_1 = _null_pipe_1;
            },
            function (_change_detection_1) {
                change_detection_1 = _change_detection_1;
            }
        ],
        execute: function() {
            PipeFactory = (function (_super) {
                var pipeFactory = function() {
                    _super.apply(this, arguments);
                };
                pipeFactory.toPipe = function(pipeFactoryObj) {
                    return lang_1.CONST_EXPR([lang_1.CONST_EXPR(pipeFactoryObj || new PipeFactory()), lang_1.CONST_EXPR(new null_pipe_1.NullPipeFactory())]);
                };
                __extends(pipeFactory, _super);
                pipeFactory.prototype.create = function(args) {
                    return this;
                };
                pipeFactory.prototype.onDestroy = function() {
                };
                pipeFactory.prototype.supports = function(obj) {
                    return true;
                };
                pipeFactory.prototype.transform = function(value, args) {
                    return value;
                };
                return pipeFactory;
            })(pipe_1.BasePipe);
            var pipe = lang_1.CONST_EXPR([lang_1.CONST_EXPR(new PipeFactory()), lang_1.CONST_EXPR(new null_pipe_1.NullPipeFactory())]);
            exports_1("commonPipe", pipe);
            exports_1("CommonPipeFactory", PipeFactory);
        }
    };
});