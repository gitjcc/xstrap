# placeholder

A jQuery plugin that enables HTML5 placeholder behavior for browsers that aren’t trying hard enough yet

## 说明
为input、textarea元素启用jQuery.placeholder.js插件。
````js
$('input, textarea').placeholder();//默认class为"placeholder"
$('input, textarea').placeholder({customClass: 'xstrap-placeholder-for-ie'});
````

## 示例
````html
<style>
input, textarea {
    display: block;
    color: #EA4335;
}

.xstrap-placeholder-for-ie {
    color: #4285F4;
}
</style>
<form action="">
    <input type="text" class="a" placeholder="狼人杀12人局" value="这ie有毒">
    <input type="text" class="b" placeholder="预言家" value="">
    <input type="text" class="c" placeholder="女巫" value="">
    <input type="text" class="d" placeholder="猎人" value="">
    <input type="text" class="e" placeholder="守卫" value="">
    <input type="text" class="f" placeholder="白狼王" value="">
    <input type="text" class="g" placeholder="狼人x3" value="">
    <input type="text" class="h" placeholder="村民x4" value="">
    <textarea name="" id="" cols="30" rows="10" placeholder="角色">预女猎守+白狼王</textarea>
    <textarea name="" id="" cols="30" rows="10" placeholder="规则"></textarea>
</form>
````

````js
$(document).ready(function () {
    $('input, textarea').placeholder({customClass: 'xstrap-placeholder-for-ie'});
});
````