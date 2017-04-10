var rt = require('pkg-dir').sync(__dirname) + '/';
var assert = require('assert');
var mod = require(__filename.replace(/_test.js$/g, '.js'));

var should_pass = function() {
  assert.equal(mod.runOne(['132']), '129');
  assert.equal(mod.runOne(['1000']), '999');
  assert.equal(mod.runOne(['7']), '7');
  assert.equal(mod.runOne(['111111111111111110']), '99999999999999999');
};

describe(__filename, function() {
  it('should_pass', should_pass);
});
