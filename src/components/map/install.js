/**
 * Created by fizz on 2017/2/13.
 * @Function
 * @主要功能：
 * @first  将SMap注册到页面中去
 * @second 自动引入对应地图的API
 * @third  自动引入对应地图的插件
 */
var _ = require('lodash');

var util = require('../../common/js/util.js');
var GMap = require('./gmap/index.js');
var DMap = require('./bmap/index.js');
var loader = require('./loader');
var config = require('./config');

window.GMap = GMap;
window.DMap = DMap;

var SMap = {};

window.mapCreate = mapCreate;

/**
 * 默认设置地图类型为高德地图
 * */
// if(typeof AMap === 'undefined') {
//   SMap = mapCreate('g');
// }
// else {
//   SMap = mapCreate('a');
// }

/**
 * @function 返回一个地图顶级命名空间变量，适用于单页面多地图
 * 在页面中声明类似SMap这个变量来接收一个顶级命名空间
 * @param {String} type
 * **地图类型**
 * * 'a' 代表高德地图
 * * 'g' 代表谷歌地图
 * * 'b' 代表百度地图
 * */
function mapCreate(type) {
    if (type == 'a') {
        initMap('AMap', 'AMap');
        return window.AMap;
    } else if (type == 'g') {
        initMap('GMap', 'GMap');
        return window.GMap;
    } else if (type == 'b') {
        initMap('DMap', 'DMap');
        return window.DMap;
    }
}

/**
 * @function 设置地图类型
 * @param {String} type
 * **地图类型**
 * * 'a' 代表高德地图
 * * 'g' 代表谷歌地图
 * * 'b' 代表百度地图
 * */
mapCreate.setType = function (type) {
    var mapType = '';
    if (type == 'a') {
        window.SMap = AMap;
        mapType = 'AMap';
    } else if (type == 'g') {
        window.SMap = window.GMap;
        mapType = 'GMap';
    } else if (type == 'b') {
        console.log(type);
        window.SMap = window.DMap;
        mapType = 'DMap';
    }
    initMap(mapType, 'SMap');
};

/**
 * @function 初始化地图
 * @param {String} mapType
 *   ** 有三种取值：
 *     ** 'AMap'
 *     ** 'GMap'
 *     ** 'DMap'
 * @param {String} Map
 * */
function initMap(mapType, Map) {
    // 设置各地图的文件插件名字
    // 这里主要为了兼容AMap只能使用它自己内置的字符串。
    // 栗子：'AMap.MarkerClusterer',高德只认得AMap开头的。
    window[Map].sPlugin = {
        MouseTool: mapType + '.MouseTool',
        CircleEditor: mapType + '.CircleEditor',
        PolyEditor: mapType + '.PolyEditor',
        Hotspot: mapType + '.Hotspot',
        MarkerClusterer: mapType + '.MarkerClusterer',
        RangingTool: mapType + '.RangingTool',
        PlaceSearch: mapType + '.PlaceSearch'
    };
}


/**
 * @entry 接收页面设置的地图属性
 * */
if (typeof window.SMapConfig !== 'undefined') {
    installMap(window.SMapConfig);
} else {
    installMap({});
    console.warn("[你收到一条来自SMap的警告]：请在使用地图之前声明 SMap_target_type 这个变量！");
}

function installMap(SMapConfig) {
    var type, mapType, url, key;

    // 未设置则此处自动设置为高德地图
    if (!SMapConfig.SMap_target_type) {
        SMapConfig.SMap_target_type = 'a';
    }

    type = SMapConfig.SMap_target_type;

    if (type === 'a') {
        mapType = 'AMap';
    }
    else if (type === 'g') {
        mapType = 'GMap';
    }
    else if (type === 'b') {
        mapType = 'DMap';
    }

    key = SMapConfig[mapType + '_key'] || config[mapType + '_key'];
    url = SMapConfig[mapType + '_url'] || config[mapType + '_url'];

    // document.write('<script src="' + url + key + '"><\/script>');
    window.SMap = window.mapCreate(type);
    // getPluginScript(type);
}

/**
 * @function 加载百度地图和谷歌的插件
 *
 * @param {String} type
 *   ** 取值： 'a', 'g', 'b'
 *
 * 因为高德地图是直接将地图插件和主API JS文件在一起的
 * 因此百度地图和谷歌地图也需要用插件的话，需要加载它们
 * 所以这个函数将引入我们config中的插件
 * */
function getPluginScript(type) {
    if (type === 'a') {
    }
    else if (type === 'b') {
        document.write('<script src="' + config.DMap_MarkerClusterer + '"><\/script>');
        document.write('<script src="' + config.DMap_TextIconOverlay + '"><\/script>');
        document.write('<script src="' + config.DMap_AreaRestriction + '"><\/script>');
    }
    else if (type === 'g') {
        document.write('<script src="' + config.GMap_MarkerClusterer + '"><\/script>');
    }
}

module.exports = window.SMap;
