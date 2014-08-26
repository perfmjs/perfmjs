define('myModule',  function (require) {
    alert('amd myModule loaded!');
    var myModule2 = require('amd1/myModule2');
    return {
        getFoo: function() {
            return 'foo11/' + myModule3.getFoo();
        }
    }
});