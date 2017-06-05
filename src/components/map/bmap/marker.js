/**
 * @author fizzstack@gmail.com on 2017/2/13.
 * @Class Marker
 * @options
 * @高德： http://lbs.amap.com/api/javascript-api/reference/overlay#MarkerOptions
 * @百度： http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a3b3
 *
 * @Marker的Options.label 高德有，百度没有。
 *
 */

var obc = require('./overlayBaseClass');
var onOff = require('./onOff');
var formatOpts = require('./formatOpt');
var LngLat = require('./LngLat');

/**
 * Represents a Marker
 * @constructor
 * @param {Object} opts
 * @param {Object} inner
 * @return an object, inner is prime google map Marker instance.
 * */
function Marker(opts, inner) {

    this._type = 'Marker';
    this._isInMapOverlay = false;

    if (inner) {
        this._inner = inner;
    } else {
        // 在opts转换之前就要判断添加overlay
        obc.addOverlay(opts, this);

        var newOpts = formatOpts.marker(opts);

        BMap.Marker.call(this, newOpts.position, newOpts);//继承BMap.Marker属性

        this.setMap = function (map) {
            console.log(map);
            map._inner.addOverlay(this);
            if (newOpts.content) {
                var that = this;
                setTimeout(function () {
                    $(that.xc).css({'z-index': newOpts.zIndex});
                    var div = $(that.xc).find('>div');
                    div.html(newOpts.content);
                    div.css({'background': '#178', 'font-size': '12px'});
                }, 0)
            }
        };

        this._inner = new BMap.Marker(newOpts.position, newOpts);

        this._init(newOpts);

        if (!newOpts.visible) {
            this.hide();
        }
        if (newOpts.extData) {
            this.extData = newOpts.extData;
        }
    }
}

Marker.prototype = new BMap.Marker();//继承BMap.Marker方法


Marker.prototype._init = obc._init;
Marker.prototype.setMap = obc.setMap;
Marker.prototype.getMap = obc.getMap;

Marker.prototype.setExtData = function (ext) {
    this.extData = ext;
};
Marker.prototype.getExtData = function () {
    return this.extData;
};

Marker.prototype.getPosition = function () {
    return new LngLat('', '', this._inner.getPosition());
};

Marker.prototype.on = onOff.on;
Marker.prototype.off = onOff.off;

module.exports = Marker;



