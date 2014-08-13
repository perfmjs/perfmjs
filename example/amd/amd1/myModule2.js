define('amd1/myModule2', function (require) {
    alert('../amd1/myModule2222 loaded');
    //var m3 = require('./amd1/myModule3');
    return {
        getFoo: function() {
            return "./adm1/myModule2#foo2";
        }
    }
});
