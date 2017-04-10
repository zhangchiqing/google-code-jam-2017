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
  var input = R.split(' ', inputs[0]);
  // [String]
  var faces = R.split('', input[0]);
  var K = parseInt(input[1], 10);

  var iter = function(faces, index, count, K) {
    if (index + K === faces.length + 1) {
      return R.all(R.equals('+'), faces) ? count : 'IMPOSSIBLE';
    }

    if (faces[index] === '+') {
      return iter(faces, index + 1, count, K);
    }

    var head = R.take(index, faces);
    var flipped = flip(faces, index, K);
    var tail = R.drop(index + K, faces);
    var newFaces = head.concat(flipped, tail);
    return iter(newFaces, index + 1, count + 1, K);
  };

  return iter(faces, 0, 0, K);
};

var flipFace = function(f) {
  return f === '+' ? '-' : '+';
};

var flip = function(faces, index, K) {
  return R.map(R.pipe(R.nth(R.__, faces), flipFace), R.range(index, index + K));
};
