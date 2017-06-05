/**
 * Created by fizz on 2017/2/13.
 */

var LngLat = require('./LngLat');
var Bounds = require('./Bounds');
var Pixel = require('./Pixel');
var Size = require('./Size');
var Map = require('./Map');
var Marker = require('./Marker');
var Icon = require('./Icon');
var event = require('./event');
var InfoWindow = require('./InfoWindow');
var Polyline = require('./Polyline');
var Polygon = require('./Polygon');
var Circle = require('./Circle');
var MarkerClusterer = require('./MarkerClusterer');

var DMap = {};

DMap.event = event;

DMap.LngLat = LngLat;
DMap.Bounds = Bounds;
DMap.Pixel = Pixel;
DMap.Size = Size;

DMap.Map = Map;
DMap.Marker = Marker;
DMap.Icon = Icon;
DMap.InfoWindow = InfoWindow;
DMap.Polyline = Polyline;
DMap.Polygon = Polygon;
DMap.Circle = Circle;
DMap.MarkerClusterer = MarkerClusterer;

module.exports = window.DMap = DMap;
