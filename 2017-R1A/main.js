/* eslint-disable max-statements */
var rt = require('pkg-dir').sync(__dirname) + '/';
var R = require('ramda');
var readIn = require(rt + 'readIn');
var cases = require(rt + 'cases');
var Output = require(rt + 'output');

// console.log(R.drop(1, [1,2,3]));
// () -> Output
exports.run = function(path) {
  // [String]
  var file = R.drop(1, readIn.readAll(path));
  var cases = R.reduce(function(stat, line) {
    if (!stat.length) {
      var RC = line.split(' ');
      var NR = parseInt(RC[0], 10);
      var NC = parseInt(RC[1], 10);
      stat.length = NR;
      stat.current = [];
      return stat;
    }
    stat.current.push(line);
    if (stat.current.length === stat.length) {
      stat.all.push(stat.current);
      stat.current = null;
      stat.length = null;
    }
    return stat;
  }, { length: null, current: null, all: [] }, file);
  // [String]
  var outputs = R.map(exports.runOne, cases.all);
  return Output.printMulti(outputs);
};

// [String] -> Output
exports.runOne = function(inputs) {
  // [String]
  var lines = inputs;
  // Number
  var firstLineHasLetterIndex = findFirstLineHasLetter(lines);
  // String
  var firstLine = getLine(firstLineHasLetterIndex, lines);
  // FilledString
  var firstFilled = fillLine(firstLine);

  // [String]
  var headNoLetterLines = R.take(firstLineHasLetterIndex, lines);
  // [FilledString]
  var headFilled = copyLines(firstFilled, headNoLetterLines);
  // [String]
  var restLines = R.drop(firstLineHasLetterIndex + 1, lines);
  // [FilledString]
  var restFilled = fillRest(firstFilled, restLines);

  // [FilledString]
  var newGrid = R.concat(R.concat(headFilled, [firstFilled]), restFilled);
  return newGrid;
};

// FilledString -> [String] -> [FilledString]
var fillRest = function(last, restLines) {
  // { all: [FilledString], last: FilledString }
  var restFilledStat = R.reduce(function(acc, line) {
    // [FilledString]
    var all = acc.all;
    // FilledString
    var last = acc.last;
    // FilledString
    var filled;
    if (lineHasLetter(line)) {
      filled = fillLine(line);
    } else {
      filled = last;
    }
    // FilledString
    var newLast = filled;
    all.push(filled);
    return {
      all: all,
      last: newLast,
    };
  }, { all: [], last: last }, restLines);
  return restFilledStat.all;
};

// String -> Bool
var lineHasLetter = function(line) {
  return /[^\?]/.test(line);
};

// [String] -> Number
var findFirstLineHasLetter = function(lines) {
  return R.findIndex(lineHasLetter, lines);
};

// Number -> [a] -> a
var getLine = R.nth;

// String -> FilledString
var fillLine = function(line) {
  // [Char]
  var ls = line.split('');
  // Char
  var lastL = R.findLast(R.compose(R.not, R.equals('?')), ls);
  var filled = R.reduceRight(function(acc, l) {
    var current = acc.current;
    var filled = acc.filled;
    if (l === '?') {
      filled.push(current);
      return acc;
    }
    if (l !== current) {
      acc.current = l;
    }
    filled.push(acc.current);
    return acc;
  }, { current: lastL, filled: [] }, ls);
  return R.reverse(filled.filled).join('');
};

// FilledString -> [String] -> [FilledString]
var copyLines = function(copy, lines) {
  return R.repeat(copy, lines.length);
};
