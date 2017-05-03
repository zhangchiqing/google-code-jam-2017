var rt = require('pkg-dir').sync(__dirname) + '/';
var assert = require('assert');
var mod = require(__filename.replace(/_test.js$/g, '.js'));

var should_pass = function() {
  assert.equal(mod.runOne([1,'200 10']), 138230.0767579509);
  assert.equal(mod.runOne([1,'200 10']), mod.runOne([1, '100, 20', '200 10']));
  assert.equal(mod.runOne([2,'100 20', '200 10']), 150796.44737231007);
  assert.equal(mod.runOne([2,'100 10', '100 10', '100 10']), 43982.2971502571);
  assert.equal(mod.runOne([2,'9 3', '7 1', '10 1', '8 4']), 625.1769380643689);
};

describe(__filename, function() {
  it('should_pass', should_pass);
});
