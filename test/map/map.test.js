/**
 * Created by fizz on 2017/2/26.
 */

var assert = require('assert');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present.', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    })
  })
});
