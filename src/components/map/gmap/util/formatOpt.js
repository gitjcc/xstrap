/**
 * Created by fizz on 2017/2/14.
 */

var LngLat = require('../LngLat');
var util = require('./util.js');

function formatOptsUni(opts) {
  var formatOpts = util.extend({},opts);
  if (opts.position && opts.position._inner) {
    formatOpts.position = new google.maps.LatLng({
      lat: opts.position.getLat(),
      lng: opts.position.getLng()
    });
  }
  if (opts.path) {
    formatOpts.path = transfromPathToPaths(opts.path);
  }
  if (opts.center && opts.center._type === 'LngLat') {
    formatOpts.center = new google.maps.LatLng({
      lat: opts.center.getLat(),
      lng: opts.center.getLng()
    });
  }
  if(opts.offset){
    formatOpts.offset = opts.offset._inner;
  }
  if (opts.map) {
    formatOpts.map = opts.map._inner;
  }
  return formatOpts;
}

function transfromPathToPaths(path) {
  var paths = [];
  path.forEach(function(item, index) {
    if (item._type === 'LngLat') {
      paths.push(item._inner);
    } else {
      paths.push(arrCreateLngLat(item));
    }
  });
  return paths;
}

function arrCreateLngLat(arr) {
  return new google.maps.LatLng({
    lng: arr[0],
    lat: arr[1]
  });
}
/**************************************************
 * markerClusterer
 * ***********************************************/
function formatMarkerClusterer(map, markers, opts) {
  var formatOpts = {};
  if (map._inner) {
    formatOpts.map = map._inner;
  } else {
    formatOpts.map = map;
  }
  formatOpts.markers = markers.map(function(item) {
    return item._inner;
  });
  formatOpts.opts = formatMarkerClustererOpts(opts);
  return formatOpts;
}
/**
 * @param {Object} opts
 * @diff : minClusterSize : minimumClusterSize
 * */
function formatMarkerClustererOpts(opts) {
  if (opts.minClusterSize) {
    opts.minimumClusterSize = opts.minClusterSize;
  }

  if (opts.styles) {
    for (var index = 0; index < opts.styles.length; index++) {
      if (opts.styles[index].size) {
        opts.styles[index].width = opts.styles[index].size.getWidth();
        opts.styles[index].height = opts.styles[index].size.getHeight();
      }
    }
  }
  return opts;
}

module.exports = {
  map: formatOptsUni,

  infoWindow: formatOptsUni,

  marker: formatOptsUni,

  polyline: formatOptsUni,

  polygon: formatOptsUni,

  circle: formatOptsUni,

  markerClusterer: formatMarkerClusterer
};