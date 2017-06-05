/**
 * Created by fizz on 2017/2/14.
 * @event base Object
 *
 * @attention 百度的事件绑定非常简单，只有两个：addEventListener和removeEventListener
 * @BMapLib EventWrapper()
 * @url: http://api.map.baidu.com/library/EventWrapper/1.2/docs/symbols/BMapLib.EventWrapper.html
 */

var SMapEvent = require('./SMapEvent');

var event = {};

event.map = require('./eventMap');

event.listeners = [];

event.getSMapEvent = function(e) {
  return new SMapEvent(e);
};

/**
 * @function
 * @param {Object} instance DOM对象
 * @param {String} eventName 事件名
 * @param {Function} handler 事件处理函数
 * @param {Object} context 上下文
 * @return 返回一个 EventListener 对象实例
 * */
event.addDomListener = function(instance, eventName, handler, context) {
  var callback;

  if(context) {
    callback = event._createCallback(handler, context);
  } else {
    callback = handler;
  }

  if(instance.addEventListener) {
    instance.addEventListener(eventName, callback, false);
  }
  else if( instance.attachEvent ) {
    instance.attachEvent('on' + eventName, callback);
  }
  else {
    instance['on' + eventName] = callback;
  }

  return new MapsEventListener(instance, eventName, handler, context, MapsEventListener.DOM_EVENT, callback);
};

event._createCallback = function(handler, context) {
  if(context) {
    return function (e) {
      console.log('event Object', e);
      handler.call(context, event.getSMapEvent(e));
    };
  }
  else {
    return function (e) {
      // console.log(e);
      handler(event.getSMapEvent(e));
    };
  }
};

event.addListener = function(instance, eventName, handler, context) {
  if(!instance || !instance._inner) return;

  var realInstance = instance._inner,
      relevantEvent = event.getRelevantEvent(instance, eventName),
      callback;

  if(context) {
    // 这个addEventListener是百度地图自己提供的那个绑定事件API
    callback = event._createCallback(handler, context);
    if(!realInstance.addEventListener) {return;}
    realInstance.addEventListener(relevantEvent, callback);
  }
  else {
    callback = event._createCallback(handler);
    realInstance.addEventListener(relevantEvent, callback);
  }

  return new MapsEventListener(instance, eventName, handler, context, MapsEventListener.MAP_EVENT, callback);
};

event.addListenerOnce = function(instance, eventName, handler, context) {
  var listener = event.addListener(instance, eventName, function(){
    event.removeListener(listener);
    return handler.apply(this, arguments);
  }, context);
  return listener;
};

/**
 * @function 移除特定的事件监听函数
 * @param {MapsEventListener} listener
 * @return none
 * */
event.removeListener = function(listener) {
  var instance = listener._instance,
      eventName = listener._eventName,
      handler = listener._handler,
      context = listener._context,
      callback = listener._callback,
      listeners = instance._e_ || {};

  for( var i in listeners ) {
    if( listeners[i]._guid == listener._guid) {
      // DOM事件, instance 对应的是DOM对象
      if(listener._eventType == MapsEventListener.DOM_EVENT) {
        if(instance.removeEventListener) {
          instance.removeEventListener(eventName, handler, false);
        }
        else if (instance.detachEvent) {
          instance.detachEvent('on' + eventName, handler);
        }
        else {
          instance['on' + eventName] = null;
        }
      }
      else if (listener._eventType == MapsEventListener.MAP_EVENT) {
        if(callback) {
          instance._inner.removeEventListener(eventName, callback);
        }
        else {
          instance._inner.removeEventListener(eventName, handler);
        }
      }

      delete listeners[i];
    }
  }
};

event.trigger = function(instance, eventName, extArgs) {
  var listeners = instance._e_ || {};
  for(var i in listeners) {
    if(listeners[i].eventName == eventName) {
      var args = Array.prototype.slice.call(arguments, 2);
      listeners[i]._handler.apply(instance, args);
    }
  }
};

/**
 * @constructor
 * @param {HTMLElement} instance DOM 元素
 * @param {String} eventName
 * @param {Function} handler
 * @param {Object} context
 * @param {String||Number} eventType
 * @return mapsEventListener object
 * */
function MapsEventListener(instance, eventName, handler, context, eventType, callback) {
  this._instance = instance;
  this._eventName = eventName;
  this._handler = handler;
  this._context = context;
  this._callback = callback;
  this._eventType = eventType;
  this._guid = MapsEventListener._guid++ ;
  this._instance._e_ = this._instance._e_ || {};
  this._instance._e_[this._guid] = this;
}

MapsEventListener._guid = 1;
MapsEventListener.DOM_EVENT = 1;
MapsEventListener.MAP_EVENT = 2;
event._MapsEventListener = MapsEventListener;

/**
 * @function 输入高德事件名，返回对应的百度事件名
 * @param {DomObject} instance
 * @param {String} eventName
 * @return eventName
 * */
event.getRelevantEvent = function(instance, eventName) {
  if(instance._type in event.map) {
    if(eventName in event.map[instance._type]) {
      return event.map[instance._type][eventName];
    } else {
      return eventName;
    }
  } else {
    return eventName;
  }
};

module.exports = event;
