/**
 * Created by fizz on 2017/2/20.
 * @Class for BMap map event Object.
 * 包装百度事件对象
 */

var LngLat = require('./LngLat');
var Pixel = require('./Pixel');

/**
 * 包装Google的事件触发时的event对象
 *
 * @constructor
 * @param {Object} e event object
 * */
function SMapEvent(e) {

  this._inner = e;
  this._type = 'Event';
  this.target = e.target;

  if(e.pixel) {
    this.pixel = new Pixel(e.pixel.x, e.pixel.y);
  }
  if(e.point) {
    this.lnglat = new LngLat(e.point.lng, e.point.lat);
    this.lnglat.I = e.point.lng;
    this.lnglat.L = e.point.lat;
  }
  // TODO: 百度event对象的overlay怎么用
  if(e.overlay) {

  }
  // TODO: 百度event对象的zoom也没什么用吧
  if(e.zoom) {

  }
	// TODO: 百度event对象的spots也没什么用吧
  if(e.spots) {

  }
}

module.exports = SMapEvent;
