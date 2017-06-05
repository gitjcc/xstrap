/**
 * Created by fizz on 2017/2/15.
 */

var formatOpts = require('./util/formatOpt');
var obc = require('./util/overlayBaseClass');
var onOff = require('./util/onOff.js');
var MarkerClusterer = require('./markerclustererg.js');

/**
 * @constructor
 * @map {Map.Object}
 * @marker {Marker}
 * @opts {MarkerClustererOptions}
 * */
function Clusterer(map, markers, opts) {
  if (markers.length < 1) {
    console.warn('MarkerCluster: markers.length < 1');
  };

  this._type = 'MarkerClusterer';
  obc.addOverlay({
    map: map
  }, this);

  var newOpts = formatOpts.markerClusterer(map, markers, opts);
  this._inner = new MarkerClusterer(newOpts.map, newOpts.markers, newOpts.opts);
  this._inner._smap = map;
}

Clusterer.prototype.getSize = function() {};

Clusterer.prototype.setMap = obc.setMap;

Clusterer.prototype.getMap = function() {
  if (this._inner) {
    return this._inner.getMap();
  }
};

Clusterer.prototype.addMarker = function() {};
Clusterer.prototype.removeMarker = function() {};

Clusterer.prototype.clearMarkers = function() {
  if (this._inner) {
    this._inner.clearMarkers();
  }
};


/**
 * @param {Array} styles
 * */
Clusterer.prototype.setStyles = function(styles) {

};
Clusterer.prototype.on = function(eventName, handler, context) {
  if (eventName == 'click') {
    eventName = 'clusterclick';
  }
  onOff.on.call(this, eventName, handler, context);
};
Clusterer.prototype.off = onOff.off;

module.exports = Clusterer;