# 进度条

## 示例

- 1、默认样式
````html
<div class="x-progress-wrap x-progress-1" >
</div>
````

- 2、带进度提示
````html
<div class="x-progress-wrap x-progress-2" >
</div>
````

- 3、带条纹效果
````html
<div class="x-progress-wrap x-progress-3" >
</div>
````

- 4、条纹效果带动画
````html
<div class="x-progress-wrap x-progress-4" >
</div>
````

- 5、多个进度条堆叠
````html
<div class="x-progress-wrap x-progress-5" >
</div>
````


````js
//基础样式
var xP1 = xProgress2({
    wrap: '.x-progress-1',
    percentage:'10%',
    onchange:function () {console.log('xP1',xP1.percentage);}
});

//带进度提示
var xP2 = xProgress2({
    wrap: '.x-progress-2',
    pclass: 'x-progress-bar x-progress-green',
    tclass: 'x-progress-text',
    percentage:'20%',
    onchange:function () {console.log('xP2',xP2.percentage);}
});

//带条纹效果
var xP3 = xProgress2({
    wrap: '.x-progress-3',
    pclass: 'x-progress-bar x-progress-red x-progress-striped',
    percentage:'30%',
    onchange:function () {console.log('xP3',xP3.percentage);}
});

//条纹效果带动画
var xP4 = xProgress2({
    wrap: '.x-progress-4',
    pclass: 'x-progress-bar x-progress-yellow x-progress-striped x-progress-animated',
    percentage:'40%',
    onchange:function () {console.log('xP4',xP4.percentage);}
});

//多个进度条堆叠
var xP5 = xProgress2({
    wrap: '.x-progress-5',
    pclass: 'x-progress-bar x-progress-red',
    percentage:'10%',
    onchange:function () {console.log('xP5',xP5.percentage);}
});

var xP6 = xProgress2({
    wrap: '.x-progress-5',
    pclass: 'x-progress-bar x-progress-green',
    tclass: 'x-progress-text',
    percentage:'20%',
    onchange:function () {console.log('xP6',xP6.percentage);}
});

var xP7 = xProgress2({
    wrap: '.x-progress-5',
    pclass: 'x-progress-bar x-progress-blue x-progress-striped',
    tclass: 'x-progress-text',
    percentage:'20%',
    onchange:function () {console.log('xP7',xP7.percentage);}
});

var xP8 = xProgress2({
    wrap: '.x-progress-5',
    pclass: 'x-progress-bar x-progress-yellow x-progress-striped',
    tclass: 'x-progress-text',
    percentage:'0%',
    onchange:function () {}
});

$({property: 0}).animate({property: 500}, {
    duration: 10000,
    step: function() {
        var percentage = Math.round(this.property/10);
        xP8.percentage = percentage+"%";
    }
});
````


## API reference
````html
<table class="x-table x-table-interval">
    <thead>
    <tr>
        <th>option对象</th>
        <th>说明</th>
        <th>类型</th>
        <th>默认值</th>
        <th>示例</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>wrap</td>
        <td>进度条的父元素对应的选择器或者jQuery对象</td>
        <td>String Or Object</td>
        <td>'.x-progress-wrap'</td>
        <td>wrap:'.x-progress-5'或者wrap:$('.x-progress-5')</td>
    </tr>
    <tr>
        <td>pclass</td>
        <td>进度条的类名</td>
        <td>String</td>
        <td>'x-progress-bar'</td>
        <td>pclass:'x-progress-bar x-progress-yellow x-progress-striped x-progress-animated'</td>
    </tr>
    <tr>
        <td>tclass</td>
        <td>进度提示内容的类名</td>
        <td>String</td>
        <td>'x-progress-only'</td>
        <td>tclass:'x-progress-text'</td>
    </tr>
    <tr>
        <td>percentage</td>
        <td>初始进度百分比</td>
        <td>String</td>
        <td>'2%'</td>
        <td>percentage:'1%'</td>
    </tr>
    <tr>
        <td>onchange</td>
        <td>进度发生变化之后的回调函数</td>
        <td>Function</td>
        <td>function () {console.log('onchange')}</td>
        <td>onchange:function (hahaha) {console.log('hahaha',hahaha,'xP8',xP8.percentage);}</td>
    </tr>
    </tbody>
</table>

<table class="x-table x-table-interval">
    <thead>
    <tr>
        <th>样式(class名)</th>
        <th>适用元素</th>
        <th>说明</th>
        <th>示例</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>x-progress-wrap</td>
        <td>进度条的父元素</td>
        <td>基础样式(基础)</td>
        <td>&lt;div class="x-progress-wrap"&gt;&lt;/div&gt;</td>
    </tr>
    <tr>
        <td>x-progress-bar</td>
        <td>进度条</td>
        <td>基础样式(基础)</td>
        <td>pclass:'x-progress-bar'</td>
    </tr>
    <tr>
        <td>x-progress-red</td>
        <td>进度条</td>
        <td>red背景(添加)</td>
        <td>pclass:'x-progress-bar x-progress-red'</td>
    </tr>
    <tr>
        <td>x-progress-green</td>
        <td>进度条</td>
        <td>green背景(添加)</td>
        <td>pclass:'x-progress-bar x-progress-green'</td>
    </tr>
    <tr>
        <td>x-progress-blue</td>
        <td>进度条</td>
        <td>blue背景(添加)</td>
        <td>pclass:'x-progress-bar x-progress-blue'</td>
    </tr>
    <tr>
        <td>x-progress-yellow</td>
        <td>进度条</td>
        <td>yellow背景(添加)</td>
        <td>pclass:'x-progress-bar x-progress-yellow'</td>
    </tr>
    <tr>
        <td>x-progress-striped</td>
        <td>进度条</td>
        <td>条纹样式(添加)</td>
        <td>pclass:'x-progress-bar x-progress-striped'</td>
    </tr>
    <tr>
        <td>x-progress-animated</td>
        <td>进度条</td>
        <td>动画样式(添加)，背景向右移动</td>
        <td>pclass:'x-progress-bar x-progress-animated'</td>
    </tr>
    <tr>
        <td>x-progress-only</td>
        <td>进度提示</td>
        <td>隐藏进度提示(默认)</td>
        <td>tclass:'x-progress-only'</td>
    </tr>
    <tr>
        <td>x-progress-text</td>
        <td>进度提示</td>
        <td>显示进度提示</td>
        <td>tclass:'x-progress-text'</td>
    </tr>
    </tbody>
</table>

<table class="x-table x-table-interval">
    <thead>
    <tr>
        <th>属性</th>
        <th>说明</th>
        <th>类型</th>
        <th>操作示例</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>xProgress.option</td>
        <td>构建xProgress时的参数</td>
        <td>Object</td>
        <td></td>
    </tr>
    <tr>
        <td>xProgress.wrap</td>
        <td>进度条的父元素</td>
        <td>jQuery对象</td>
        <td></td>
    </tr>
    <tr>
        <td>xProgress.p</td>
        <td>进度条</td>
        <td>jQuery对象</td>
        <td></td>
    </tr>
    <tr>
        <td>xProgress.t</td>
        <td>进度提示</td>
        <td>jQuery对象</td>
        <td></td>
    </tr>
    <tr>
        <td>xProgress.percentage</td>
        <td>进度百分比</td>
        <td>String</td>
        <td>xProgress.percentage = '20%'</td>
    </tr>
    </tbody>
</table>
````