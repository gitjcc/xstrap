/**
 * Created by fizz on 2017/2/13.
 * @constructor Polyline
 */

var obc = require('./util/overlayBaseClass');
var onOff = require('./util/onOff');
var formatOpts = require('./util/formatOpt');

/**
 * @constructor
 * @opts {Object} options
 * @return an object, inner is prime google map Polyline instance.
 * */
function Polyline(opts) {
  this._type = 'Polyline';
  this.options = opts

  obc.addOverlay(opts, this);

  var newOpts = formatOpts.polyline(opts);
  this._inner = new google.maps.Polyline(newOpts);
}

Polyline.prototype.setPath = function () {};
Polyline.prototype.getPath = function () {
  return this._inner.getPath().getArray();
};
Polyline.prototype.setOptions = function () {};
Polyline.prototype.getOptions = function () {};
Polyline.prototype.getLength = function () {};

Polyline.prototype.getBounds = function () {};

Polyline.prototype.hide = obc.hide;
Polyline.prototype.show = obc.show;
Polyline.prototype.setMap = obc.setMap;

/**
 * @ext {any} extData
 * */
Polyline.prototype.setExtData = function (ext) {
  if (!ext) {
    console.warn('Polyline.setExtData() : !ext')
    return;
  }
  this.options.extData = ext;
};

Polyline.prototype.getExtData = function () {
  return this.options.extData;
};

Polyline.prototype.on = onOff.on;
Polyline.prototype.off = onOff.off;

var PolylineEventMap = {

};

module.exports = Polyline;
