/**
 * Created by fizz on 2017/2/15.
 * @Class MarkerClusterer
 */

var formatOpts = require('./formatOpt');
var obc = require('./overlayBaseClass');

/**
 * @constructor
 * @map {Map.Object}
 * @marker {Marker}
 * @opts {MarkerClustererOptions}
 *
 * @MarkerClustererOptions
 * */
function Clusterer(map, markers, opts) {
  console.log(map, markers, opts);

  this._isInMapOverlay = false;
  this._type = 'MarkerClusterer';
  obc.addOverlay({map: map}, this);

  if(markers.length < 1) return;
  var newOpts = formatOpts.markerClusterer(map, markers, opts);
  this._inner = new BMapLib.MarkerClusterer(newOpts.map, newOpts.opts);
  this._inner._smap = map;
}

Clusterer.prototype = {
  getSize: function() {},

  setMap: obc.setMap,

  getMap: function() {
    return this._inner.getMap();
  },

  addMarker: function() {},

  removeMarker: function(test) {},

  clearMarkers: function() {
    this._inner.clearMarkers();
  },

  /**
   * @param {Array} styles
   * */
  setStyles: function(styles) {

  }
};

module.exports = Clusterer;
