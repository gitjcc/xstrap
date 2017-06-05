/**
 * Created by fizz on 2017/2/13.
 * @Class Marker
 */
var obc = require('./util/overlayBaseClass');
var onOff = require('./util/onOff');
var format = require('./util/formatOpt.js');
var CMarker = require('./CMarker');
var LngLat = require('./LngLat.js');

/**
 * Represents a Marker
 * @constructor
 * @param {Object} opts
 * @param {Object} inner
 * @return an object, inner is prime google map Marker instance.
 * */
function Marker(opts, inner) {
  if (inner) {
    this._inner = inner;
  } else {
    // 如果opts.map存在，则把自己增加到map对应的overlay中。
    this._type = 'Marker';
    obc.addOverlay(opts, this);

    this.options = opts;
    var newOpts = format.marker(opts);
    if (opts.content) {
      // opts.icon = 'http://c163img.nos-eastchina1.126.net/blank_36x36.png';
      // opts.label = opts.content;
      this._inner = new CMarker(opts);
    } else {
      this._inner = new google.maps.Marker(newOpts);
    }
    this._inner._smap = newOpts.map;
    this.position = newOpts.position;
  }
  return this;
}

// Marker.prototype = new google.maps.Marker();

Marker.prototype.setMap = function(map) {
  if (map !== null) {
    this._smap = map;
    this._inner._smap = map;
    map._overLayers[this._type].push(this);
    this._inner.setMap(map._inner);
    var that = this;
    setTimeout(function() {
        if (that._inner.content && that._inner.__gm.Eb.map) {
          that._inner.__gm.Eb.map.b.O.style.opacity = 1;
          that._inner.__gm.Eb.map.b.O.innerHTML = that._inner.content;
        }
      },
      1000);
  } else {
    if (this._smap && this._smap._overLayers) {
      var markers = this._smap._overLayers.Marker;
      var that = this;
      markers.filter(function(item, index) {
        if (item == that) {
          markers.splice(index, 1);
        }
      });
    }
    this._inner.setMap(null);
  }
};
Marker.prototype.getMap = obc.getMap;

Marker.prototype.getPosition = function() {
  return new LngLat(0, 0, this._inner.getPosition());
};

Marker.prototype.setPosition = function(LngLat) {
  if (!LngLat) {
    console.warn('Marker.setPosition() : !LngLat')
    return;
  }
  if (LngLat._inner) {
    this._inner.setPosition(LngLat._inner);
  } else {
    this._inner.setPosition(LngLat);
  }
};

Marker.prototype.setIcon = function(icon) {
  if (!icon) {
    console.warn('Marker.setIcon() : !icon')
    return;
  }
  this._inner.setIcon(icon);
};

Marker.prototype.setzIndex = function(ZIndex) {
  if (!ZIndex) {
    console.warn('Marker.setzIndex() : !ZIndex')
    return;
  }
  this._inner.setZIndex(ZIndex);
};

Marker.prototype.getExtData = function() {
  return this.options.extData;
};

Marker.prototype.hide = function() {
  this._inner.setVisible(false);
};
Marker.prototype.show = function() {
  this._inner.setVisible(true);
};
Marker.prototype.on = onOff.on;
Marker.prototype.off = onOff.off;

module.exports = Marker;