define('myModule1', function (require, exports, module) {
    return {
        getFoo: function() {
            return "../myModule1#foo1";
        }
    }
});
