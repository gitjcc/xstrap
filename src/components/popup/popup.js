/**
 * Created by Administrator on 2016/12/27.
 */

require('./popup.scss');

module.exports = window.xPopUp = function(type,option,time) {
    var layerDom; //底部遮罩层
    var mainDom; //主体内容
    var closeDom; //关闭按钮
    var contentDom; //内容



    //关闭弹窗
    function onClose(){
        mainDom.remove();
        layerDom.remove();
        $('body').css({overflow:'auto'});
    }

    //初始化操作
    function init(){

        option = {
            p_width:600,
            p_height:150,
            title:'提示',
            content:'',
            btn:'',
            isClose:true, //是否关闭
            confirmfn:function(){},
            closefn:function(){}
        };

        $('body').css({overflow:'hidden'});

        //遮罩层
        layerDom = $('<div class="x-pop-layer"></div>');
        layerDom.appendTo('body');


        //弹窗主体
        mainDom = $('<div class="x-pop-main"></div>');

        mainDom.appendTo('body');


        //关闭按钮
        closeDom = $('<div class="x-pop-close"><i class="iconfont icon-cuowu"></i></div>');

        closeDom.appendTo(mainDom);

        layerDom.click(function(){
            onClose();
        });
        closeDom.click(function(){
            onClose();
        });

        return mainDom;
    }

    //弹窗初始化位置
    function initPosition(mainDom){
        var cW = $(window).width();
        var cH = $(window).height();

        var popWidth = mainDom.width()+30;
        var popHeight = mainDom.height()+30;


        var pl = (cW-popWidth) / 2;
        var pt = $(document).scrollTop()-popHeight/2+cH/2;

        mainDom.css({
            left:pl,
            top:pt
        });

        window.onresize = function(){
            initPosition(mainDom);
        };
    }

    //提示
    function promptPop(option,time){

        mainDom = init();

        mainDom.css({
            width:option.p_width,
            height:option.p_height
        });

        if(option.btn){
            var btnHtml = '';
            $.each(option.btn,function(i,n){
                btnHtml+='<button class="x-button '+n.classStr+'">'+n.name+'</button>'
            });
        }


        contentDom = $('<div><div class="x-pop-title">提示</div>'+
            '<div class="x-pop-content"></div>'+
            '<div class="x-pop-button"></div></div>');
        contentDom.appendTo(mainDom);

        var pop_con = contentDom.find('.x-pop-content');
        var pop_btn = contentDom.find('.x-pop-button');

        pop_con.html(option.content);
        pop_btn.html(btnHtml);

        initPosition(mainDom);

        pop_btn.find('button').click(function(){
            onClose();
        });

        if(time){
            setTimeout(onClose,time)
        }
    }

    //确定
    function confirmPop(option){
        mainDom = init();

        mainDom.css({
            width:option.p_width,
            height:option.p_height
        });

        contentDom = $('<div><div class="x-pop-title">提示</div>'+
            '<div class="x-pop-content"></div>'+
            '<div class="x-pop-button"><button class="x-button x-confirm">确定</button><button class="x-button cancel">取消</button></div></div>');
        contentDom.appendTo(mainDom);


        var pop_con = contentDom.find('.x-pop-content');
        var pop_btn = contentDom.find('.x-pop-button');

        pop_con.html(option.content);


        initPosition(mainDom);

        pop_btn.find('.x-confirm').click(function(){
            if(!option.isClose){
                if(typeof option.confirmfn == 'function'){
                    option.confirmfn();
                    onClose();
                }else{
                    onClose();
                }
            }else{
                onClose();
            }

        });

        pop_btn.find('.cancel').click(function(){
            if(!option.isClose){
                if(typeof option.closefn == 'function'){

                    option.closefn();
                    onClose();
                }else{
                    onClose();
                }
            }else{
                onClose();
            }

        });



    }

    //自定义
    function userDefined(option){

        mainDom = init();

        mainDom.css({
            width:option.p_width,
            height:option.p_height
        });

        if(option.btn){
            var btnHtml = '';
            $.each(option.btn,function(i,n){
                btnHtml+='<button class="x-button '+n.classStr+'">'+n.name+'</button>'
            });
        }


        contentDom = $('<div><div class="x-pop-title"></div>'+
            '<div class="x-pop-content"></div>'+
            '<div class="x-pop-button" style="text-align:right;"></div></div>');
        contentDom.appendTo(mainDom);

        var pop_tit = contentDom.find('.x-pop-title');
        var pop_con = contentDom.find('.x-pop-content');
        var pop_btn = contentDom.find('.x-pop-button');



        pop_tit.html(option.title);
        pop_con.html(option.content);
        pop_btn.html(btnHtml);


        var pop_btn2 = contentDom.find('.x-pop-button button');
        initPosition(mainDom);

        $.each(option.btn,function(i,n){
            pop_btn2.eq(i).click(function() {
                if(!n.isClose){
                    if(n.opra){
                        n.opra();
                    }
                }else{
                    if(n.opra){
                        n.opra();
                        onClose();
                    }else{
                        onClose();
                    }

                }
            })

        })

    }

    if (type === 'prompt') {
        promptPop(option,time);
    } else if (type === 'confirm') {
        confirmPop(option);
    } else {
        userDefined(option);
    }
};