/**
 * Created by fizz on 2017/2/16.
 */

module.exports = {
  isArray: function(item) {
    return Object.prototype.toString.call(item) == '[object Array]';
  },

  isString: function(item) {
    return typeof item === 'string';
  },

  isExitsVariable: function(variable) {
    try {
      if(typeof(variable) === 'undefined') {
        return false;
      } else {
        return true;
      }
    } catch(err) {
      console.log(err);
    }
  }
};
