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
      stat.length = NC + 1;
      stat.current = [NR];
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
  return Output.print(outputs);
};

// [String] -> Output
exports.runOne = function(inputs) {
  var distance = R.take(1, inputs);
  // [[Position, Speed]]
  var horses = R.map(R.split(' '), R.drop(1, inputs));
  // [Number]
  var timesToFinish = R.map(calcFinishTime(distance), horses);
  // Number
  var maxTime = R.reduce(R.max, timesToFinish[0], timesToFinish);
  return distance / maxTime;
};

var calcFinishTime = R.curry(function(distance, horse) {
  var position = horse[0];
  var speed = horse[1];
  return (distance - position) / speed;
});
