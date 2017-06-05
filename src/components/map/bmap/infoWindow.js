/**
 * Created by fizz on 2017/2/14.
 * @constructor InfoWindow
 *
 * 高德有 change 事件，百度没有
 */
var onOff = require('./onOff');
var formatOpts = require('./formatOpt');
var obc = require('./overlayBaseClass');
var LngLat = require('./LngLat');

/**
 * @constructor
 * @param {Object} opts
 * */
function InfoWindow(opts) {
  this._type = 'InfoWindow';
  // 当实例被添加到Map对象的时候，会被设为true
  this._isInMapOverlay = false;

  obc.addOverlay(opts, this);

  var newOpts = formatOpts.infoWindow(opts);
  this._inner = new BMap.InfoWindow(newOpts.content, newOpts);

  // 保存一下opts，百度地图中InfoWindow没有getOpts这个函数，此处为自己模拟
  this._opts = newOpts;
}

InfoWindow.prototype = {
  /**
   * @function open a infoWindow in the position
   * @param {Map} map required
   * @param {LngLat} pos lngLat
   * */
  open: function(map, pos) {
    if(pos) {
      map._inner.openInfoWindow(this._inner, pos._inner);
    } else {
      map._inner.openInfoWindow(this._inner, new LngLat(this._opts.position)._inner);
    }

    this._inner._smap = map;
    this._isOpen = true;

    if(!this._isInMapOverlay) {
      map._overLayers.InfoWindow.push(this);
    }
  },

  close: function() {
    this._inner.hide();
    this._isOpen = false;
  },

  getIsOpen: function() {
    return this._inner.isOpen();
  },

  /**
   * @function setContent
   * @content {String|htmlDOM} content
   * */
  setContent: function(content) {
    this._inner.setContent(content);
  },

  getContent: function() {
    return this._inner.getContent();
  },

  setPosition: function(lngLat) {
    console.warn('啊哦，百度暂不支持这个API哦，详情请查看这里:' +
      'http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_' +
      'reference.html#a3b7');
  },

  getPosition: function() {
    return new LngLat('', '', this._inner.getPosition());
  },

  // todo: 百度能支持setWidth 和 setHeight
  setSize: function(size) {
    console.warn('啊哦，百度暂不支持这个API哦，详情请查看这里:' +
      'http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_' +
      'reference.html#a3b7');
  },

  // todo: 百度 不支持
  getSize: function() {
    console.warn('啊哦，百度暂不支持这个API哦，详情请查看这里:' +
      'http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_' +
      'reference.html#a3b7');
  },

  on: onOff.on,
  off: onOff.off
};



module.exports = InfoWindow;



