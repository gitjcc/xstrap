/**
 * Created by fizz on 2017/2/13.
 */

/**
 * @constructor
 * @lng {Number} lng
 * @lat {Number} lat
 * */
function LngLat(lng, lat, inner) {
  if (lng.constructor = String) {
    lng = parseFloat(lng);
  }
  if (lat.constructor = String) {
    lat = parseFloat(lat);
  }
  if (inner) {
    this._inner = inner;
  } else {
    this._inner = new google.maps.LatLng({
      lat: lat,
      lng: lng
    });
  }
  this._type = 'LngLat';
  return this;
}

/**
 * @function offset
 * @param {Number} w
 * @param {Number} s
 * */
LngLat.prototype.offset = function (w, s) {
  //todo
};
LngLat.prototype.distance = function (lnglat) {
  //todo
};
LngLat.prototype.getLng = function () {
  return this._inner.lng();
};
LngLat.prototype.getLat = function () {
  return this._inner.lat();
};
LngLat.prototype.equals = function (lngLat) {
  if(!lngLat){
    return;
  }
  if (lngLat._inner) {
    return this._inner.equals(lngLat._inner);
  } else {
    return this._inner.equals(lngLat);
  }
};
LngLat.prototype.toString = function () {
  return this._inner.toString();
};
module.exports = LngLat;
