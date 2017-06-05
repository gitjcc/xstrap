
# AMap

## 简介

这里是单独的高德地图api   我们需要引入 mapSdk.js文件 和高德api的链接

````html
 <script src="http://webapi.amap.com/maps?v=1.3&key=a3b3d16e95cfd8d858300d093f839c5f"></script>

    <script src="../../../dist/xstarp.js"></script>
````

## mapObj对象

> map对象

````html

<div id="map"> </div>

````

```js

  var lngLat = [104.056435,30.671192];
  var myMap = XMapSdk(
            {
                dom:'popMap',
                resizeEnable:true,
                center:lngLat,
                zoom:13
            },{
                strokeColor: "#2e90df",
                strokeOpacity: 1,
                strokeWeight: 3,
                strokeStyle:'solid',
                fillColor: "#d2e8f5",
                fillOpacity: 0.5,
                extData:null
            }
    )
    console.log(myMap);
    

```

## 绘制点 线 圆 多边形


>infoWindow信息窗口

```js

var lngLat = [104.056435,30.671192];
   var myMap = XMapSdk(
            {
                dom:'popMap',
                resizeEnable:true,
                center:lngLat,
                zoom:13
            },{
                strokeColor: "#2e90df",
                strokeOpacity: 1,
                strokeWeight: 3,
                strokeStyle:'solid',
                fillColor: "#d2e8f5",
                fillOpacity: 0.5,
                extData:null
            }
    )
  var marker =  myMap.marker(lngLat,'__PUBLIC__/images/marker_icon1.png',-15,-22,{
            content:'<div class="marker"><img src="img/marker_icon1.png"></div>'
        });
   marker.on('click',function(){
            infoWindow.open(myMap.mapObj, marker.getPosition());
        });

   var content ='这是一个信息窗口';
   var infoWindow = myMap.infoWindow(content);

```

>点聚合

```js

  var stsUser = [{
            url: 'http://a.amap.com/lbs/static/img/2.png',
            size: new AMap.Size(32, 32),
            offset: new AMap.Pixel(-16, -30),
            imageOffset: new AMap.Pixel(0, 0),
            textColor: "#fff",
            textSize: 18
        }];
  var cluster = myMap.cluster(stsUser,markers);

```

> 画线

```js
var polyLineArr = new Array();
        polyLineArr.push([104.003322, 30.620255]);
        polyLineArr.push([104.023322, 30.620255]);
        polyLineArr.push([104.013322, 30.590255]);
        var polyLineOpt =  {
            strokeColor: 'red', //线颜色
            strokeOpacity: 1, //线透明度
            strokeWeight: 3,    //线宽
        };
        var polyLine= myMap.polyLine(polyLineArr,polyLineOpt);
```



> 画圆 circle

```js
    var circleOpt =  {
                               strokeColor: "#5F33FF",
                               strokeWeight: 3,
                               fillColor: "red",
                               fillOpacity: 0.35
                           };

    var circle = myMap.circle([104.032292, 30.692353],3000,circleOpt);//单位  米

```

> 画多边形  polygon

```js
   var polygonArr = new Array();//多边形覆盖物节点坐标数组
   polygonArr.push([104.003322, 30.620255]);
   polygonArr.push([104.010703, 30.697555]);
   polygonArr.push([104.032292, 30.692353]);
   polygonArr.push([104.089846, 30.691365]);
   var polyPolygonOpt = {
       strokeColor: "#FF33FF",
       strokeOpacity: 1,
       strokeWeight: 3,
       fillColor: "#1791fc",
       fillOpacity: 0.35
       };
   var polygon = myMap.polygon(polygonArr,polyPolygonOpt);

```


## 鼠标编辑多边形和圆

> 编辑多边形和圆

```js
  var circleEdit =   myMap.circleEditor(circle,function(){
                               console.log("circle ------ endCb");
                           },function(){
                               console.log("circle ------ adjust");
                           },function(){
                               console.log("circle ------ moveCb");
                           });


                           var polygonEdit =    myMap.polygonEdit(polygon,function(){
                               console.log('polygon ------ endCb');
                           });

```

## 搜索

> 按字符串搜索

```js
myMap.placeSearch('成都',10,function(poiList){
            var html = '';
            console.log(poiList);
            for (var item in poiList){
                html +='<li>'+poiList[item].name+'</li>';
            }
            $(".searchResult").html(html);
        });
```



> 搜索行政区名称  返回行政区多边形点数组

```js

 //搜索  搜行政区名称  返回行政区矩形数组
    myMap.districtSearch('成都市','boundaries',function(isOk,data){
        var opt = {
            strokeColor: "red", //线颜色
            strokeOpacity: 0.8, //线透明度
            strokeWeight: 3,    //线宽
        };
        var polygon = myMap1.polygon(data['boundaries'],opt);
    });
```

## 地理编码，反地理编码

> 地理编码  传入地址返回  坐标

```js

myMap.geoCoder('成都市武侯区西部智谷D区',function(data){
            var html= '';
            for (var i = 0; i < data.length; i++) {
                //拼接输出html
                html += "<span style=\"font-size: 12px;padding:0px 0 4px 2px; border-bottom:1px solid #C1FFC1;\">" +
                    "<b>地址</b>：" + data[i].formattedAddress + "" + "&nbsp;&nbsp;<b>的地理编码结果是:</b><b>&nbsp;&nbsp;&nbsp;&nbsp;坐标</b>：" +
                    data[i].location.lng + data[i].location.lat + ", " ;
                var marker =  myMap.marker([data[i].location.lng,data[i].location.lat],'__PUBLIC__/images/marker_icon1.png',-15,-22,{
                    content:'<div class="marker"><img src="img/marker_icon1.png"></div>'
                });
            }

            $(".geoCoderDesc").html(html);
        });

```

> 反地理编码

```js

  myMap.unGeoCoder(marker.getPosition(),function(data){
            console.log(data);
            var html = '当前点坐标:'+marker.getPosition()+'&nbsp &nbsp&nbsp&nbsp&nbsp当前点的地址是：'+data;
            $(".unGeoCoderDesc").html(html)
        });
```

## 弹出地图

>点击弹出地图  选择某个点后 返回


```html

 <div class="address x-mapPopButton x-button  x-button-cadetblue">点击弹出地图窗口</div>
                       <div class="x-popMap" style="">
                           <div id="popMap" class=""></div>
                           <div class="x-popMap-option"><span class="x-popMap-ok x-button ">确定</span><span class="x-button   x-popMap-cancel">关闭</span></div>
                       </div>
```
```js
 var lngLat = [104.056435,30.671192];
                           $("#popMap").css({'width':'800px', 'height':'500px'});
                           var myMap3 = XMapSdk(
                               {
                                   dom:'popMap',
                                   resizeEnable:true,
                                   center:lngLat,
                                   zoom:13
                               },{
                                   strokeColor: "#2e90df",
                                   strokeOpacity: 1,
                                   strokeWeight: 3,
                                   strokeStyle:'solid',
                                   fillColor: "#d2e8f5",
                                   fillOpacity: 0.5,
                                   extData:null
                               }
                           );
                           $(".address").click(function(){
                               var data = Array();
                               for (var i = 0; i < 4; i++) {
                                   var lng = 104.056435 + i*0.01;
                                   var lat = 30.671192-i*0.02;
                                   var item ={
                                       lng:lng,
                                       lat:lat,
                                       extData:{
                                           address:'成都市武侯区西部智谷',
                                           name:'烧烤店',
                                           id:i
                                       },
                                       defImg:'img/marker_icon1.png',//marker点图标url  不传有默认
                                       selectImg:'img/marker_select.png',//marker选中后的图标
                                   };
                                   data.push(item);
                               }
                               myMap3.popMap(data,function(data){
                                   console.log("当前选中点的的数据");
                                   console.log(data);
                               },function(data1){
                                   console.log("你所点击的位置");
                                   console.log(data1);
                               });
                           });
```


## 上大屏模式


```html

<div id="container" style="height: 600px;margin: 50px 0;width: 100%;box-sizing: border-box">
    <div class="option_btn" style=" position: absolute;bottom: 10px;right: 20px;z-index: 10;">
        <span class="fullScreen x-button" id="view-fullscreen">上大屏模式</span>
        <span class="x-button cancel" id="cancel-fullscreen" >退出大屏模式</span>
    </div>
```

```js

//投影模式  上大屏  F11 全屏  按钮
 var docElm = document.getElementById("container");
    var lngLat = [104.056435,30.671192];
    var myMap3 = XMapSdk(
            {
                dom:'container',
                resizeEnable:true,
                center:lngLat,
                zoom:13
            },{
                strokeColor: "#2e90df",
                strokeOpacity: 1,
                strokeWeight: 3,
                strokeStyle:'solid',
                fillColor: "#d2e8f5",
                fillOpacity: 0.5,
                extData:null
            }
    );

    var viewFullScreen = document.getElementById("view-fullscreen");
    var cancelFullScreen = document.getElementById("cancel-fullscreen");


    if (viewFullScreen) {
        viewFullScreen.addEventListener("click", function () {
            console.log("上大屏");
            launchFullScreen();
        }, false);
    }

    var isFullScreen = false;

    function setWidthAndHeight(width,height,margin){
        if(!margin){
            margin = 0;
        }
        $(docElm).css({'width':width,'height':height,'margin':margin});
//        $(docElm).css({'width':width,'height':height,'margin':margin});
    }
    function  setHeight(){

    }
    if (cancelFullScreen) {
        cancelFullScreen.addEventListener("click", function () {
            console.log("退出上大屏");
            exitFullScreen();
        }, false);
        var de = document;
        if (de.exitFullscreen) {
            de.exitFullscreen();
        } else if (de.mozCancelFullScreen) {
            de.mozCancelFullScreen();
        } else if (de.webkitCancelFullScreen) {
            de.webkitCancelFullScreen();
        }
    }


    document.addEventListener("fullscreenchange", function () {
        isFullScreen = (document.fullscreenElement) ? true : false;


    }, false);

    document.addEventListener("msfullscreenchange", function () {
        isFullScreen = (document.msFullscreenElement) ? true : false;

    }, false);

    document.addEventListener("mozfullscreenchange", function () {
        isFullScreen = (document.mozFullScreen) ? true : false;

    }, false);

    document.addEventListener("webkitfullscreenchange", function () {
       isFullScreen = (document.webkitIsFullScreen) ? true : false;
//        commandMethod.isFullSet(isJudge_var.isFullScreen);

    }, false);


    function launchFullScreen() {

        //进入全屏 投影模式
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();

        }
        else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
            //                    alert('进入全屏');

        }
        else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();

        }
        else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();

        }
        setWidthAndHeight('100%','100%');
    }

    function exitFullScreen() {
        var docElm = document;

        //退出全屏  投影模式
        if (docElm.exitFullscreen) {
            docElm.exitFullscreen();
        }
        else if (docElm.msExitFullscreen) {
            docElm.msExitFullscreen();
        }
        else if (docElm.mozCancelFullScreen) {
            docElm.mozCancelFullScreen();
        }
        else if (docElm.webkitCancelFullScreen) {
            docElm.webkitCancelFullScreen();
        }
        setWidthAndHeight('100%','600px','50px 0');
    }

    var    $win = $(window);
    //win的resize方法   会在执行上大屏和退出上大屏后执行
    $win.bind('resize', function () {
        console.log(isFullScreen);
        if (!isFullScreen) {
            $(".cancel").click();
        }else {
            $(".fullScreen").click();
        }
    });

```

## 说明

  注：需要调用高德地图js api 去高德开放平台注册并领取自己的key值然后引入高德api

>属性：

  <table class="x-table x-table-interval">
            <thead>
            <tr><th>属性</th><th>类型</th><th>说明</th><th>所属对象</th><th>默认值</th></tr></thead>
            <tbody>
            <tr>
                <td>dom</td>
                <td>String</td>
                <td>地图容器DIV的ID值或者DIV对象</td>
                <td>XMapSdk</td>
                <td></td>
            </tr>
            <tr>
                <td>resizeEnable</td>
                <td>Boolean</td>
                <td>是否监控地图容器尺寸变化</td>
                <td>XMapSdk</td>
                <td>false</td>
            </tr>
            <tr>
                <td>center</td>
                <td>LngLat</td>
                <td>地图中心点坐标值</td>
                <td>XMapSdk</td>
                <td>无</td>
            </tr>
            <tr>
                <td>zoom</td>
                <td>Number</td>
                <td>地图显示的缩放级别</td>
                <td>XMapSdk</td>
                <td>默认显示用户所在城市范围</td>
            </tr>
            <tr>
                <td>strokeColor</td>
                <td>String</td>
                <td>线条的颜色,使用16进制颜色代码赋值</td>
                <td>点标记、圆、多边形</td>
                <td>#2e90df</td>
            </tr>
            <tr>
                <td>strokeOpacity</td>
                <td>Number</td>
                <td>用于画圆和多边形的线的透明度</td>
                <td>点标记、圆、多边形</td>
                <td>1</td>
            </tr>
            <tr>
                <td>strokeWeight</td>
                <td>Number</td>
                <td>用于画圆和多边形的线的宽度</td>
                <td>点标记、圆、多边形</td>
                <td>3</td>
            </tr>
            <tr>
                <td>strokeStyle</td>
                <td>String</td>
                <td>用于画圆和多边形的线样式</td>
                <td>点标记、圆、多边形</td>
                <td>solid (solid,dashed)</td>
            </tr>
            <tr>
                <td>fillColor</td>
                <td>String</td>
                <td>用于填充圆和多边形的颜色，使用16进制颜色代码赋值</td>
                <td>点标记、圆、多边形</td>
                <td>#d2e8f5</td>
            </tr>
            <tr>
                <td>fillOpacity</td>
                <td>float</td>
                <td>填充色的透明度</td>
                <td>点标记、圆、多边形</td>
                <td>0.5 （0-1）</td>
            </tr>
            <tr>
                <td>zIndex</td>
                <td>Number</td>
                <td>用户自定义属性，支持JavaScript API任意数据类型</td>
                <td></td>
                <td>无</td>
            </tr>
            <tr>
                <td>zoomEnable</td>
                <td>Boolean</td>
                <td>地图是否可缩放</td>
                <td>XMapSdk</td>
                <td>true</td>
            </tr>
            <tr>
                <td>extData</td>
                <td>Any</td>
                <td>地图上对象的叠加顺序，默认后添加的在上面</td>
                <td></td>
                <td>无</td>
            </tr>
            </tbody>
  </table>

>方法

  <table class="x-table x-table-interval">
            <thead>
            <tr><th>方法</th><th>返回值</th><th>参数</th><th>说明</th><th>所属对象</th><th>示例</th></tr>
            </thead>
            <tbody>
            <tr>
                <td>on(type,function(){})</td>
                <td>无</td>
                <td>1、String:事件类型(如：click等),2、function:触发该事件后的操作函数</td>
                <td>为地图上的点标记或多边形或圆绑定事件</td>
                <td>点标记、圆、多边形</td>
                <td>marker.on('click',function(){})</td>
            </tr>
            <tr>
                <td>off(type)</td>
                <td>无</td>
                <td>1、String:事件类型(如：click等)</td>
                <td>移除地图上的点标记或多边形或圆的指定事件</td>
                <td>点标记、圆、多边形</td>
                <td>marker.off('click',function(){})</td>
            </tr>
            <tr>
                <td>getPosition()</td>
                <td>lngLat(坐标)</td>
                <td></td>
                <td>获取标记点的坐标</td>
                <td>点标记</td>
                <td>marker.getPosition()</td>
            </tr>
            <tr>
                <td>setPosition(lngLat)</td>
                <td></td>
                <td>1、lngLat:点坐标</td>
                <td>重新设置点的坐标位置</td>
                <td>点标记</td>
                <td>marker.setPosition(lngLat)</td>
            </tr>
            <tr>
                <td>polygon(Point,opt)</td>
                <td>多边形对象</td>
                <td>1、Array:二维数组,多边形的顶点坐标,2、object:多边形各项属性配置</td>
                <td>初始化polygon多边形的方法</td>
                <td>XMapSdk</td>
                <td>myMap.polygon(polygonArr,polyOpt)</td>
            </tr>
            <tr>
                <td>marker(lngLat,url,x,y)</td>
                <td>点标记对象</td>
                <td>1、lngLat:点标记坐标,2、String:自定义图标的URL，3、pixelX：点标记显示位置偏移量X，4、pixelY：点标记显示位置偏移量X,5、String:自定义点标记的内容</td>
                <td>初始化marker点标记的方法</td>
                <td>XMapSdk</td>
                <td> myMap.marker(lngLat,'img',-15,-22,{content:''})</td>
            </tr>
            <tr>
                <td>cluster(sts,markers)</td>
                <td>点标记聚合对象</td>
                <td>1、sts:配置属性,2、markers:marker点对象数组</td>
                <td>初始化marker点聚合的方法</td>
                <td>XMapSdk</td>
                <td> myMap.cluster(sts,markers)</td>
            </tr>
            <tr>
                <td>circle(lngLat,radius,opt)</td>
                <td>圆对象</td>
                <td>1、lngLat:圆心坐标,2、String:圆半径 单位：米，3、object：圆属性配置</td>
                <td>初始化圆的方法</td>
                <td>XMapSdk</td>
                <td>myMap.circle([104.032292, 30.692353],1000,circleOpt);</td>
            </tr>
            <tr>
                <td>circleEditor(circle,function(){},function(){},function(){})</td>
                <td>圆编辑对象</td>
                <td>1、Circle:圆对象,2、function:结束编辑后的回调函数，3、function：结束过程中触发的函数，4、圆心移动过程中触发的函数</td>
                <td>对圆进行编辑</td>
                <td>XMapSdk</td>
                <td>myMap.circleEditor(circle,function(){},function(){},function(){});</td>
            </tr>
            <tr>
                <td>polygonEdit(polygon,function(){})</td>
                <td>多边形编辑对象</td>
                <td>1、Polygon:多边形对象,2、function:结束编辑后的回调函数</td>
                <td>对多边形进行编辑</td>
                <td>XMapSdk</td>
                <td>myMap.circleEditor(polygon,function(){})</td>
            </tr>
            <tr>
                <td>close()</td>
                <td></td>
                <td>无</td>
                <td>关闭编辑</td>
                <td>编辑对象(多边形和圆)</td>
                <td>polygonEdit.close();</td>
            </tr>
            <tr>
                <td>placeSearch(str,function(poiList){})</td>
                <td></td>
                <td>1、String:搜索的关键字，2、function(poiList):搜索完成后的回调 poiList：搜索结果</td>
                <td>搜索</td>
                <td>XMapSdk</td>
                <td>myMap.placeSearch('成都市',function(poiList){})</td>
            </tr>
            <tr>
                <td>districtSearch(str,type,function(isOk,data){})</td>
                <td></td>
                <td>1、String:地名，2、String:搜索的类型(boundaries:返回所有数据,district：行政区域)，3、function(isOk,data):搜索完成后的回调 isOk:是否搜索成功 data：搜索结果</td>
                <td>行政区域搜索</td>
                <td>XMapSdk</td>
                <td>myMap.districtSearch('成都市','boundaries',function(isOk,data){});</td>
            </tr>
            <tr>
                <td>infoWindow(content)</td>
                <td>信息窗体对象</td>
                <td>1、String:信息窗体内容</td>
                <td>初始化信息窗体</td>
                <td>XMapSdk</td>
                <td>myMap.infoWindow(content);</td>
            </tr>
            <tr>
                <td>open(mapObj,lngLat)</td>
                <td></td>
                <td>1、Map:地图对象 2、lngLat:窗体中心坐标点</td>
                <td>打开信息窗体</td>
                <td>infoWindow</td>
                <td>infoWindow.open(myMap.mapObj, marker.getPosition());</td>
            </tr>
            <tr>
                <td>close()</td>
                <td></td>
                <td></td>
                <td>关闭信息窗体，一个地图上只能同时展示一个窗体</td>
                <td>infoWindow</td>
                <td>infoWindow.close();</td>
            </tr>
            <tr>
                <td>mouseTool(type,function(obj){},opt)</td>
                <td>mouseTool对象</td>
                <td>1、String:区分线，点，多边形(polyLine,marker,polygon,circle) 2、function(obj):进行完本次操作后的回调，其中obj为对象 3、option:圆或多边形或点标记的配置属性</td>
                <td>开始用鼠标在地图上画线或点或多边形</td>
                <td>XMapSdk</td>
                <td>myMap.mouseTool('polyLine',function(obj){},polyLineOpt);</td>
            </tr>
            <tr>
                <td>geoCoder(address,function(data){})</td>
                <td>无</td>
                <td>1、String:地址 2、function(data):地理编码后调用的函数，data 返回的数据</td>
                <td>传入地址进行地理编码(详细地址)</td>
                <td>XMapSdk</td>
                <td> myMap2.geoCoder('成都市武侯区西部智谷D区',function(data){})</td>
            </tr>
            <tr>
                <td>unGeoCoder(lngLat,function(data){})</td>
                <td>无</td>
                <td>1、String:点坐标 2、function(data):反地理编码后返回的数据，data 返回的数据 </td>
                <td>传入点坐标进行反地理编码</td>
                <td>XMapSdk</td>
                <td>myMap2.unGeoCoder(marker.getPosition(),function(data){ </td>
            </tr>
            <tr>
                <td>setOption(opt)</td>
                <td>无</td>
                <td>1、object:样式属性 </td>
                <td>设置多边形，圆，线的样式</td>
                <td>圆，线，多边形</td>
                <td>marker.setOption(opt)</td>
            </tr>
            <tr>
                <td>show()</td>
                <td>无</td>
                <td></td>
                <td>显示对象</td>
                <td>圆，线，多边形，点</td>
                <td>marker.show()</td>
            </tr>
            <tr>
                <td>hide()</td>
                <td>无</td>
                <td></td>
                <td>隐藏对象</td>
                <td>圆，线，多边形，点</td>
                <td>marker.hide()</td>
            </tr>
            <tr>
                <td>popMap()</td>
                <td>无</td>
                <td>
                    1、data 传入需要渲染在地图上的点数据数组,  其中defImg 和selectImg分别是默认点标记图标和选中后点标记图标(可选，有默认)，
                    2、function(data){} data:选中点的数据，返回选中点的数据的函数，
                    3、function(data){} data:鼠标左键点击的位置的坐标和地址，鼠标左点击后中回调函数</td>
                <td>弹出快捷地图，注：这里传入的data中的属性extData是自定义需要传递的数据</td>
                <td>XMapSdk</td>
                <td>myMap3.popMap(data,function(data){},function(data){})</td>
            </tr>
            <tr>
                <td>closePopMap()</td>
                <td>无</td>
                <td></td>
                <td>关闭快捷地图弹窗</td>
                <td>XMapSdk</td>
                <td>myMap3.closePopMap();</td>
            </tr>
            <tr>
                <td>calculateCenter(lnglatarr)</td>
                <td>lnglat坐标点</td>
                <td>lnglatArr:多边形坐标数组</td>
                <td>返回多边形中心点</td>
                <td>XMapSdk</td>
                <td>myMap3.calculateCenter(lnglatarr);</td>
            </tr>

            </tbody>
  </table>


