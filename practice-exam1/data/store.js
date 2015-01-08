var fs = require('fs');

var env = 'development';

/* 101 - FS cached data store */
module.exports = function(){
  var config = global.config || {
    resetData: false
  };

  var sampleDataPath = config.sampleDataPath || './data/sample-data.json',
    dir = config.dataDir || './tmp/', // will likely crash, when using more then 1 lvl
    fileName = 'data-set.json',
    path = dir + fileName;

  if(config.resetData && fs.existsSync(path)){
    fs.unlinkSync(path);
  }

  return function(req, res, next){

    var store = {};

    if (!fs.existsSync(path)) {
      // Since we have no data, load the sample
      store = JSON.parse(fs.readFileSync(sampleDataPath, 'utf8'));
    } else {
      // Read file, can't continue without it,
      // so not much use making it async
      store = JSON.parse(fs.readFileSync(path, 'utf8')).store;
    }

    // Setup data on request object
    req.locals = req.locals || {};
    req.locals.store = store;

    // Keep a reference to original res.end
    var end = res.end;

    // When the response has ended, write the
    // current data to fs
    res.end = function(data, encoding){
      var dataSet = {
        env: env,
        store: store
      };

      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }

      // write json to tmp
      fs.writeFile(path, JSON.stringify(dataSet), {flag: 'w+'}, function(err) {
        if(err) {
          console.log(err);
          console.log('Error saving data to disk, this may result in data lose.');
        }
      });

      // Set back the original func
      res.end = end;
      res.end(data, encoding);
    };
    next();
  };
};
