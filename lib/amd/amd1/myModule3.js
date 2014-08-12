define('./amd1/myModule3', function (require) {
    alert('./amd1/myModule3 loaded');
    var m2 = require('amd1/myModule2');
    return {
        getFoo: function() {
            return "./myModule3#foo3" + "/" + m2.getFoo();
        }
    }
});
