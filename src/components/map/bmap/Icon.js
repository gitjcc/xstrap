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

var formatOpts = require('./formatOpt');
var obc = require('./overlayBaseClass');

function Icon(opts, inner) {
    if(inner) {
        this._inner = inner;
    } else {
        this.image = opts;
        this.size = new BMap.Size(36,36);

        this._inner = new BMap.Icon(this.image, this.size);
    }
    this._type = 'Icon';
    return this;
}

Icon.prototype = {
    getImageSize:function(){
        return this._inner.size;
    },
    setImageSize:function(size){
        this._inner.size = size;
    }
};

module.exports = Icon;
