/**
 * Created by fizz on 2017/2/15.
 * @name Bounds 基础类
 * 在Google Map里面对应LatLngBounds Class
 * https://developers.google.com/maps/documentation/javascript/3.exp/reference#LatLngBounds
 */

var LngLat = require('./LngLat');
var util = require('../../../common/js/util');

/**
 * @constructor
 * @sw {LngLat} southWest 西南角坐标
 * @ne {LngLat} northEast 东北角坐标
 * */
function Bounds(sw, ne, inner) {

  if(util.isArray(sw)) {
    sw = new LngLat(sw);
    ne = new LngLat(ne);
  }

  if(inner) {
    this._inner = inner;
  } else {
    // 输入SMap.LngLat实例
    if(sw._type){
      this._inner = new BMap.Bounds(sw._inner, ne._inner);
    }
    // 输入{lng, lat}
    else {
      this._inner = new BMap.Bounds(sw, ne);
    }
  }

  this._type = 'Bounds';
}

Bounds.prototype = {
  /**
   * @public
   * @param {LngLat} point
   * */
  contains: function(point) {
    return this._inner.contains(point._inner);
  },

  getCenter: function() {
    return new LngLat('', '', this._inner.getCenter());
  },

  getSouthWest: function() {
    return new LngLat('', '', this._inner.getSouthWest());
  },
  getNorthEast: function() {
    return new LngLat('', '', this._inner.getNorthEast());
  },
  toString: function() {
    return this._inner.toString();
  }
};

module.exports = Bounds;
