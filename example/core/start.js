/**
 * 应用入口函数
 */
perfmjs.ready(function($$, app) {
    //注册启动业务对象实例
    app.register($$.module1);
    app.register($$.module2, {callback:function() {
        //alert('started base.module2');
    }});
    app.register($$.module3);
    app.startAll();

    //try jQuery功能
    if (typeof jQuery === 'undefined') {
        alert('如果想使用jQuery框架的功能，请加载jquery模块!');
        return;
    }
    $('#jq_try_btn').unbind();
    $('#jq_try_btn').bind('click', function() {
        alert('jQuery is loaded, clicked!');
    });
});
