var fs = require('fs');

var env = 'development';

var dataSample = {
  'env': env,
  'store': {
    'posts':[{
      'id': 1,
      'author': 'Blog author',
      'title': 'Blog title'
    }]
  }
};

/* 101 - FS cached data store */
module.exports = function(req, res, next){

  var store = {},
      dir = './tmp/', // will likely crash, when using more then 1 lvl
      fileName = 'data-set.json',
      path = dir + fileName;

  // Since we have no data, load the sample
  if (!fs.existsSync(path)) {
    store = dataSample.store;
  } else {
    // Read file, can't continue without it,
    // so not much use making it async
    store = JSON.parse(fs.readFileSync(path, 'utf8')).posts;
  }

  // Setup data
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