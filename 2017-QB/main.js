/* eslint-disable max-statements */
var rt = require('pkg-dir').sync(__dirname) + '/';
var R = require('ramda');
var readIn = require(rt + 'readIn');
var cases = require(rt + 'cases');
var Output = require(rt + 'output');

// () -> Output
exports.run = function(path) {
  // [String]
  var file = readIn.readAll(path);
  // [[String]]
  var cs = cases.linePerCase(1, R.drop(1, file));
  // [String]
  var outputs = R.map(exports.runOne, cs);
  return Output.print(outputs);
};

// [String] -> Output
exports.runOne = function(inputs) {
  // String
  var input = inputs[0];
  // [Number]
  var digits = R.map(parseInt, R.split('', input));

  var iter = function(head, tail) {
    var left = R.last(head);
    var right = R.head(tail);
    if (R.isNil(left)) {
      return tail;
    } else if (R.isNil(right)) {
      return iter(R.dropLast(1, head), [left]);
    } else if (left < right) {
      return iter(R.dropLast(1, head), R.concat([left], tail));
    } else if (left === right) {
      return iter(R.dropLast(1, head), R.concat([left], tail));
    } else { // (left > right)
      var newLastDigit = left - 1;
      var newLeft = R.dropLast(1, head);
      var tail9ss = R.repeat(9, tail.length);
      return iter(newLeft, R.concat([newLastDigit], tail9ss));
    }
  };

  return iter(digits, []).join('').replace(/^0+/g, '');
};
