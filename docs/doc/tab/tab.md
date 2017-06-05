# 标签页

````html
<div class="x-tab">
    <ul class="x-tab-nav">
        <li class="x-active"><a>Section 1</a></li>
        <li class=""><a >Section 2</a></li>
        <li class=""><a >Section 3</a></li>
    </ul>
    <div class="x-tab-contents">
        <div class="x-tab-content x-active">
            <p>I'm in Section 1.</p>
        </div>
        <div class="x-tab-content">
            <p>Howdy, I'm in Section 2.</p>
        </div>
        <div class="x-tab-content">
            <p>What up girl, this is Section 3.</p>
        </div>
    </div>
</div>
````

````js
$('.x-tab-nav li').click(function(){
    var i = $(this).index();
    $(this).addClass('x-active').siblings().removeClass('x-active');
    $('.x-tab-content').eq(i).addClass('x-active').siblings().removeClass('x-active');
});

````