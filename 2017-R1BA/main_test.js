var rt = require('pkg-dir').sync(__dirname) + '/';
var assert = require('assert');
var mod = require(__filename.replace(/_test.js$/g, '.js'));

var should_pass = function() {
  assert.equal(mod.runOne([
2525,
'2400 5'
  ]), 101);
  assert.equal(mod.runOne([
300,
'120 60',
'60 90',
  ]), 100);
  assert.equal(mod.runOne([
100,
'80 100',
'70 10',
  ]), 33.333333333333336);

};

describe(__filename, function() {
  it('should_pass', should_pass);
});
