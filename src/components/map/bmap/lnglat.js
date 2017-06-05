/**
 * Created by fizz on 2017/2/13.
 * @constructor LngLat
 * @attention 百度地图没有LngLat这个基础类，而是叫Point类。
 */

var util = require('../../../common/js/util');

/**
 * @constructor
 * @lng {Number} lng
 * @lat {Number} lat
 * */
function LngLat(lng, lat, inner) {

  // 包装现有实例模式。BMap的LngLat结构，这个传进来的inner是百度地图的Point实例。
  if(inner) {
    this._inner = inner;
  }

  // 构造函数模式
  else {
    if(arguments.length < 2) {

      // 数组形式，前者为lng，后者为lat [116.397428, 39.90923] -- position
      if(util.isArray(lng)){
        // 数组里面的元素为String
        if( typeof lng[0] === 'string' || typeof lng[1] === 'string' ) {
          this.lng = parseFloat(lng[0]);
          this.lat = parseFloat(lng[1]);
        }

        // 数组里面的元素为Number
        else {
          this.lng = lng[0];
          this.lat = lng[1];
        }
      }

      // 对象形式，lng对应lng，lat对应lat (lng: 116.397428, lat: 39.90923)
      else {
        this.lng = lng.lng;
        this.lat = lng.lat;
      }
    }

    // 对象字面量
    else {

      // ("116.403322", "39.920255") string
      if(util.isString(lng) || util.isString(lat)) {
        this.lng = parseFloat(lng);
        this.lat = parseFloat(lat);
      }

      // (116.403322, 39.920255) Number
      else {
        this.lng = lng;
        this.lat = lat;
      }
    }

    this._inner = new BMap.Point(this.lng, this.lat);
  }

  this._type = 'LngLat';
}

LngLat.prototype = {
  /**
   * @todo 百度地图模拟lnglat的offset
   * @function offset
   * @param {Number} w
   * @param {Number} s
   * */
  offset: function(w, s) {

  },

  // TODO:百度地图没有这个功能
  distance: function() {

  },

  getLng: function() { return this._inner.lng; },
  getLat: function() { return this._inner.lat; },
  getlng: function() { return this._inner.lng; },
  getlat: function() { return this._inner.lat; },

  /**
   * @function 判断两个点是否相等
   * @param {LngLat} point
   * @return Boolean
   * */
  equals: function(point) {
    return this._inner.equals(point._inner);
  },

  toString: function() {
    return this._inner.toString();
  }
};

module.exports = LngLat;



