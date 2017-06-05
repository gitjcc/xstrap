/**
 * Created by Administrator on 2017/3/3.
 */
//鼠标点击切换顶部标签。
$('.top_tab').click(function(){
    $(this).addClass('top_tab_active').siblings().removeClass('top_tab_active');
});

//鼠标点击用户名标签时显示和隐藏登出框。鼠标离开用户标签时隐藏登出框。
$('.top_user_name').mousedown(function(){
    $('.top_user_more').toggle();
});
$('.top_user').mouseleave(function(){
    $('.top_user_more').hide();
});

//侧边栏
$('.aside_item').mousedown(function(){
    $('.aside_item').removeClass('aside_item_active');
    $(this).addClass('aside_item_active');
});