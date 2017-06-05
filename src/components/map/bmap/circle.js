/**
 * Created by fizz on 2017/2/13.
 * @Class Circle
 */

// var event = require('./event');
var onOff = require('./onOff');
var formatOpts = require('./formatOpt');
var obc = require('./overlayBaseClass');
var LngLat = require('./LngLat');

/**
 * @constructor
 * @param {Object} opts
 * @return an object, inner is prime google map Circle instance.
 * */
function Circle(opts) {
  this._type = 'Circle';
  this._isInMapOverlay = false;
  obc.addOverlay(opts, this);

  var newOpts = formatOpts.circle(opts);
  this._inner = new BMap.Circle(newOpts.center, newOpts.radius, newOpts);
  this._opts = newOpts;
  this._init(newOpts);
}

Circle.prototype = {
  _init: obc._init,

  setMap: obc.setMap,

  setCenter: function(center) {
    this._inner.setCenter(center);
  },

  getCenter: function() {
    return new LngLat(' ',' ',this._inner.getCenter());
  },

  getBounds: function() {

  },

  /**
   * @function 设置圆半径
   * @param {Number} radius
   * */
  setRadius: function(radius) {
    this._inner.setRadius(radius);
  },

  getRadius: function() {
    return this._inner.getRadius();
  },

  /**
   * @attention 百度地图没有直接的setOptions，此处为模拟
   * @param {Object} opts
   * */
  setOptions: function(opts) {
    this._inner.setOptions( formatOpts.polygon(opts) );
  },

  getOptions: function() {

  },

  hide: obc.hide,

  show: obc.show,

  /**
   * @ext {any} extData
   * */
  setExtData: function(ext) {
    this._inner.extDate = ext;
  },

  getExtData: function() {
    return this._inner.extDate;
  },

  /**
   * @TODO:
   * @attention 百度没有这个API，可能需要自己模拟
   *
   * @function judge whether a point in the polygon inner
   * @point {LngLat}
   * @return {Boolean} true or false
   * */
  contains: function(point) {

  },

  on: onOff.on,
  off: onOff.off
};

module.exports = Circle;



