var rt = require('pkg-dir').sync(__dirname) + '/';
var assert = require('assert');
var mod = require(__filename.replace(/_test.js$/g, '.js'));

var should_pass = function() {
  assert.equal(mod.runOne(['30 9']), '1 1');    // 3 3 3 3 3 2 1 1 1 1
  assert.equal(mod.runOne(['4 2']), '1 0');
  assert.equal(mod.runOne(['5 2']), '1 0');
  assert.equal(mod.runOne(['6 2']), '1 1');
  assert.equal(mod.runOne(['6 6']), '0 0');
  assert.equal(mod.runOne(['1 1']), '0 0');
  assert.equal(mod.runOne(['2 1']), '1 0');
  assert.equal(mod.runOne(['2 2']), '0 0');

  assert.equal(mod.runOne(['12 1']), '6 5'); // 6 5
  assert.equal(mod.runOne(['12 2']), '3 2'); // 5 3 2
  assert.equal(mod.runOne(['12 3']), '2 2'); // 3 2 2 2
  assert.equal(mod.runOne(['12 4']), '1 1'); // 2 2 2 1 1
  assert.equal(mod.runOne(['12 5']), '1 0'); // 2 2 1 1 1
  assert.equal(mod.runOne(['12 6']), '1 0'); // 2 1 1 1 1
  assert.equal(mod.runOne(['12 7']), '1 0'); // 1 1 1 1 1
  assert.equal(mod.runOne(['12 8']), '0 0'); // 1 1 1 1 0
  assert.equal(mod.runOne(['12 9']), '0 0'); // 1 1 1 0 0
  assert.equal(mod.runOne(['12 10']), '0 0');// 1 1 0 0 0
  assert.equal(mod.runOne(['12 11']), '0 0');// 1 0 0 0 0
  assert.equal(mod.runOne(['12 12']), '0 0');// 0 0 0 0 0

  // 20 12 ===
  assert.equal(mod.runOne(['20 1']), '10 9'); // 10 9
  assert.equal(mod.runOne(['20 2']), '5 4');  // 9 5 4
  assert.equal(mod.runOne(['20 3']), '4 4');  // 5 4 4 4
  assert.equal(mod.runOne(['20 4']), '2 2');  // 4 4 4 2 2
  assert.equal(mod.runOne(['20 5']), '2 1');  // 4 4 2 2 2 1
  assert.equal(mod.runOne(['20 6']), '2 1');  // 4 2 2 2 2 1 1
  assert.equal(mod.runOne(['20 7']), '2 1');  // 2 2 2 2 2 1 1 1
  assert.equal(mod.runOne(['20 8']), '1 0');  // 2 2 2 2 1 1 1 1
  assert.equal(mod.runOne(['20 9']), '1 0');  // 2 2 2 1 1 1 1 1
  assert.equal(mod.runOne(['20 10']), '1 0'); // 2 2 1 1 1 1 1 1
  assert.equal(mod.runOne(['20 11']), '1 0'); // 2 1 1 1 1 1 1 1
  assert.equal(mod.runOne(['20 12']), '1 0'); // 1 1 1 1 1 1 1 1
  assert.equal(mod.runOne(['20 13']), '0 0'); // 1 1 1 1 1 1 1
  assert.equal(mod.runOne(['20 14']), '0 0'); // 1 1 1 1 1 1
  assert.equal(mod.runOne(['20 15']), '0 0'); // 1 1 1 1 1
  assert.equal(mod.runOne(['20 16']), '0 0'); // 1 1 1 1
  assert.equal(mod.runOne(['20 17']), '0 0'); // 1 1 1
  assert.equal(mod.runOne(['20 18']), '0 0'); // 1 1
  assert.equal(mod.runOne(['20 19']), '0 0'); // 1
  assert.equal(mod.runOne(['20 20']), '0 0'); //

  // 10 2 == 20 12 == 30 22

  assert.equal(mod.runOne(['30 1']), '15 14');  // 15 14
  assert.equal(mod.runOne(['30 2']), '7 7');    // 14 7 7
  assert.equal(mod.runOne(['30 3']), '7 6');    // 7 7 7 6
  assert.equal(mod.runOne(['30 4']), '3 3');    // 7 7 6 3 3
  assert.equal(mod.runOne(['30 5']), '3 3');    // 7 6 3 3 3 3
  assert.equal(mod.runOne(['30 6']), '3 3');    // 6 3 3 3 3 3 3
  assert.equal(mod.runOne(['30 7']), '3 2');    // 3 3 3 3 3 3 3 2
  assert.equal(mod.runOne(['30 8']), '1 1');    // 3 3 3 3 3 3 2 1 1
  assert.equal(mod.runOne(['30 9']), '1 1');    // 3 3 3 3 3 2 1 1 1 1
  assert.equal(mod.runOne(['30 10']), '1 1');   // 3 3 3 3 2 1 1 1 1 1 1
  assert.equal(mod.runOne(['30 11']), '1 1');   // 3 3 3 2 1 1 1 1 1 1 1 1
  assert.equal(mod.runOne(['30 12']), '1 1');   // 3 3 2 1 1 1 1 1 1 1 1 1 1
  assert.equal(mod.runOne(['30 13']), '1 1');   // 3 2 1 1 1 1 1 1 1 1 1 1 1 1
  assert.equal(mod.runOne(['30 14']), '1 1');   // 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1
  assert.equal(mod.runOne(['30 15']), '1 0');   // 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
  assert.equal(mod.runOne(['30 16']), '0 0');   // 1 1 1 1 1 1 1 1 1 1 1 1 1 1
  assert.equal(mod.runOne(['30 17']), '0 0');   // 1 1 1 1 1 1 1 1 1 1 1 1 1
  assert.equal(mod.runOne(['30 18']), '0 0');   // 1 1 1 1 1 1 1 1 1 1 1 1
  assert.equal(mod.runOne(['30 19']), '0 0');   // 1 1 1 1 1 1 1 1 1 1 1
  assert.equal(mod.runOne(['30 20']), '0 0');   // 1 1 1 1 1 1 1 1 1 1
  assert.equal(mod.runOne(['30 21']), '0 0');   // 1 1 1 1 1 1 1 1 1
  assert.equal(mod.runOne(['30 22']), '0 0');   // 1 1 1 1 1 1 1 1
  assert.equal(mod.runOne(['30 23']), '0 0');   // 1 1 1 1 1 1 1
  assert.equal(mod.runOne(['30 24']), '0 0');   // 1 1 1 1 1 1
  assert.equal(mod.runOne(['30 25']), '0 0');   // 1 1 1 1 1
  assert.equal(mod.runOne(['30 26']), '0 0');   // 1 1 1 1
  assert.equal(mod.runOne(['30 27']), '0 0');   // 1 1 1
  assert.equal(mod.runOne(['30 28']), '0 0');   // 1 1
  assert.equal(mod.runOne(['30 29']), '0 0');   // 1
  assert.equal(mod.runOne(['30 30']), '0 0');   //

  assert.equal(mod.runOne(['1000 1000']), '0 0');
  assert.equal(mod.runOne(['1000 1']), '500 499');

  assert.equal(mod.runOne(['1000000 1000000']), '0 0');
};

describe(__filename, function() {
  it('should_pass', should_pass);
});
