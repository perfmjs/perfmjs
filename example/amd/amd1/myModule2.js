define('amd1/myModule2', function (require) {
    console.log('amd1/myModule2 loaded!');
    var m3 = require('amd1/myModule3');
    return {
        getFoo: function() {
            return "adm1/myModule2#getFoo()/" + m3.getFoo();
        }
    }
});
