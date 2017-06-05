/**
 * Created by Administrator on 2017/2/17.
 */

require('./nav.scss');

//导航-侧边栏
$(".x-nav-head").click(function() {
    $(this).next('ul').slideToggle(300).parent().siblings('li').find('ul').slideUp();
    $(this).toggleClass('x-cur').parent().siblings('li').find('a.x-nav-head').removeClass('x-cur');

    if($(this).hasClass('x-cur')){
        $(this).find('i').removeClass('icon-xiangxia1').addClass('icon-xiangshang2');
        $(this).parent().siblings('li').find('i').addClass('icon-xiangxia1').removeClass('icon-xiangshang2');
    }else{
        $(this).find('i').addClass('icon-xiangxia1').removeClass('icon-xiangshang2');
    }
});

//导航-水平
$('.x-nav-item').click(function(){
    $(this).addClass('x-active').siblings('li').removeClass('x-active');
});