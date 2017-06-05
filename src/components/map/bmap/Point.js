/**
 * Created by fizz on 2017/2/15.
 * @constructor Pixel
 * 在google map里面对应的是Point
 * https://developers.google.com/maps/documentation/javascript/reference#Point
 */


/**
 * @constructor
 * @param {Number} x
 * @param {Number} y
 * */
function Point(x, y, inner) {
  if(inner) {
    this._inner = inner;
  } else {
    this._inner = new google.maps.Point(x,y);
  }

  this._type = 'Pixel';

  return this;
}

Point.prototype = {
  getX: function() {
    return this._inner.x;
  },
  getY: function() {
    return this._inner.y;
  },

  /**
   * @param {Pixel} point
   * */
  equals: function(point) {
    return this._inner.equals(point);
  },

  toString: function() {
    return this._inner.toString();
  }
};

module.exports = Point;
