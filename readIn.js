var fs = require('fs');
var R = require('ramda');
// Path -> [String]
exports.readAll = function(path) {
  var file = fs.readFileSync(path, 'utf8');
  return R.reject(R.equals(''), R.split('\n', file));
};
