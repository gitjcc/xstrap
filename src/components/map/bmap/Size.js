/**
 * Created by fizz on 2017/2/15.
 */

/**
 * @constructor
 * @param {Number} width
 * @param {Number} height
 * */
function Size(width, height, inner) {
  if(inner) {
    this._inner = inner;
  } else {
    // 百度的Size 没有getWidth和getHeight两个方法
    // 这里自己加上
    this._width = width;
    this._height = height;

    this._inner = new BMap.Size(width, height);
  }

  this._type = 'Size';
  return this;
}

Size.prototype = {
  getWidth: function() {
    return this._width;
  },
  getHeight: function() {
    return this._height;
  },
  // TODO 百度没有这个toString
  toString: function() {
    return this._inner.toString();
  }
};

module.exports = Size;
