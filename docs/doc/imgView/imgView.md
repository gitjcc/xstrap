# 图片查看器

## 示例

````html

<span class="x-button-middle x-button x-button-cadetblue imgview_button">
   查看图片
</span>

<span class="x-button-middle x-button x-button-orange imgview_button2">
    查看图片2
</span>

<div class="imgview_content" style="display: none">
    内容：
    <p>这里可以是 任何自定义的html</p>
    <p>这里可以是 任何自定义的html</p>
    <p>这里可以是 任何自定义的html</p>
    <p>这里可以是 任何自定义的html</p>
</div>
````

````js
var option1={
    imgs:['./img/a1.png','./img/a2.png','./img/a3.png']
};
/*加一个 主题的宿主  的 option*/
var option2={
    imgs:['./img/a1.png','./img/a2.png','./img/a3.png'],
    infoDom:$('.imgview_content')
};

$('.imgview_button').click(function(){
    xImgView(option1);
});

$('.imgview_button2').click(function(){
    xImgView(option2);
});
````