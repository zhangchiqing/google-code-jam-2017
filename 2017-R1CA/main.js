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
      var NN = parseInt(RC[0], 10);
      var NK = parseInt(RC[1], 10);
      stat.length = NN;
      stat.current = [NK];
      return stat;
    }
    stat.current.push(line);
    if (stat.current.length === stat.length + 1) {
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

var PI_2 = 2 * Math.PI;
var PI = Math.PI;

var square = function(x) { return x * x; };

// (R, H)
var Cake = {
  selectRadius: R.nth(0),
  selectHeight: R.nth(1),
  lateral: function(c) {
    var r = Cake.selectRadius(c);
    var h = Cake.selectHeight(c);
    return r * h;
  },
  realLateral: function(c) {
    return PI_2 * Cake.lateral(c);
  },
  area: function(c) {
    return PI * square(Cake.selectRadius(c));
  },
  // Cake -> Cake -> Bool
  gte: function(cake1, cake2) {
    return Cake.selectRadius(cake1) >= Cake.selectRadius(cake2);
  }

};

var IndexedCake = {
  selectIndex: R.nth(0),
  selectCake: R.nth(1),
};

IndexedCake.selectCakeSize = R.pipe(IndexedCake.selectCake, Cake.selectRadius);
IndexedCake.lateral = R.pipe(IndexedCake.selectCake, Cake.lateral);
IndexedCake.gte = R.curry(function(ic1, ic2) {
  return Cake.gte(IndexedCake.selectCake(ic1), IndexedCake.selectCake(ic2));
});
IndexedCake.equal = R.eqBy(IndexedCake.selectIndex);

// [IndexedCake]
var sizeForStacks = function(bests, bottom) {
  // Cake
  var bottomCake = IndexedCake.selectCake(bottom);
  // [Cake]
  var bestCakes = R.map(IndexedCake.selectCake, bests);
  // [Number]
  var cakesLateral = R.map(Cake.realLateral, R.concat(bestCakes, [bottomCake]));
  // Number
  var totalLateral = R.reduce(R.add, 0, cakesLateral);
  // Number
  var area = Cake.area(bottomCake);
  return area + totalLateral;
};

// [String] -> Output
exports.runOne = function(inputs) {
  var K = R.head(inputs);
  // [Cake]
  var cakes = R.map(function(c) {
    return R.map(parseInt, R.split(' ', c));
  }, R.drop(1, inputs));
  var N = cakes.length;
  // [Index]
  var indexes = R.range(0, N);
  // [IndexedCake]
  var indexedCakes = R.zip(indexes, cakes);
  // [IndexedCake]
  var indexedCakesSortedBySize = R.sortBy(IndexedCake.selectCakeSize, indexedCakes);

  // [IndexedCake]
  var possibleBottoms = R.drop(K - 1, indexedCakesSortedBySize);
  // [IndexedCake]
  var sortedByLateral = R.sortBy(IndexedCake.lateral, indexedCakes);

  return R.reduce(function(max, bottom) {
    // max :: Number, bottom :: IndexedCake
    // [IndexedCake]
    var bestTops = R.filter(function(ic) {
      return !IndexedCake.equal(bottom, ic) && IndexedCake.gte(bottom, ic);
    }, sortedByLateral);
    // [IndexedCake]
    var bests = R.takeLast(K - 1, bestTops);
    var maxForBottom = sizeForStacks(bests, bottom);
    return R.max(max, maxForBottom);
  }, 0, possibleBottoms);
};

