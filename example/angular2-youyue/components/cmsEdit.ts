import {Component, View, Injectable, CORE_DIRECTIVES, Directive, ElementRef, Renderer} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {Router, routerInjectables} from 'angular2/router';
import {BrowserDomAdapter} from 'angular2/src/dom/browser_adapter';
import {FormBuilder, Validators, FORM_DIRECTIVES, ControlGroup, Control} from 'angular2/forms';

import {utils} from 'perfmjs/utils';
import {CKEditor} from 'perfmjs/angular2/directives/ckeditor';
import {popup} from 'perfmjs/angular2/directives/popup';

@Component({
    selector: 'cms-edit'
})
@View({
    styles:[`
        .pure-form .pure-input-1-2, .pure-form .pure-button {
            display: block;
            width: 96%;
            margin: 10px auto
        }
        .pure-group {
            margin: 0 0 0 0
        }
    `],
    templateUrl: `templates/cms/index.html`,
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, CKEditor]
})
export class CmsEdit {
    dom:BrowserDomAdapter = new BrowserDomAdapter();
    cmsControls:CmsFormControls = new CmsFormControls(this);
    event:MessageEvent;

    constructor() {
        this.dom.setInnerHTML(this.dom.querySelectorAll(document, "title")[0], 'cms-edit');
    }

    editCms() {
        var self = this, jsonParam = this.cmsControls.toJSON();
        utils.fetch({
            url: 'http://localhost:8888/youyue/cms/add',
            method: 'POST',
            jsonParam: jsonParam
        }).then(function(jsonData) {
            if (jsonData.status === 'success') {
                self.cmsControls.clear();
                popup.pop('提交成功');
            } else {
                console.log(jsonData.msg);
            }
        });
    }

    ng2ckeditorCompleted(event) {
        this.event = event;
    }
}

class CmsFormControls {
    global:any;
    channel:Control = new Control('科技');
    title:Control = new Control('深汕高速惊魂车祸原因查明,大家以后坐车一定要做好这件事!!');
    hasBigImg:Control = new Control(false);
    img1:Control = new Control('http://p2.pstatp.com/list/7383/3883450298');
    img2:Control = new Control('http://p3.pstatp.com/list/7381/5558595450');
    img3:Control = new Control('http://p3.pstatp.com/list/7379/7061490063');
    label:Control = new Control('古今周刊');
    source:Control = new Control('潮州韩水之家');
    sourceUrl:Control = new Control("");

    constructor(global:any) {
        this.global = global;
    }

    clear() {
        this.channel.updateValue("");
        this.title.updateValue("");
        this.hasBigImg.updateValue(false);
        this.img1.updateValue("");
        this.img2.updateValue("");
        this.img3.updateValue("");
        this.label.updateValue("");
        this.source.updateValue("");
        this.sourceUrl.updateValue("");
        this.global.event.source.setData("")
    }

    toJSON() {
        var result = {};
        result['channelName'] = this.channel.value;
        result['title'] = this.title.value;
        result['hasBigImg'] = this.hasBigImg.value;
        result['img1'] = this.img1.value;
        result['img2'] = this.img2.value;
        result['img3'] = this.img3.value;
        result['label'] = this.label.value;
        result['source'] = this.source.value;
        result['sourceUrl'] = this.sourceUrl.value;
        result['content'] = this.global.event.source.getData();
        return result;
    }
}