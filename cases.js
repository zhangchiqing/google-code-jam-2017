var R = require('ramda');
// Number -> [String] -> [[String]]
exports.linePerCase = function(linePerCase, lines) {
  return R.splitEvery(linePerCase, lines);
};

var CaseReader = {
  // String -> CaseReader
  make: function(numLineStr) {
    var numLine = parseInt(numLineStr, 10);
    return {
      cases: [],
      numLine: numLine,
    };
  },
  // String -> CaseReader -> CaseReader
  readLine: function(line, reader) {
    reader.cases.push(line);
    return reader;
  },
  // CaseReader -> Bool
  isFullfilled: function(reader) {
    return reader.cases.length === reader.numLine;
  },
  // CaseReader -> [String]
  selectCases: R.prop('cases'),
};

var AllCases = {
  // [[String]] -> CaseReader? -> AllCases
  make: function(all, currentCase) {
    return { all: all, currentCase: currentCase };
  },

  // () -> AllCases
  empty: function() {
    return AllCases.make([], null);
  },

  // AllCases -> CaseReader?
  selectCurrentCase: R.prop('currentCase'),
  // AllCases -> [[String]]
  selectAll: R.prop('all'),

  // String -> AllCases -> AllCases
  readLine: function(allCases, line) {
    // [[String]]
    var all = AllCases.selectAll(allCases);

    var mayCaseReader = AllCases.selectCurrentCase(allCases);
    if (!mayCaseReader) {
      return AllCases.make(all, CaseReader.make(line));
    }

    // CaseReader
    var currentCase = CaseReader.readLine(line, mayCaseReader);
    if (CaseReader.isFullfilled(currentCase)) {
      var c = CaseReader.selectCases(currentCase);
      all.push(c);
      return AllCases.make(all, null);
    } else {
      return AllCases.make(all, currentCase);
    }
  },

};

// [String] -> [[String]]
exports.dynamicLines = function(lines) {
  // AllCases
  var allcases = R.reduce(AllCases.readLine, AllCases.empty(), lines);
  return AllCases.selectAll(allcases);
};
