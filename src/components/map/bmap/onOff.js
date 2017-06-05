/**
 * Created by fizz on 2017/2/14.
 * @onOff 基类，覆盖物的实例都具有on和off方法，都直接来自于此
 */

var event = require('./event');
var onOff = {};

/**
 * @function addEventListener 的简便方法
 *
 * @param {String} eventName 事件名称
 * @param {Function} handler 回调函数
 * @param {Object} context 上下文
 * */
onOff.on = function(eventName, handler, context) {
  var listener, eventListener;

  listener = event.addListener(this, eventName, handler, context);

  eventListener = {
    eventName: eventName,
    handler: handler,
    context: context,
    listener: listener
  };

  if(!this._eventListener) this._eventListener = [];

  this._eventListener.push(eventListener);
  return listener;
};

/**
 * @function
 * @param {String} eventName 事件名称
 * @param {Function} handler 回调函数
 * @param {Object} context 上下文
 *
 * @attention 要想移除对应的事件，必须保证eventName，handler，context一致。
 * */
onOff.off = function(eventName, handler, context) {
  if(!this._eventListener) return;

  var filterResult = this._eventListener.filter( function(item, index) {
    if(eventName === item.eventName) return true;
    return false;
  });

  if(filterResult && filterResult.length > 0) {
    filterResult.forEach( function(item) {
      if( item.handler === handler &&
        item.context === context ) {
        event.removeListener(item.listener);
      }
    })
  }

};

module.exports = onOff;
