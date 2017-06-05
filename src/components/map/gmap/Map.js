/**
 * Created by fizz on 2017/2/13.
 * @constructor of Map
 * @return our map object
 */

var config = require('../config');
var Bounds = require('./Bounds');
var onOff = require('./util/onOff');
var formatOpts = require('./util/formatOpt');

/**
 * @constructor
 * @elem {Object}
 * @opts {Object}
 * */
function Map(id, opts) {
  var elem, newOpts;
  this._type = 'Map';
  elem = document.getElementById(id);
  newOpts = formatOpts.map(opts);

  this._inner = new google.maps.Map(elem, newOpts);
  this._inner._smap = this;
  this._overLayers = {
    MarkerClusterer: [],
    Marker: [],
    InfoWindow: [],
    Polygon: [],
    Polyline: [],
    Circle: []
  };
}

Map.prototype.plugin = function (plugins, fn) {
  if (!plugins || plugins.length < 1) {
    return;
  }
  plugins.forEach(function (plugin) {
    console.log(plugin);
    if (plugin === 'SMap.MarkerClusterer') {
      $.getScript(config.GMap_MarkerClusterer, function () {
        fn();
      });
    }

  })
};

Map.prototype.setStatus = function () {
  return
};
Map.prototype.clearMap = function () {
  var overLayers = this._overLayers;
  for (var type in overLayers) {
    switch (type) {
      case 'MarkerClusterer':
        if (overLayers.MarkerClusterer.length > 0) {
          overLayers.MarkerClusterer.forEach(function (item) {
            item._inner.clearMarkers();
          });
          overLayers.MarkerClusterer.length = 0;
        }
        break;
      case 'Marker':
      case 'Circle':
      case 'Polygon':
      case 'Polyline':
      case 'InfoWindow':
      default:
        if (overLayers[type].length > 0) {
          overLayers[type].forEach(function (item) {
            item._inner.setMap(null);
          });
          overLayers.length = 0;
        }
        break;
    }

  }
};
Map.prototype.clearInfoWindow = function () {
  var iws = this._overLayers.InfoWindow;
  iws.forEach(function (item) {
    item.close();
  })
};

// TODO: setFitView
Map.prototype.setFitView = function (overLays) {
  var bounds;
  if (overLays && overLays.length > 0) {
    bounds = this.getOverLayBounds(overLays);
  } else {
    bounds = this.getAllOverLayBounds();
  }
  this._inner.fitBounds(bounds);
};

Map.prototype.getOverLayBounds = function (overLays) {
  var lngMax = overLays[0].position.lng();
  var lngMin = overLays[0].position.lng();
  var latMax = overLays[0].position.lat();
  var latMin = overLays[0].position.lat();
  var temp;

  for (var i = 1; i < overLays.length; i++) {
    temp = overLays[i].position;
    if (lngMax < temp.lng()) {
      lngMax = temp.lng();
    }
    if (lngMin > temp.lng()) {
      lngMin = temp.lng();
    }
    if (latMax < temp.lat()) {
      lngMax = temp.lat();
    }
    if (latMin > temp.lat()) {
      latMin = temp.lat();
    }
  }
  var sw = new google.maps.LatLng({
    lat: latMin,
    lng: lngMin
  });
  var ne = new google.maps.LatLng({
    lat: latMax,
    lng: lngMax
  });
  return new google.maps.LatLngBounds(sw, ne);
};

Map.prototype.getAllOverLayBounds = function () {
  if (!this._overLayers) {
    return;
  }
  var bounds = new google.maps.LatLngBounds()
  //markers && polygon
  if (this._overLayers.Marker || this._overLayers.Polygon) {
    var arrayLatLng = [];
    if (this._overLayers.Marker.length > 0) {
      this._overLayers.Marker.forEach(function (element) {
        arrayLatLng.push(element.position)
      }, this);
    }
    if (this._overLayers.Polygon.length > 0) {
      this._overLayers.Polygon.forEach(function (element) {
        arrayLatLng = arrayLatLng.concat(element.getPath().b);
      }, this);
    }
    if (arrayLatLng.length > 0) {
      var lngMax = arrayLatLng[0].lng();
      var lngMin = arrayLatLng[0].lng();
      var latMax = arrayLatLng[0].lat();
      var latMin = arrayLatLng[0].lat();
      arrayLatLng.forEach(function (element) {
        if (lngMax < element.lng()) {
          lngMax = element.lng();
        }
        if (lngMin > element.lng()) {
          lngMin = element.lng();
        }
        if (latMax < element.lat()) {
          lngMax = element.lat();
        }
        if (latMin > element.lat()) {
          latMin = element.lat();
        }
      }, this);
      var sw = new google.maps.LatLng({
        lat: latMin,
        lng: lngMin
      });
      var ne = new google.maps.LatLng({
        lat: latMax,
        lng: lngMax
      });
      var latLngBounds = new google.maps.LatLngBounds(sw, ne);
      bounds.union(latLngBounds);
    }
  }

  //circle
  if (this._overLayers.Circle) {
    var circles = this._overLayers.Circle;
    circles.forEach(function (element) {
      bounds.union(element.getBounds());
    }, this);
  }
  return bounds;
};

/**
 * @param {LngLat} position
 * */
Map.prototype.panTo = function (position) {
  if (!position) {
    return;
  }
  if (position._inner) {
    this._inner.panTo(position._inner);
  }
};

Map.prototype.destroy = function () {

};

/**
 * @param {Number} zoom
 * */
Map.prototype.setZoom = function (zoom) {
  if (!zoom) {
    return;
  }
  this._inner.setZoom(zoom);
};
Map.prototype.getCenter = function () {
  return this._inner.getCenter();
};
Map.prototype.setCenter = function (center) {
  if (!center) {
    return;
  }
  if (center._inner) {
    this._inner.setCenter(center._inner);
  } else {
    this._inner.setCenter(center);
  }
};

Map.prototype.setZoomAndCenter = function (zoom, center) {
  if (!zoom || !center) {
    return;
  }
  this._inner.setZoom(zoom);
  if (center._inner) {
    this._inner.setCenter(center._inner);
  } else {
    this._inner.setCenter(center);
  }
};

Map.prototype.getBounds = function () {
  return new Bounds('', '', this._inner.getBounds());
};
Map.prototype.setBounds = function (bounds) {
  if (!bounds) {
    return;
  }
  if (bounds._inner) {
    this._inner.fitBounds(bounds._inner);
  } else {
    this._inner.fitBounds(bounds);
  }
};
Map.prototype.on = onOff.on;
Map.prototype.off = onOff.off

module.exports = Map;
