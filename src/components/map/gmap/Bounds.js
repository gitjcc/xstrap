/**
 * Created by fizz on 2017/2/15.
 * @name Bounds 基础类
 * 在Google Map里面对应LatLngBounds Class
 * https://developers.google.com/maps/documentation/javascript/3.exp/reference#LatLngBounds
 */

var LngLat = require('./LngLat');
/**
 * @constructor
 * @sw {LngLat} southWest
 * @ne {LngLat} northEast
 * */
function Bounds(sw, ne, inner) {
    if (inner) {
        this._inner = inner;
    } else {
        this._inner = new google.maps.LatLngBounds(sw, ne);
    }
    this._type = 'Bounds';
    return this;
}
/**
 * @param {LngLat} point
 * */
Bounds.prototype.contains = function(point) {
    if(!point){
    return;
  }
    return this._inner.contains(point._inner);
};
Bounds.prototype.getCenter = function() {
    return new LngLat(0, 0, this._inner.getCenter());
};
Bounds.prototype.getSouthWest = function() {
    return new LngLat(0, 0, this._inner.getSouthWest());
};
Bounds.prototype.getNorthEast = function() {
    return new LngLat(0, 0, this._inner.getNorthEast());
};
Bounds.prototype.toString = function() {
    return this._inner.toString();
};
module.exports = Bounds;