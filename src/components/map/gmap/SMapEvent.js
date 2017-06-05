/**
 * Created by fizz on 2017/2/20.
 * @constructor for google map event Object.
 * Wrap event and return our new event object just like gaode AMap event.
 */

var LngLat = require('./LngLat');
/**
 * 包装Google的事件触发时的event对象
 *
 * @constructor
 * @param {Object} e event object
 * */
function SMapEvent(e) {
    if (!e) {
        return
    }
    this._inner = e;

    this.lnglat = null;
    if (e.latLng) {
        this.lnglat = new LngLat(e.latLng.lng(), e.latLng.lat());
        this.lnglat.I = e.latLng.lng();
        this.lnglat.L = e.latLng.lat();
    }
    this.pixel = {
        x: e.pixel ? e.pixel.x : null,
        y: e.pixel ? e.pixel.y : null
    };

    this._type = 'Event';
    return this;
}

module.exports = SMapEvent;