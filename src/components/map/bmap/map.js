/**
 * Created by fizzstack@gmail.com on 2017/2/13.
 * @constructor of Map
 * @return our map object
 *
 * @attention 百度地图已经占掉了BMap这个顶级命名空间了，所以这里我们使用DMap来命名我们的顶级空间
 */

var config = require('../config');
var Bounds = require('./Bounds');
var onOff = require('./onOff');
var formatOpts = require('./formatOpt');

/**
 * @constructor
 * @param {HTMLElement} id
 * @param {Object} opts
 * */
function Map(id,opts) {
  var elem, newOpts = {};

  this._type = 'Map';

  if(opts) {
    newOpts = formatOpts.map(opts);
  }

  this._inner = new BMap.Map(id, newOpts);

  this._init(newOpts);

  this._inner._smap = this;

  this._overLayers = {
    MarkerClusterer: [],
    Marker: [],
    InfoWindow: [],
    Polygon: [],
    Polyline: [],
    Circle: []
  };
}

Map.prototype = {
  /**
   * 百度Map方法调用之后需要
   * 调用centerAndZoom来进行初始化
   * @param {object} opts
   */
  _init: function(opts) {
    if(opts.center) {
      if(opts.zoom) {
        this._inner.centerAndZoom(opts.center, opts.zoom);
      }
    }

    this._inner.enableScrollWheelZoom();
  },

  plugin : mapPlugin,

  setFitView: function() {

  },

  clearMap: clearMap,

  clearInfoWindow: function() {
    var iws = this._overLayers.InfoWindow;
    iws.forEach( function(item) {
      item.close();
    })
  },

  /**
   * @param {LngLat} position
   * */
  panTo: function(position) {
    this._inner.panTo(position._inner);
  },


  /**
   * @param {Number} zoom
   * */
  setZoom: function(zoom) {
    this._inner.setZoom(zoom);
  },

  getBounds: function() {
    return new Bounds('','',this._inner.getBounds());
  },

	/**
   * @param {Bounds} bounds
   * */
  setBounds: function(bounds) {
    var self = this;
    if(typeof BMapLib.AreaRestriction === 'undefined') {
      console.warn('您还没有引入 BMapLib.AreaRestriction 哦~');
    }
    BMapLib.AreaRestriction.setBounds(self._inner, bounds._inner);
  },

  on: onOff.on,
  off: onOff.off
};

/**
 * @public
 *
 * @param {Array} plugins
 * @param {Function} fn callback function
 * */
function mapPlugin(plugins, fn) {
  if(plugins.length < 1) return;

  plugins.forEach( function(plugin) {
    if(plugin === 'DMap.MarkerClusterer') {
      // 这里改为在使用百度地图之前加载插件代码
      // 因为原来的业务代码中有同步代码，如果使用getScript异步加载，会导致错误发生
      fn();
    }
    if(plugin === 'DMap.MarkerClusterer') {}
  })
}

function clearMap() {
  var self = this;
  var overLayers = this._overLayers;

  for(var type in overLayers) {

    switch (type) {
      case 'Marker':
      case 'Circle':
      case 'Polygon':
      case 'Polyline':
      case 'InfoWindow':
        if(overLayers[type].length > 0) {
          overLayers[type].forEach( function(item) {
            item._inner.hide();
            // self._inner.removeOverlay(item._inner);
          });
          // overLayers.lenght = 0;
        }
        break;
      case 'MarkerClusterer':
        if(overLayers.MarkerClusterer.length > 0) {
          overLayers.MarkerClusterer.forEach( function(item) {
            item._inner.clearMarkers();
            // self._inner.removeOverlay(item._inner);
            // item._inner = null;
            // item = null;
          });
          // overLayers.MarkerClusterer.length = 0;
        }
        break;
    }

  }
}

module.exports = Map;
