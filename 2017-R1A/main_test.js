var rt = require('pkg-dir').sync(__dirname) + '/';
var assert = require('assert');
var mod = require(__filename.replace(/_test.js$/g, '.js'));

var should_pass = function() {
  assert.deepEqual(mod.runOne([
    'G??',
    '?C?',
    '??J',
  ]), [
    'GGG',
    'CCC',
    'JJJ',
  ]);

  assert.deepEqual(mod.runOne([
    'CODE',
    '????',
    '?JAM',
  ]), [
    'CODE',
    'CODE',
    'JJAM',
  ]);

  assert.deepEqual(mod.runOne([
    'CA',
    'KE',
  ]), [
    'CA',
    'KE',
  ]);

  assert.deepEqual(mod.runOne([
    '???T',
    '????',
    'A???',
  ]), [
    'TTTT',
    'TTTT',
    'AAAA',
  ]);

  assert.deepEqual(mod.runOne([
    'T',
  ]), [
    'T',
  ]);

  assert.deepEqual(mod.runOne([
    '????',
    '????',
    'A?T?',
  ]), [
    'ATTT',
    'ATTT',
    'ATTT',
  ]);
};

describe(__filename, function() {
  it('should_pass', should_pass);
});

