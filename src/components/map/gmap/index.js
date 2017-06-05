/**
 * Created by fizz on 2017/2/13.
 */

var LngLat = require('./LngLat');
var Bounds = require('./Bounds');
var Pixel = require('./Pixel');
var Size = require('./Size');
var Map = require('./Map');
var Marker = require('./Marker');
var CMarker = require('./CMarker');
var event = require('./Event');
var InfoWindow = require('./InfoWindow');
var Polyline = require('./Polyline');
var Polygon = require('./Polygon');
var Circle = require('./Circle');
var MarkerClusterer = require('./MarkerClusterer');
var Geocoder = require('./Geocoder');

var GMap = {};

GMap.event = event;

GMap.LngLat = LngLat;
GMap.Bounds = Bounds;
GMap.Pixel = Pixel;
GMap.Size = Size;

GMap.Map = Map;
GMap.Marker = Marker;
GMap.CMarker = CMarker;
GMap.InfoWindow = InfoWindow;
GMap.Polyline = Polyline;
GMap.Polygon = Polygon;
GMap.Circle = Circle;
GMap.MarkerClusterer = MarkerClusterer;
GMap.Geocoder = Geocoder;

GMap.service = function (pluginName, callback) {
    console.log('google.maps.service is not a function!');
}

module.exports = window.GMap = GMap;