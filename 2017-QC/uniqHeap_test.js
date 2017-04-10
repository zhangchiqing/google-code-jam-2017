var rt = require('pkg-dir').sync(__dirname) + '/';
var assert = require('assert');
var mod = require(__filename.replace(/_test.js$/g, '.js'));

var should_pass = function() {
  assert.deepEqual(mod.add([7,6], [7]), [7,6]);
  assert.deepEqual(mod.add([7,6], [7,6]), [7,6]);
  assert.deepEqual(mod.add([7], [7]), [7]);
  assert.deepEqual(mod.add([7], [4]), [7,4]);
  assert.deepEqual(mod.add([7,6], [4]), [7,6,4]);
  assert.deepEqual(mod.add([7,3], [4]), [7,4,3]);
  assert.deepEqual(mod.add([7,3], [3]), [7,3]);
  assert.deepEqual(mod.add([7,3], [8]), [8,7,3]);
  assert.deepEqual(mod.add([7,3], [6,5]), [7,6,5,3]);
  assert.deepEqual(mod.add([7,5], [6,5]), [7,6,5]);
  assert.deepEqual(mod.add([14, 13, 12, 10, 7,5], [6]),
                           [14, 13, 12, 10, 7,6,5]);
  assert.deepEqual(mod.add([14, 13, 12, 10, 7,5,3,2,1], [6]),
                           [14, 13, 12, 10, 7,6,5,3,2,1]);
};

describe(__filename, function() {
  it('should_pass', should_pass);
});
