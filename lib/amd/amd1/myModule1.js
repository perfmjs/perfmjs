define('./amd1/myModule1', function (require, exports, module) {
    alert('loaded adm1 myModule1');
    return {
        getFoo: function() {
            return "../myModule1#foo1";
        }
    }
});
