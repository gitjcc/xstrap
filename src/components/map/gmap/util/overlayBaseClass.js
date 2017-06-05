/**
 * Created by fizz on 2017/2/17.
 */

module.exports = {
  setMap: function(map) {
    if(map !== null) {
      this._smap = map;      
      this._inner._smap = map;
      map._overLayers[this._type].push(this);
      this._inner.setMap(map._inner);
    } else {
      this._inner.setMap(null);
    }
  },

  getMap: function() {
    return this._inner._smap;
  },

  hide: function() {
    this._inner.setVisible(false);
  },

  show: function() {
    this._inner.setVisible(true);
  },

  addOverlay: function(opts, self) {
    if('map' in opts) {
      opts.map._overLayers[self._type].push(self);
    }
  }
};
