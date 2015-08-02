/**
 * angular2 json pipe
 */
//由于typescript文件的extends转成sysytem的js文件时有问题，因此这里直接写成system格式的extend的js文件，组件中使用方法：@Component({viewInjector: [Pipes.extend({'filterPipe':filterPipe, 'jsonPipe':jsonPipe})]})
System.register(['angular2/src/change_detection/pipes/pipe', 'angular2/src/facade/lang', 'angular2/src/change_detection/pipes/null_pipe', 'angular2/src/change_detection/change_detection'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            function __() { this.constructor = d; }
            __.prototype = b.prototype;
            d.prototype = new __();
        };
    var pipe_1, lang_1, null_pipe_1, change_detection_1;
    var JSONPipeFactory;
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
            JSONPipeFactory = (function (_super) {
                __extends(JSONPipeFactory, _super);
                function JSONPipeFactory() {
                    _super.apply(this, arguments);
                }
                JSONPipeFactory.prototype.create = function() {
                    return this;
                };
                JSONPipeFactory.prototype.supports = function(obj) {
                    return true;
                };
                JSONPipeFactory.prototype.transform = function(value, args) {
                    return JSON.stringify(value, null, 2);
                };
                JSONPipeFactory.prototype.onDestroy = function() {
                };
                return JSONPipeFactory;
            })(pipe_1.BasePipe);
            var jsonPipe = lang_1.CONST_EXPR([lang_1.CONST_EXPR(new JSONPipeFactory()), lang_1.CONST_EXPR(new null_pipe_1.NullPipeFactory())]);
            exports_1("jsonPipeInjectable", change_detection_1.Pipes.extend({'jsonPipe': jsonPipe}));
            exports_1("jsonPipe", jsonPipe);
        }
    };
});

//////extends in file jsonPipe.ts
//import {BasePipe} from 'angular2/src/change_detection/pipes/pipe';
//import {Pipes} from 'angular2/src/change_detection/change_detection';
//import {CONST_EXPR} from 'angular2/src/facade/lang';
//import {NullPipeFactory} from 'angular2/src/change_detection/pipes/null_pipe';
//
//class JSONPipeFactory extends BasePipe {
//
//    supports(obj):boolean {
//        return true;
//    }
//
//    transform(value: any, args: any):string {
//        return JSON.stringify(value, null, 2);
//    }
//
//    onDestroy() {
//    }
//
//    create():BasePipe {
//        return this;
//    }
//}
//var _jsonPipe = CONST_EXPR([CONST_EXPR(new JSONPipeFactory()), CONST_EXPR(new NullPipeFactory())]);
//export var jsonPipe = Pipes.extend({'jsonPipe': _jsonPipe});