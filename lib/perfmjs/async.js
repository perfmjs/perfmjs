/**
 * async v1.0.0
 * A minimal implementation of Promises/A+
 * 参考：Tillthen（v0.3.4） https://github.com/biril/tillthen
 * https://github.com/kriskowal/q
 * https://github.com/promises-aplus/promises-spec
 * https://github.com/chemdemo/chemdemo.github.io/issues/6
 * https://www.promisejs.org/
 * https://github.com/cujojs/when
 * 在Node.js 中用 Q 实现Promise – Callbacks之外的另一种选择   http://www.ituring.com.cn/article/54547
 */
perfmjs.plugin('async', function($$) {
    (function (createModule) {
        "use strict";
        if ($$.utils.isNodeJSSupport()) {
            createModule(exports);
        } else if ($$.utils.isAmdSupport()) {
            define('async', function () {
                return createModule();
            });
        } else if ($$.utils.isBrowserSupport()) {
            $$.async = createModule();
        }
    }(function (async) {
        "use strict";
        var AsyncDeferred = function () {},
            AsyncPromise = function () {},
            resolveDeferred = function (deferred, x) {
                var xThen = null;
                if (deferred.promise === x) {
                    return deferred.reject(new TypeError("Cannot resolve a promise with itself"));
                }
                if (x instanceof AsyncPromise) {
                    if (x.state === "fulfilled") { return deferred.fulfill(x.result); }
                    if (x.state === "rejected") { return deferred.reject(x.result); }
                    return x.then(deferred.fulfill, deferred.reject);
                }
                try {
                    if (!($$.utils.isObject(x) || $$.utils.isFunction(x)) || !$$.utils.isFunction(xThen = x.then)) {
                        return deferred.fulfill(x);
                    }
                } catch (error) {
                    deferred.reject(error);
                }
                xThen(function (value) {
                    resolveDeferred(deferred, value);
                }, function (reason) {
                    deferred.reject(reason);
                });
            },
            createEvaluator = function (onResulted, deferred) {
                return function (result) {
                    try {resolveDeferred(deferred, onResulted(result));} catch (reason) {deferred.reject(reason);}
                };
            },
            createDeferred = function () {
                var
                    state = "pending",
                    result,
                    fulfillQueue = [],
                    rejectQueue = [],
                    promise = new AsyncPromise(),
                    deferred = null,
                    queueForFulfillment = function (onFulfilled, dependantDeferred) {
                        if (state === "rejected") {return;}
                        $$.utils.isFunction(onFulfilled) || (onFulfilled = function (value) { return value; });
                        var evaluator = createEvaluator(onFulfilled, dependantDeferred);
                        state === "fulfilled" ? $$.utils.nextTick(evaluator, result) : fulfillQueue.push(evaluator);
                    },
                    queueForRejection = function (onRejected, dependantDeferred) {
                        if (state === "fulfilled") {return;}
                        $$.utils.isFunction(onRejected) || (onRejected = function (error) {throw error;});
                        var evaluator = createEvaluator(onRejected, dependantDeferred);
                        state === "rejected" ? $$.utils.nextTick(evaluator, result) :
                            rejectQueue.push(evaluator);
                    },
                    fulfill = function (value) {
                        if (state !== "pending") {return;}
                        state = "fulfilled";
                        for (var i = 0, l = fulfillQueue.length; i < l; ++i) { fulfillQueue[i](value); }
                        fulfillQueue = [];
                        result = value;
                        return promise;
                    },
                    reject = function (reason) {
                        if (state !== "pending") {return;}
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
                AsyncDeferred.prototype = promise;
                deferred = new AsyncDeferred();
                deferred.promise = promise;
                deferred.fulfill = fulfill;
                deferred.reject = reject;
                deferred.resolve = function (result) { resolveDeferred(this, result);};
                return deferred;
            };
        async = async || {};
        async.defer = createDeferred;
        async.version = "1.0.0";
        return async;
    }));
});