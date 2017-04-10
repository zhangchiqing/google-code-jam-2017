/* eslint-gapLengthable max-statements */
var rt = require('pkg-dir').sync(__dirname) + '/';
var R = require('ramda');
var readIn = require(rt + 'readIn');
var cases = require(rt + 'cases');
var Output = require(rt + 'output');
var UH = require('./uniqHeap');


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

// LRbyN(5) === [2, 2]
// LRbyN(4) === [2, 1]
var LRbyN = function(n) {
  if (n % 2 === 0) {
    var halfEven = n / 2;
    return [halfEven, halfEven - 1];
  }

  var halfOdd = (n - 1) / 2;
  return [halfOdd, halfOdd];
};

var UniqIndexedHeap = {
  // Number -> UniqIndexedHeap
  make: function(n) {
    var index = {};
    index[n] = 1;
    return {
      heap: [n],
      index: index,
    };
  },
  // UniqIndexedHeap -> Heap
  selectHeap: R.prop('heap'),
  // UniqIndexedHeap -> Map Number Number
  selectIndex: R.prop('index'),
  // UniqIndexedHeap -> UniqIndexedHeap
  pop: function(h) {
    var index = UniqIndexedHeap.selectIndex(h);
    var heap = UniqIndexedHeap.selectHeap(h);
    var elm = UH.head(heap);
    var newH = UH.pop(heap);
    index[elm] = 0;
    return {
      heap: newH,
      index: index,
    };
  },
  addTwo: function(h, elms, value) {
    var index = UniqIndexedHeap.selectIndex(h);
    var heap = UniqIndexedHeap.selectHeap(h);
    var newHeap = UH.add(heap, elms);
    index[elms[0]] = (index[elms[0]] || 0) + value;
    index[elms[1]] = (index[elms[1]] || 0) + value;
    return {
      index: index,
      heap: newHeap,
    };
  },
};

// [String] -> Output
exports.runOne = function(inputs) {
  var input = inputs[0].split(' ');
  var N = parseInt(input[0], 10);
  var K = parseInt(input[1], 10);

  var secondLast = K - 1;
  var iter = function(stat, k) {
    var uniqGaps = UniqIndexedHeap.selectHeap(stat);
    // Number
    var biggestGap = R.head(uniqGaps);
    if (k === secondLast) {
      return biggestGap;
    }

    var index = UniqIndexedHeap.selectIndex(stat);
    // Number
    var sameGapCount = index[biggestGap];

    var gapLength = secondLast - k;
    if (gapLength < sameGapCount) { // 12 7 -> secondLast: 6 k: 4
      return biggestGap;
    }

    // [Number, Numbe]
    var gapsAfterTaken = LRbyN(biggestGap);

    var newStat = UniqIndexedHeap.addTwo(
      UniqIndexedHeap.pop(stat), gapsAfterTaken, sameGapCount);

    return iter(newStat, k + sameGapCount);
  };

  var last = iter(UniqIndexedHeap.make(N), 0);
  var result = LRbyN(last);
  return result.join(' ');
};
