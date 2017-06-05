/**
 * gmap util  converter
 * 
 */

var utils = require('./util.js');

const converter = {};

converter.s2g = function(s) {
  var g = util.extend({}, s);
  if (s.Pixel) {
    g.Pixel = s2g.pixel(s.Pixel);
  }
  if (s.Size) {
    g.Size = s2g.size(s.Size);
  }
  if (s.LngLat) {
    g.LngLat = s.LngLat._inner;
  }
  if (s.Bounds) {
    g.Bounds = s.Bounds._inner;
  }
  if (s.map) {
    g.map = s.map._inner;
  }
  if (s.position) {
    g.position = s.position._inner;
  }
  return s;
}
const s2g = {};
s2g.converter = function(item) {
  if (!item) {
    return;
  } else if (item._inner) {
    return item._inner;
  } else {
    return item._inner;    
  }
}
s2g.pixel = function(Pixel) {
  return Pixel._inner;
}
s2g.size = function(Size) {
  return Size._inner;
}
s2g.lnglat = function(LngLat) {
  return LngLat._inner;
}
s2g.bounds = function(Bounds) {
  return Bounds._inner;
}
s2g.position = function(position) {
  return Map._inner;
}
s2g.map = function(Map) {
  return Map._inner;
}


converter.g2s = function(g) {
  var s = util.extend({}, g);
  if (g.Pixel) {
    s.Pixel = format.pixel(g.Pixel);
  }
  if (g.Size) {
    s.Size = format.size(g.Size);
  }
  if (g.LngLat) {
    s.LngLat = g.LngLat._inner;
  }
  if (g.Bounds) {
    s.Bounds = g.Bounds._inner;
  }
  if (g.map) {
    s.map = g.map._inner;
  }
  if (g.position) {
    s.position = g.position._inner;
  }
  return s;
}
const g2s = {};
g2s.converter = function(item) {
  if (!item) {
    return;
  } else if (item._inner) {
    return item._inner;
  } else {
    return item._inner;    
  }
}
g2s.pixel = function(Pixel) {
  return Pixel._inner;
}
g2s.size = function(Size) {
  return Size._inner;
}
g2s.lnglat = function(LngLat) {
  return LngLat._inner;
}
g2s.bounds = function(Bounds) {
  return Bounds._inner;
}
g2s.position = function(position) {
  return Map._inner;
}
g2s.map = function(Map) {
  return Map._inner;
}


module.exports = converter;