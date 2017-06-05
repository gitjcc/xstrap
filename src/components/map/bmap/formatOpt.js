/**
 * Created by fizz on 2017/2/14.
 */

var LngLat = require('./LngLat');
var Icon = require('./Icon');
var Size = require('./Size');

module.exports = {

    map: formatOptsUni,

    infoWindow: formatOptsUni,

    marker: formatOptsUni,

    polyline: formatOptsUni,

    polygon: formatOptsUni,

    circle: formatOptsUni,

    markerClusterer: formatMarkerClusterer,

    path: canvertPath
};

function formatOptsUni(opts) {
    if (!opts) return;

    if (typeof opts.position != 'undefined') {
        opts.position = (new LngLat(opts.position))._inner;
    }

    if (opts.path) {
        opts.path = transfromPathToPaths(opts.path);
    }

    if (opts.center) {
        opts.center = (new LngLat(opts.center))._inner;
    }

    if (opts.map) {
        opts.smap = opts.map;
        opts.map = opts.map._inner;
    }
    if (opts.icon) {
        opts.icon = (new Icon(opts.icon))._inner;
    }
    if (opts.size) {
        opts.size = (new Size(opts.size._width,opts.size._height))._inner;
    }
    if (opts.offset) {
        opts.offset = (new Size(opts.offset.getX(),opts.offset.getY()))._inner;
    }

    return opts;
}

function transfromPathToPaths(path) {
    var paths = [];
    path.forEach(function (item, index) {
        paths.push(arrCreateLngLat(item));
    });
    return paths;
}

function arrCreateLngLat(arr) {
    return new BMap.Point(parseFloat(arr[0]), parseFloat(arr[1]));
}


/**
 * @transfer
 * @param {MapObject} map
 * @param {Array} markers
 * @param {Object} opts
 *
 * @return {Object}
 *
 *   newOpts
 *     .map map._inner
 *     .opts{
 *       markers:
 *       styles:
 *     }
 *
 *   *"<b>styles</b>":{Array<IconStyle>} 一组图标风格。单个图表风格包括以下几个属性：<br />
 *   url    {String}     图片的url地址。(必选)<br />
 *   size {Size}    图片的大小。（必选）<br />
 *   anchor {Size} 图标定位在地图上的位置相对于图标左上角的偏移值，默认偏移值为图标的中心位置。（可选）<br />
 *   offset {Size} 图片相对于可视区域的偏移值，此功能的作用等同于CSS中的background-position属性。（可选）<br />
 *   textSize {Number} 文字的大小。（可选，默认10）<br />
 *   textColor {String} 文字的颜色。（可选，默认black）<br />
 * */
function formatMarkerClusterer(map, markers, opts) {
    var newOpts = {};

    if (map._inner) {
        newOpts.map = map._inner;
    } else {
        newOpts.map = map;
    }

    newOpts.opts = formatMarkerClustererOpts(opts);

    console.log(newOpts.opts);

    newOpts.opts.markers = markers.map(function (item) {
        return item._inner;
    });

    return newOpts;
}

/**
 * @param {Object} opts
 * @diff : 百度 anchor 对应 imageOffset
 * */
function formatMarkerClustererOpts(opts) {
    if (opts.styles) {
        var styles = opts.styles;
        styles.forEach(function (item) {
            if (item.imageOffset) {
                item.anchor = item.imageOffset;
            }
            if (item.size) {
                item.size = item.size._inner;
            }
        })
    }
    return opts;
}

function canvertPath(path) {
    // TODO: 如何处理这个path还未定
    return path;
}


// var flightPlanCoordinates = [
//   {lat: 37.772, lng: -122.214},
//   {lat: 21.291, lng: -157.821},
//   {lat: -18.142, lng: 178.431},
//   {lat: -27.467, lng: 153.027}
// ];

// var lineArr = [
//   [116.368904, 39.913423],
//   [116.382122, 39.901176],
//   [116.387271, 39.912501],
//   [116.398258, 39.904600]
// ];
