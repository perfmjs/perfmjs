define('myModule',  function (require) {
    alert('amd myModule loaded!');
    var myModule3 = require('myModule1');
    return {
        getFoo: function() {
            return 'foo11/' + myModule3.getFoo();
        }
    }
});