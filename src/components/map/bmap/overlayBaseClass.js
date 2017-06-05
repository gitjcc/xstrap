/**
 * Created by fizz on 2017/2/17.
 * @baseClass overlay 不可实例化的基类
 */

module.exports = {
    setMap: function (map) {
        if (map !== null) {
            // console.log(this);
            this._inner._smap = map;

            if (!this._isInMapOverlay) {
                map._overLayers[this._type].push(this);
                this._isInMapOverlay = true;
            }

            map._inner.addOverlay(this._inner);
        } else {
            map._inner.removeOverlay(this._inner);
        }
    },

    getMap: function () {
        return this._inner._smap;
    },

    hide: function () {
        this._inner.hide();
    },

    show: function () {
        this._inner.show();
    },

    addOverlay: function (opts, self) {
        if ('map' in opts) {
            if (!self._isInMapOverlay) {
                opts.map._overLayers[self._type].push(self);
                self._isInMapOverlay = true;
            }
        }
    },

    _init: function (opts) {
        if (opts.smap) {
            this._inner._smap = opts.smap;
            opts.smap._inner.addOverlay(this._inner);
        }
    }
};
