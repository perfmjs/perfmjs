class Popup {

    constructor() {
    }

    /**
     * 参考：http://html5beta.com/jquery-2/popup-js-a-light-weight-jquery-popup-plugin/
     * e.g.
     * 在class中：import {popup} from 'perfmjs/angular2/directives/popup';
     * 调用：popup.pop('弹出信息');
     * @param msg, the html message,eg :  <p>弹出信息</p>
     * @param timer, time before popout
     */
    pop(msg, timer) {
        var self = this,
            ht = '<div id="ng2popup" style="display:block;position:absolute;top:' + (document.documentElement.scrollTop + document.body.scrollTop + document.documentElement.clientHeight/2) + 'px;left:10px;'+
            //'left:' + Math.floor(document.documentElement.clientWidth/2-50)+ 'px;' +
            'text-align:center;background:rgba(77,77,77,0.9);border:1px solid #999;z-index:1200;box-shadow:0 0 5px rgba(0,0,0,.4)">' +
            '<div class="ng2popup-content" style="padding:10px;color:white"></div></div>';
        this.removePop();
        if (document.querySelectorAll('#ng2popupdiv').length < 1) {
            var ng2popupDiv = document.createElement("div");
            ng2popupDiv.setAttribute('id', 'ng2popupdiv');
            document.body.appendChild(ng2popupDiv);
        }
        document.querySelectorAll('#ng2popupdiv')[0].innerHTML += ht;
        document.querySelectorAll('#ng2popup .ng2popup-content')[0].innerHTML = msg;
        setTimeout(function(){self.removePop();},timer?timer:1500);
    }

    removePop() {
        var popupElement = document.querySelectorAll("#ng2popup");
        if (popupElement.length > 0) {
            popupElement[0].parentNode.removeChild(popupElement[0]);
        }
    }
}

export var popup = new Popup();