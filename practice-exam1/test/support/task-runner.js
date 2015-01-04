require('mocha-clean/brief');

/*
  Seperate task runner, to prevent mocha to exit the process
  which in turns throws a npm error.
 */
var Mocha = require('mocha');

// First, you need to instantiate a Mocha instance.
var mocha = new Mocha();

// Then, you need to use the method "addFile" on the mocha
// object for each file.
process.argv.slice(3).forEach(function(testFile){
  mocha.addFile(testFile);
});

mocha.run();