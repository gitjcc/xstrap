var map = new SMap.Map('container', {
    resizeEnable: true,
    zoom: 14,
    center: [116.397428, 39.90923]
  });

  map._inner.enableScrollWheelZoom();

//var map = new BMap.Map("container");          // 创建地图实例
//var point = new BMap.Point(116.404, 39.915);  // 创建点坐标
//map.centerAndZoom(point, 15);

  var marker = new SMap.Marker({
    map: map,
    position: [116.397428, 39.90923],
    title: 'hello world'
  });

  var marker1 = new SMap.Marker({
    map: map,
    position: [116.398428, 39.91923],
    title: 'hello world'
  });

  function mh(e) {
    console.log(e);
    console.log("你点击了我！");
  }
 marker.on('click', mh);
//   SMap.event.addListener(marker, 'click', mh);
// //  marker.off('click', mh);

  var iw = new SMap.InfoWindow({
    content: 'Hello SMap',
    position: [116.397428, 39.90923]
  });

  iw.open( map, new SMap.LngLat({lng: 116.397428, lat: 39.90923}) );

  var lineArr = [
    [116.368904, 39.913423],
    [116.382122, 39.901176],
    [116.387271, 39.912501],
    [116.398258, 39.904600]
  ];
  var polyline = new SMap.Polyline({
    path: lineArr,          //设置线覆盖物路径
    strokeColor: "#3366FF", //线颜色
    strokeOpacity: 1,       //线透明度
    strokeWeight: 5,        //线宽
    strokeStyle: "solid",   //线样式
    strokeDasharray: [10, 5] //补充线样式
  });
  polyline.setMap(map);

  var circle = new SMap.Circle({
    map: map,
    center: new SMap.LngLat("116.403322", "39.920255"),// 圆心位置
    radius: 1000, //半径
    strokeColor: "#F33", //线颜色
    strokeOpacity: 1, //线透明度
    strokeWeight: 3, //线粗细度
    fillColor: "#ee2200", //填充颜色
    fillOpacity: 0.35//填充透明度
  });
//  circle.setMap(map);

  circle.on('click', mh);

  var polygonArr = [];//多边形覆盖物节点坐标数组
  polygonArr.push([116.403322, 39.920255]);
  polygonArr.push([116.410703, 39.897555]);
  polygonArr.push([116.402292, 39.892353]);
  polygonArr.push([116.389846, 39.891365]);
  var  polygon = new SMap.Polygon({
    path: polygonArr,//设置多边形边界路径
    strokeColor: "#FF33FF", //线颜色
    strokeOpacity: 0.2, //线透明度
    strokeWeight: 3,    //线宽
    fillColor: "#1791fc", //填充色
    fillOpacity: 0.35//填充透明度
  });
  polygon.setMap(map);

  var sts = [{
    url: "http://localhost:9000/test/map/img/m0.png",
    size: new SMap.Size(53, 52)
  }, {
    url: "http://localhost:9000/test/map/img/m1.png",
    size: new SMap.Size(56, 56)
  }, {
    url: "http://localhost:9000/test/map/img/m2.png",
    size: new SMap.Size(56, 56),
    offset: new SMap.Pixel(0, 0),
    textColor: '#CC0066'
  }];

//  sts = [{
//    url: 'http://localhost:9000/test/images/m2.png',
//    size: new SMap.Size(55, 56),
//    textColor: '#CC0066',
//    textSize: 20
//  }, {
//    url: 'http://localhost:9000/test/images/m2.png',
//    size: new SMap.Size(55, 56),
//
//    textColor: '#CC0066',
//    textSize: 20
//  }, {
//    url: 'http://localhost:9000/test/images/m2.png',
//    size: new SMap.Size(55, 56),
//    textColor: '#CC0066',
//    textSize: 20
//  }];

  var markers = [];
  var cluster;

  var markerArr = [
    [116.403322, 39.920255],
    [116.410703, 39.897555],
    [116.402292, 39.892353],
    [116.389846, 39.891365]
  ];

  markerArr.forEach( function(item) {
    var t = new SMap.Marker({
      map: map,
      position: item,
      title: 'hello world'
    });

    markers.push(t);
  });

  map.plugin([SMap.sPlugin.MarkerClusterer], function() {

    cluster = new SMap.MarkerClusterer(map, markers, {
//      imagePath: 'http://localhost://test/map/images/m',
      styles: sts
    });
  });


