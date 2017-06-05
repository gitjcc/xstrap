/**
 * Created by fizz on 2017/2/13.
 * @constructor Polygon
 */

// var event = require('./event');
var onOff = require('./util/onOff');
var formatOpts = require('./util/formatOpt');
var obc = require('./util/overlayBaseClass');

/**
 * @constructor
 * @param {Object} opts
 * @return an object, inner is prime google map Polygon instance.
 * */
function Polygon(opts) {
  this._type = 'Polygon';
  obc.addOverlay(opts, this);

  var newOpts = formatOpts.polygon(opts);
  this._inner = new google.maps.Polygon(newOpts);

}

Polygon.prototype.setMap = obc.setMap;

/**
 * @param {path:Array LngLat | Array lngLat} path
 * */
Polygon.prototype.setPath = function(path) {
  if (!path) {
    console.warn('Polygon.setPath() : !path')
    return;
  }
  var p = []
  for (var index = 0; index < path.length; index++) {
    if (path[index]._inner) {
      p.push(path[index]._inner);
    } else {
      p.push(path[index]);
    }
  }
  this._inner.setPath(p);
};
Polygon.prototype.getPath = function() {
  return this._inner.getPath();
};

Polygon.prototype.setOptions = function(opts) {
  if (!opts) {
    console.warn('Polygon.setOptions() : !opts')
    return;
  }
  this._inner.setOptions(formatOpts.polygon(opts));
};

Polygon.prototype.setEditable = function(editable) {
  if (!editable) {
    console.warn('Polygon.setEditable() : !editable')
    return;
  }
  this._inner.setEditable(editable);
};

Polygon.prototype.getOptions = function() {};

Polygon.prototype.getBounds = function() {};

Polygon.prototype.getArea = function() {};

Polygon.prototype.hide = obc.hide;

Polygon.prototype.show = obc.show;



/**
 * @param {any} ext extData
 * */
Polygon.prototype.setExtData = function(ext) {
  if (!ext) {
    console.warn('Polygon.setExtData() : !ext')
    return;
  }
  this._inner.extData = ext;
};

Polygon.prototype.getExtData = function() {
  return this._inner.extData;
};

/**
 * @function judge whether a point in the polygon inner
 * @param {LngLat} point
 * */
Polygon.prototype.contains = function(point) {
  var latlng;
  if (point._inner) {
    latlng = point._inner;
  } else {
    latlng = point;
  }
  return google.maps.geometry.poly.containsLocation(latlng, this._inner);
};

Polygon.prototype.on = onOff.on;
Polygon.prototype.off = onOff.off;

module.exports = Polygon;