/**
 * angular2 filter pipe
 */
System.register(['angular2/src/change_detection/pipes/pipe', 'angular2/src/facade/lang', 'angular2/src/change_detection/pipes/null_pipe', 'angular2/src/change_detection/change_detection', 'perfmjs/utils', 'perfmjs/joquery'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            function __() { this.constructor = d; }
            __.prototype = b.prototype;
            d.prototype = new __();
        };
    var pipe_1, lang_1, null_pipe_1, change_detection_1, utils_1, joquery_1;
    var FilterPipeFactory;
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
            },
            function (_utils_1) {
                utils_1 = _utils_1;
            },
            function (_joquery_1) {
                joquery_1 = _joquery_1;
            }
        ],
        execute: function() {
            FilterPipeFactory = (function (_super) {
                __extends(FilterPipeFactory, _super);
                function FilterPipeFactory() {
                    _super.apply(this, arguments);
                }
                FilterPipeFactory.prototype.create = function() {
                    return this;
                };
                FilterPipeFactory.prototype.supports = function(obj) {
                    return true;
                };
                FilterPipeFactory.prototype.transform = function(value, args) {
                    var utils = utils_1.utils, joquery = joquery_1.joquery;
                    return joquery.newInstance(utils.toArray(value)).filter(function(item){
                        return utils.toNumber(item.code) >= 10;
                    }).toArray();
                };
                FilterPipeFactory.prototype.onDestroy = function() {
                };
                return FilterPipeFactory;
            })(pipe_1.BasePipe);
            var filterPipe = lang_1.CONST_EXPR([lang_1.CONST_EXPR(new FilterPipeFactory()), lang_1.CONST_EXPR(new null_pipe_1.NullPipeFactory())]);
            exports_1("filterPipeInjectable", change_detection_1.Pipes.extend({'filterPipe': filterPipe}));
            exports_1("filterPipe", filterPipe);
        }
    };
});