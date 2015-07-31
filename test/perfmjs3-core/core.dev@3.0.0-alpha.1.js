System.register("utils.js", [], function($__export) {
  "use strict";
  var __moduleName = "utils.js";
  var demo_1,
      Utils;
  return {
    setters: [],
    execute: function() {
      demo_1 = require('demo1/demo');
      Utils = (function() {
        function Utils() {
          this.version = '3.0.0';
          new demo_1.Demo().test();
        }
        Utils.prototype.isObject = function(obj) {
          return obj === Object(obj);
        };
        Utils.prototype.keys = function(obj) {
          if (!this.isObject(obj))
            return [];
          if (Object.keys)
            return Object.keys(obj);
          var keys = [];
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              keys[keys.length] = key;
            }
          }
          return keys;
        };
        return Utils;
      })();
      exports.Utils = Utils;
    }
  };
});
//# sourceMappingURL=utils.js.map

System.register("demo1/demo.js", [], function($__export) {
  "use strict";
  var __moduleName = "demo1/demo.js";
  var Demo;
  return {
    setters: [],
    execute: function() {
      Demo = (function() {
        function Demo() {
          console.log("demo");
        }
        Demo.prototype.test = function() {
          console.log("test demo");
        };
        return Demo;
      })();
      exports.Demo = Demo;
    }
  };
});
//# sourceMappingURL=demo.js.map

//# sourceMappingURL=core.dev@3.0.0-alpha.1.js.map