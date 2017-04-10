/* eslint-disable max-statements */
/* eslint-disable complexity */
var R = require('ramda');

exports.head = R.head;

exports.pop = function(arr) {
  return R.drop(1, arr);
};

exports.addOne = function(arr, elm) {
  var iter = function(si, ei, arr, value) {
    var start = arr[si];
    var end = arr[ei];
    if (start === value || end === value) {
      return arr;
    }
    var len = ei - si;
    if (len === 0) {
      return R.insert(value > start ? si : si + 1, value, arr);
    } else if (len === 1) {
      if (value > start) {
        return R.insert(si, value, arr);
      } else if (value > end) {
        return R.insert(ei, value, arr);
      } else {
        return R.insert(ei + 1, value, arr);
      }
    }
    var mid = si + Math.floor((ei - si) / 2);
    var midValue = arr[mid];
    if (value === midValue) {
      return arr;
    }
    if (value > midValue) {
      return iter(si, mid, arr, value);
    } else {// value < mid
      return iter(mid, ei, arr, value);
    }
  };
  return iter(0, arr.length - 1, arr, elm);
};

exports.add = function(arr, elms) {
  return R.reduce(exports.addOne, arr, elms);
};
