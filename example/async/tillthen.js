/**
 * A minimal implementation of Promises/A+
 * 参考：Tillthen（v0.3.4） https://github.com/biril/tillthen
 */
(function (root, createModule) {
    "use strict";
    var _ = {
            isObject: function (o) {
                return Object.prototype.toString.call(o) === "[object Objet]";
            },
            isFunction: function (f) {
                return Object.prototype.toString.call(f) === "[object Function]";
            }
        },
        env = (function () {
            if (typeof define === "function" && define.amd) { return "AMD"; }
            if (typeof exports !== "undefined" && _.isObject(exports)) { return "CommonJS"; }
            return "browser";
        }());
    _.evaluateOnNextTurn = (function () {
        return env === "CommonJS" ? function (f, v) {
                process.nextTick(function () { f(v); });
            } :
            function (f, v) { root.setTimeout(function () { f(v); }, 0); };
    }());

    switch (env) {
    case "CommonJS":
        createModule(_, exports);
        break;
    case "AMD":
        define('async', ["exports"], function (exports) {
            return createModule(_, exports);
        });
        break;
    case "browser":
        root.tillthen = createModule(_, {});
    }
}(this, function (_, tillthen) {
    "use strict";
    var TillthenDeferred = function () {},
        TillthenPromise = function () {},
        resolveDeferred = function (deferred, x) {
            var xThen = null;
            if (deferred.promise === x) {
                return deferred.reject(new TypeError("Cannot resolve a promise with itself"));
            }
            if (x instanceof TillthenPromise) {
                if (x.state === "fulfilled") { return deferred.fulfill(x.result); }
                if (x.state === "rejected") { return deferred.reject(x.result); }
                return x.then(deferred.fulfill, deferred.reject);
            }
            try {
                if (!(_.isObject(x) || _.isFunction(x)) || !_.isFunction(xThen = x.then)) {
                    return deferred.fulfill(x);
                }
            }
            catch (error) { deferred.reject(error); }
            xThen(function (value) {
                resolveDeferred(deferred, value);
            }, function (reason) {
                deferred.reject(reason);
            });
        },
        createEvaluator = function (onResulted, deferred) {
            return function (result) {
                try { resolveDeferred(deferred, onResulted(result)); }
                catch (reason) { deferred.reject(reason); }
            };
        },
        createDeferred = function () {
            var
                state = "pending",
                result,
                fulfillQueue = [],
                rejectQueue = [],
                promise = new TillthenPromise(),
                deferred = null,
                queueForFulfillment = function (onFulfilled, dependantDeferred) {
                    if (state === "rejected") { return; }
                    _.isFunction(onFulfilled) || (onFulfilled = function (value) { return value; });
                    var evaluator = createEvaluator(onFulfilled, dependantDeferred);
                    state === "fulfilled" ? _.evaluateOnNextTurn(evaluator, result) :
                        fulfillQueue.push(evaluator);
                },
                queueForRejection = function (onRejected, dependantDeferred) {
                    if (state === "fulfilled") { return; }
                    _.isFunction(onRejected) || (onRejected = function (error) { throw error; });
                    var evaluator = createEvaluator(onRejected, dependantDeferred);
                    state === "rejected" ? _.evaluateOnNextTurn(evaluator, result) :
                        rejectQueue.push(evaluator);
                },
                fulfill = function (value) {
                    if (state !== "pending") { return; }
                    state = "fulfilled";
                    for (var i = 0, l = fulfillQueue.length; i < l; ++i) { fulfillQueue[i](value); }
                    fulfillQueue = [];
                    result = value;

                    return promise;
                },
                reject = function (reason) {
                    if (state !== "pending") { return; }
                    state = "rejected";
                    for (var i = 0, l = rejectQueue.length; i < l; ++i) { rejectQueue[i](reason); }
                    rejectQueue = [];
                    result = reason;

                    return promise;
                };
            promise.then = function (onFulfilled, onRejected) {
                var dependantDeferred = createDeferred();
                queueForFulfillment(onFulfilled, dependantDeferred);
                queueForRejection(onRejected, dependantDeferred);
                return dependantDeferred.promise;
            };
            promise.state = state;
            promise.result = result;
            TillthenDeferred.prototype = promise;
            deferred = new TillthenDeferred();
            deferred.promise = promise;
            deferred.fulfill = fulfill;
            deferred.reject = reject;
            deferred.resolve = function (result) { resolveDeferred(this, result);};
            return deferred;
        };

    tillthen = tillthen || {};
    tillthen.defer = createDeferred;
    tillthen.version = "0.3.4";
    return tillthen;
}));