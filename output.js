var R = require('ramda');

// (Number -> a -> b) -> [a] -> [b]
var mapIndexed = R.addIndex(R.map);

// Number -> String -> String
var printOne = function(output, index) {
  console.log('Case #' + (index + 1) + ': ' + output);
  return output;
};

// [String] -> [String]
exports.print = function(outputs) {
  return mapIndexed(printOne, outputs);
};

// Number -> String -> String
var printMultiOne = function(output, index) {
  console.log('Case #' + (index + 1) + ':');
   R.map(console.log, output);
  return output;
};

// [[String]] -> [[String]]
exports.printMulti = function(outputs) {
  return mapIndexed(printMultiOne, outputs);
};
