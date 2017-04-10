var rt = require('pkg-dir').sync(__dirname) + '/';
var assert = require('assert');
var mod = require(__filename.replace(/_test.js$/g, '.js'));

var should_pass = function() {
  assert.equal(mod.runOne(['---+-++- 3']), '3');
  assert.equal(mod.runOne(['+++++ 4']), '0');
  assert.equal(mod.runOne(['-+-+- 4']), 'IMPOSSIBLE');
};

describe(__filename, function() {
  it('should_pass', should_pass);
});
