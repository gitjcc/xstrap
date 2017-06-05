# SMap : Super Map

Super Map 简称SMap。像使用高德地图一样使用Google地图、百度地图。拥有和高度地图一样的API接口实现。

写一套代码即可实现调用Google地图、高德地图、百度地图...

各家API之间的差异，都在SMap的代码中进行封装抹平。

（由于各家API的实现方式上的区别，还是有些差异的，有的API某度确实没有）

## 实现原理：

- SMap为给外部统一的接口。GMap为对Google map的封装。API全部依照高德地图API。
- 像高德地图API一样调用SMap API，输入高德地图数据。
- SMap API 运行后会将高德数据包装成SMap的对象。
- 每个构造函数生成的对象内部有一个属性 <code>_inner</code> 为实际的 Google Map （百度地图） 对应的API生成的 实例对象。 
- 当get 特定的对象时，SMap会对return的内容进行对应的包装，成为外部可用的SMap的各个实例对象，以实现外部的正常使用。

## 关于百度地图的事件绑定相关的问题

百度地图关于事件绑定的API非常的简单，简单到只有只有两个方法：addEventListener和removeEventListener  
查阅相关资料，只有一个EventWrapper lib里面有对应的相关描述。
要实现高德地图里面的事件API，必须自己实现相应的事件。

因此，在DMap(百度地图的封装，BMap是百度地图自己的命名空间)中，event完全是自己模拟的事件API。
和高德地图一样，具有以下方法：
- addDomListener
- addListener
- addListenerOnce
- removeListener
- trigger

## 如何定义不同的地图相应的属性？

百度地图和高德地图的初始属性是不一样的，百度地图默认不能滚轮缩放，所以，要默认滚轮缩放怎么办~

当然，SMap已经在DMap的这套代码中做了这件事儿。

```js
var map = new SMap.Map();
if(typeof BMap !== 'undefined') {
	map._inner.enableScrollWheelZoom();
}
```

## 当SMap的API不够用，必须要使用地图原生API的时候怎么办？

- 每个SMap的类实例化之后都有一个_inner的属性，这个属性对应的就是高德/Google/百度地图的类的实例。
- 调用 marker._inner 即可使用所有的该API提供的方法。
- 利用每个SMap的构造类的实例的_inner属性和SMap的代码进行混合编程，完成特殊需求

> attention: 每个地图API不一致，注意地图自有API之间的差别。

示例：

```js
var map = new SMap.Map('container', {
  resizeEnable: true,
  zoom: 11,
  center: [116.397428, 39.90923]
});

var marker = new SMap.Marker({
  map: map,
  position: [116.397428, 39.90923],
  title: 'hello world'
});

// 下面是使用地图自己的api
marker._inner.setMap( map._inner );
```

## 百度地图

### 覆盖物类

## Other

### 关于百度地图插件

很多功能在百度地图都是通过插件实现的...在使用工具类方法的时候，请保证这个功能插件的代码都已经引入了...

### 三家地图对比

#### API 设计的情况

- 高德最好用
- Google次之
- 百度最次
