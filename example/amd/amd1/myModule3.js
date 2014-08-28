define('amd1/myModule3', function (require) {
    console.log('amd1/myModule3 loaded!');
//    var m2 = require('amd1/myModule2');
    return {
        getFoo: function() {
            return "amd1/myModule3#getFoo()/";
        }
    }
});
