# 导航

````html
<div class="x-tab">
    <ul class="x-tab-nav">
        <li class="x-tab-li  x-active"><a>水平导航</a></li>
        <li class="x-tab-li"><a>侧边导航</a></li>
    </ul>
    <div class="x-tab-contents">
        <div class="x-tab-content x-active">
            <ul class="x-nav x-nav-cross">
                <li class="x-nav-item x-active"><a href="javascript:void(0)">最新活动</a></li>
                <li class="x-nav-item"><a href="javascript:void(0)">最新活动</a></li>
                <li class="x-nav-item"><a href="javascript:void(0)">最新活动</a></li>
                <li class="x-nav-item"><a href="javascript:void(0)">最新活动</a></li>
                <li class="x-nav-item"><a href="javascript:void(0)">最新活动</a></li>
            </ul>
        </div>

        <div class="x-tab-content">
            <ul class="x-nav x-nav-sidebar">
                <li class="x-nav-item">
                    <a class="x-nav-head">主菜单1<i class="iconfont icon-xiangxia1"></i></a>
                    <ul class="x-nav-child" style="display:none">
                        <li><a href="javascript:void(0)">选项1</a></li>
                        <li><a href="javascript:void(0)">选项1</a></li>
                        <li><a href="javascript:void(0)">选项1</a></li>
                    </ul>
                </li>
                <li class="x-nav-item">
                    <a class="x-nav-head">主菜单2<i class="iconfont icon-xiangxia1"></i></a>
                    <ul class="x-nav-child" style="display:none">
                        <li><a href="javascript:void(0)">选项1</a></li>
                        <li><a href="javascript:void(0)">选项1</a></li>
                        <li><a href="javascript:void(0)">选项1</a></li>
                    </ul>
                </li>
                <li class="x-nav-item">
                    <a class="x-nav-head">主菜单3<i class="iconfont icon-xiangxia1"></i></a>
                    <ul class="x-nav-child" style="display:none">
                        <li><a href="javascript:void(0)">选项1</a></li>
                        <li><a href="javascript:void(0)">选项1</a></li>
                        <li><a href="javascript:void(0)">选项1</a></li>
                    </ul>
                </li>
                <li class="x-nav-item">
                    <a class="x-nav-head">主菜单4<i class="iconfont icon-xiangxia1"></i></a>
                    <ul class="x-nav-child" style="display:none">
                        <li><a href="javascript:void(0)">选项1</a></li>
                        <li><a href="javascript:void(0)">选项1</a></li>
                        <li><a href="javascript:void(0)">选项1</a></li>
                    </ul>
                </li>
            </ul>
        </div>

    </div>
</div>
````

````js
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

$('.x-tab-nav li').click(function(){
    var i = $(this).index();
    $(this).addClass('x-active').siblings().removeClass('x-active');
    $('.x-tab-content').eq(i).addClass('x-active').siblings().removeClass('x-active');
});
````