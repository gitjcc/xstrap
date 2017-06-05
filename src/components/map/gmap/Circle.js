/**
 * Created by fizz on 2017/2/13.
 * @constructor Circle
 */

// var event = require('./event');
var onOff = require('./util/onOff');
var formatOpts = require('./util/formatOpt');
var obc = require('./util/overlayBaseClass');
var LngLat = require('./LngLat');


/**
 * @constructor
 * @opts {Object} opts
 * @return an object, inner is prime google map Circle instance.
 * */
function Circle(opts) {
  this._type = 'Circle';
  obc.addOverlay(opts, this);

  var newOpts = formatOpts.circle(opts);
  this.opts = newOpts;
  this._inner = new google.maps.Circle(newOpts);
  this.extData = newOpts.extData;
}


Circle.prototype.setMap = obc.setMap;

Circle.prototype.setCenter = function (center) {
  if(!center){
    return;
  }
  this._inner.setCenter(center);
};

Circle.prototype.getCenter = function () {
  return new LngLat(0, 0, this._inner.getCenter());
};

Circle.prototype.getBounds = function () {
  return this._inner.getBounds();
};

/**
 * @param {Number} radius
 * */
Circle.prototype.setRadius = function (radius) {
  if(!radius){
    return;
  }
  this._inner.setRadius(radius);
};

Circle.prototype.getRadius = function () {
  return this._inner.getRadius();
};

Circle.prototype.setOptions = function (opts) {
  if(!opts){
    return;
  }
  this.opts = formatOpts.polygon(opts)
  this._inner.setOptions(this.opts);
};

Circle.prototype.getOptions = function () {};

Circle.prototype.getArea = function () {};

Circle.prototype.hide = obc.hide;

Circle.prototype.show = obc.show;

/**
 * @ext {any} extData
 * */
Circle.prototype.setExtData = function (ext) {
  if(!ext){
    return;
  }
  this.extData = ext;
};

Circle.prototype.getExtData = function () {
  return this.extData;
};

/**
 * @function judge whether a point in the polygon inner
 * @point {LngLat}
 * @return {Boolean} true or false
 * */
Circle.prototype.contains = function (point) {
  if(!point){
    return;
  }
  return this._inner.getBounds().contains(point._inner);
};

Circle.prototype.on = onOff.on;
Circle.prototype.off = onOff.off;

var CircleEventMap = {

};

module.exports = Circle;
