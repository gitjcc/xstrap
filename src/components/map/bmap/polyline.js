/**
 * Created by fizz on 2017/2/13.
 * @constructor Polyline
 *
 * @diff:
 * @zIndex 百度Polyline 没有zIndex这个属性，高德有
 */

var obc = require('./overlayBaseClass');
var onOff = require('./onOff');
var formatOpts = require('./formatOpt');
var Bounds = require('./Bounds');

/**
 * @constructor
 * @opts {Object} options
 * @return an object, inner is prime google map Polyline instance.
 * */
function Polyline(opts) {
  this._type = 'Polyline';
  this._isInMapOverlay = false;
  obc.addOverlay(opts, this);

  var newOpts = formatOpts.polyline(opts);
  this._inner = new BMap.Polyline(newOpts.path, newOpts);
  this._init(newOpts);
}

Polyline.prototype = {
  _init: obc._init,

  /**
   * @param {Array} path
   * */
  setPath: function(path) {
    this._inner.setPath(formatOpts.path(path));
  },

  getPath: function() {
    return this._inner.getPath();
  },

  // TODO： 百度没有setOptions
  setOptions: function() {},
  getOptions: function() {},

  getLength: function() {},

  getBounds: function() {
    return new Bounds('', '', this._inner.getBounds());
  },

  hide: obc.hide,
  show: obc.show,
  setMap: obc.setMap,

  /**
   * @ext {any} extData
   * */
  setExtData: function(ext) {
    this._inner.extDate = ext;
  },

  getExtData: function() {
    return this._inner.extDate;
  },

  on: onOff.on,
  off: onOff.off
};

var PolylineEventMap = {

};

module.exports = Polyline;



