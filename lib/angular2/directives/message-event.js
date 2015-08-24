System.register('perfmjs/angular2/directives/message-event', ['angular2/src/facade/async'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        __.prototype = b.prototype;
        d.prototype = new __();
    };
    var async_1;
    var MessageEvent;
    return {
        setters: [
            function (_async_1) {
                async_1 = _async_1;
            }
        ],
        execute: function() {
            MessageEvent = (function (_super) {
                function MessageEvent(source) {
                    _super.call(this);
                    this._source = source;
                    this.initCompleted();
                }
                __extends(MessageEvent, _super);
                MessageEvent.prototype.initCompleted = function(source) {
                    var self = this;
                    if (source) {
                        this._source = source;
                    }
                    setTimeout(function () {
                        return self.next({'emit': self.emit,'source': self._source});
                    },0);
                };
                MessageEvent.prototype.emit = function(message) {
                    if (this.source && this.source.onMessage) {
                        this.source.onMessage(message);
                    } else {
                        this.onMessage(message);
                    }
                };
                MessageEvent.prototype.onMessage = function(message) {};
                return MessageEvent;
            })(async_1.EventEmitter);
            exports_1("MessageEvent", MessageEvent);
        }
    };
});
