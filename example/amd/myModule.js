define('myModule',  function (require) {
    console.log('amd myModule loaded!');
    var myModule2 = require('amd1/myModule2');
    return {
        getFoo: function() {
            return 'myModule#getFoo(): ' + myModule2.getFoo();
        }
    }
});