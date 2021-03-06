System.register(['perfmjs/utils', 'perfmjs/joquery', 'perfmjs/head.load'], function(exports_1) {
    var utils_1, joquery_1, head_load_1;
    var $$, loader, utils;
    return {
        setters:[
            function (_utils_1) {
                utils_1 = _utils_1;
            },
            function (_joquery_1) {
                joquery_1 = _joquery_1;
            },
            function (_head_load_1) {
                head_load_1 = _head_load_1;
            }],
        execute: function() {
            /**
             * 解析加载资源文件的url.
             * TODO: 该类必须同时通过所有浏览器测试，包括ie6, ie7, ie8等浏览器
             * 如：
             <script type="text/javascript" src="/perfmjs/js/core2/onlyforload.js?v=2012120303^{n:'css-comm',f:'',t:'css',m:'fb;jq',d:'http://s.no100.com'}"></script>
             <script type="text/javascript" src="/perfmjs/js/core2/onlyforload.js?v=2012120301^{n:'widget-comm',f:'http://s.no100.com/perfmjs/js/core2/include-comm.js',t:'js',m:'ssq',d:'http://s.no100.com'}"></script>
             <script type="text/javascript" src="/perfmjs/js/core2/onlyforload.js?v=2012120302^{n:'js-comm',f:'http://s.no100.com/perfmjs/js/core2/include-comm.js',t:'js',m:'jq;dlt',d:'http://s.no100.com'}"></script>
             <script type="text/javascript" src="/perfmjs/js/core2/jquery-1.8.3.js"></script>
             <script type="text/javascript" src="/perfmjs/js/core2/_utils.js"></script>
             <script type="text/javascript" src="/perfmjs/js/core2/base.js"></script>
             <script type="text/javascript" src="/perfmjs/js/core2/json.js"></script>
             <script type="text/javascript" src="/perfmjs/js/core2/joquery.js"></script>
             <script type="text/javascript" src="/perfmjs/js/core2/head.load.js"></script>
             或者使用以下压缩地址
             <script type="text/javascript" src="/perfmjs/js/core2/onlyforload.js?v=2012120303^{n:'css-comm',f:'',t:'css',m:'jq;fb',d:'http://s.no100.com'}"></script>
             <script type="text/javascript" src="/perfmjs/js/core2/onlyforload.js?v=2012120302^{n:'js-comm',f:'http://s.no100.com/perfmjs/js/core2/include-comm.js',t:'js',m:'jq;dlt',d:'http://s.no100.com'}"></script>
             <script type="text/javascript" src="/perfmjs/js/core2/core.min.js?v=2012120301^{n:'widget-comm',f:'http://s.no100.com/perfmjs/js/core2/include-comm.js',t:'js',m:'ssq',d:'http://s.no100.com'}"></script>
             */
            utils_1.utils.getGlobal('loader');
            $$ = utils_1.utils.root;
            $$.loader = {
                writejs: function (src, encode) {
                    document.write('<script type="text/javascript" src=' + src + ' charset="' + (encode || "UTF-8") + '"></script>');
                },
                writecss: function (link, asyncCss) {
                    asyncCss = asyncCss || true;
                    if (asyncCss) {
                        var cssNode = document.createElement('link');
                        cssNode.type = 'text/css';
                        cssNode.rel = 'stylesheet';
                        cssNode.href = link;
                        document.getElementsByTagName("head")[0].appendChild(cssNode);
                    }
                    else {
                        //放在头部的css最好要同步下载且放在head元素中
                        document.write('<link type="text/css" rel="stylesheet" href="' + link + '" />');
                    }
                },
                /**
                 * 利用head.load.js类库加载资源文件
                 * 调用例子: $$.loader.loadHeadRes("http://domain.com/file.js","http://domain.com/file.js", callBack)
                 */
                loadHeadRes: function () {
                    var args = arguments, _args = [];
                    for (var i = 0; i < args.length; i++) {
                        if (utils_1.utils.isArray(args[i])) {
                            _args = _args.concat(args[i]);
                            continue;
                        }
                        _args[_args.length] = args[i];
                    }
                    head_load_1.headLoad.js.apply(null, _args);
                },
                /**
                 * e.g. $$.loader.load({isScript:true});
                 * @param options
                 * @returns {$$.loader}
                 */
                load: function (options) {
                    options = options || { isScript: true };
                    this._parseLoadedRes(options);
                    var v = this.getVersion(), confs = [];
                    for (var i = 0; i < this.sources.length; i++) {
                        var option = this.sources[i];
                        if (option['f'] !== undefined && option['f'] !== '') {
                            confs[confs.length] = option['f'] + "?v=" + v;
                        }
                    }
                    confs = joquery_1.joquery.newInstance(confs).distinct(function (item) { return item; }).toArray();
                    for (var j = 0; j < confs.length; j++) {
                        this.writejs(confs[j]);
                    }
                    return this;
                },
                loadedModuleName: {},
                //加载应用需要的所有相关js或css文件
                loadModules: function (options) {
                    options = utils_1.utils.extend({ name: '', type: 'js', mdCallback: function () { }, handleUrlsCallback: function () { }, afterLoadedCallback: function () { } }, options);
                    if (typeof $$.loader.sources !== 'undefined') {
                        var sources = $$.loader.sources;
                        sources = joquery_1.joquery.newInstance(sources).select(function (item) {
                            return (item['n'] === options['name'] && item['t'] === options['type']);
                        }).toArray();
                        if (sources.length < 1)
                            return this;
                        var combineUrls = [];
                        for (var i = 0; i < sources.length; i++) {
                            //name应唯一,不重复执行相同name的模块
                            if (sources[i]['n'] !== '' && $$.loader.loadedModuleName[sources[i]['n']]) {
                                continue;
                            }
                            var source = sources[i];
                            //if (source['d'] !== undefined && ($$.currentDomain||'') === '') {
                            //    $$.currentDomain = source['d'];
                            //}
                            var modules = source['m'].split(";");
                            for (var j = 0; j < modules.length; j++) {
                                var module = modules[j];
                                utils_1.utils.trim(module).length > 0 && options.mdCallback.call(null, source, module, combineUrls);
                            }
                            $$.loader.loadedModuleName[source['n']] = source['n'];
                        }
                        //去掉重复链接文件名
                        combineUrls = joquery_1.joquery.newInstance((options.handleUrlsCallback.call(null, combineUrls) || combineUrls)).distinct(function (item) { return item; }).toArray();
                        if (combineUrls.length >= 0) {
                            if (options.type === 'js') {
                                //应用所需的js文件使用异步加载
                                if (combineUrls.length < 1) {
                                    options.afterLoadedCallback && options.afterLoadedCallback();
                                }
                                else {
                                    this.loadHeadRes(combineUrls.concat([options.afterLoadedCallback]));
                                }
                            }
                            else if (options.type === 'css') {
                                //FIXME css文件应使用同步加载且应使用minify或concat之类的在线压缩工具,css文件最好不要使用js类库来管理版本号加载（网速慢的情况下头部样式会乱）
                                var combineUrlsLen = combineUrls.length;
                                for (var r = 0; r < combineUrlsLen; r++) {
                                    this.writecss(combineUrls[r], false);
                                }
                            }
                        }
                    }
                    return this;
                },
                sources: [],
                getVersion: function (interval) {
                    interval = interval || 2;
                    var load_date = new Date();
                    var load_day = load_date.getDate() <= 9 ? ('0' + load_date.getDate()) : load_date.getDate();
                    var load_hour = load_date.getHours() <= 9 ? ('0' + load_date.getHours()) : load_date.getHours();
                    var _min = load_date.getMinutes() % 2 == 0 ? load_date.getMinutes() : (load_date.getMinutes() - load_date.getMinutes() % interval);
                    var load_minute = _min <= 9 ? ('0' + _min) : _min;
                    return '' + load_date.getFullYear() + (load_date.getMonth() + 1) + load_day + load_hour + load_minute;
                },
                _parseLoadedRes: function (options) {
                    //只认带有script元素的src属性或src参数中含有onlyforload.js或core.js或core.min.js或core-def.js字符的地址
                    options = utils_1.utils.extend({ loadfile: 'core-[0-9]+.[0-9]+.[0-9]+.js|core-[0-9]+.[0-9]+.[0-9]+.min.js|onlyforload.js|core.min.js|core.js', isScript: false, src: '{n:"",t:"js",m:"default;"}' }, options);
                    //将sources数组清空并初始化
                    this.sources.length = 0;
                    var scripts = options['isScript'] ? document.getElementsByTagName("script") : options['src'].split('|');
                    for (var i = 0; i < scripts.length; i++) {
                        var src = options['isScript'] ? scripts[i].src : (scripts[i].indexOf('^') < 0 ? ('onlyforload.js^' + scripts[i]) : scripts[i]);
                        var scriptOptions = {}, isParsed = options['isScript'] ? (src.isparsed || false) : false;
                        if (src && src.match(options['loadfile']) && !isParsed) {
                            if (src.indexOf('^') != -1) {
                                var multiSrcOptions = src.split('^')[1].replace(new RegExp("%20", "gm"), " ").replace(new RegExp("%22", "gm"), "\"").replace(new RegExp("%27", "gm"), "\'").split('|');
                                for (var j = 0; j < multiSrcOptions.length; j++) {
                                    srcOptions = multiSrcOptions[j];
                                    try {
                                        scriptOptions = eval("(" + srcOptions + ")");
                                    }
                                    catch (err) {
                                        if (typeof (JSON) === 'object' && JSON.parse) {
                                            scriptOptions = JSON.parse(srcOptions);
                                        }
                                    }
                                    scriptOptions = utils_1.utils.extend({ n: '', t: 'js', m: 'default' }, scriptOptions);
                                    this.sources[this.sources.length] = scriptOptions;
                                }
                                if (options['isScript']) {
                                    scripts[i].setAttribute('isparsed', 'true');
                                }
                            }
                        }
                    }
                    if (scripts.length > 0 && this.sources.length < 1) {
                        this.sources[this.sources.length] = { n: '', t: 'js', m: 'default' };
                    }
                    return this.sources;
                }
            };
            exports_1("loader", loader = $$.loader);
            exports_1("utils", utils = utils_1.utils);
        }
    }
});
////调用例子, 在xxx.html里
//<script type="text/javascript" src="/perfmjs/dist/js/core-3.0.0.js?^{f:'./libs/include.js',m:'common;jquery;zhuanpan;dianqiu'}"></script>
//<script>
//System.import("perfmjs/loader").then(function(module) {
//    module.loader.load();
//});
//</script> 
