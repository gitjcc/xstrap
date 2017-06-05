/**
 * Created by Administrator on 2017/2/17.
 */


require('./tip.scss');

$.fn.extend({
    hoverTips : function (){
        var self = $(this);

        var content = self.find('.x-tip-container').attr("data-tips");
        var htmlDom = $("<div class='x-tip-dialog'>")
            .html("<p class='x-tip-content'></p>"
                + "<p class='x-tip-cor'></p>");
        htmlDom.find(".x-tip-content").html( content );

        self.on("mouseenter",function(){
            self.append( htmlDom );
            var top = htmlDom.outerHeight() + parseInt(htmlDom.find(".x-tip-cor").css("border-width"));
            htmlDom.css({"left":0,"top":-top,"display":"block"});
            htmlDom.stop().animate({ "top" : -top ,"opacity" : 1},300);
        });

        self.on("mouseleave",function(){
             iTime = setTimeout(function(){
                htmlDom.remove();
            },500);
        });

        $('body').on("mouseenter",'.x-tip-dialog',function(){
            clearTimeout(iTime);
        });

    }
});

