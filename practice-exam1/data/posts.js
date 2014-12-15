var fs = require('fs');

var env = 'development';

var dataSample = {
  'env': env,
  'posts': [{
    'id': 1,
    'author': 'Blog author',
    'title': 'Blog title'
  }]
};

/* 101 - FS cached object */
module.exports = function(req, res, next){

  var posts = [],
      path = './tmp/data-set.json';

  // Since we have no data, load the sample
  if (!fs.existsSync(path)) {
    fs.mkdirSync("./tmp");
    posts = dataSample;
  } else {
    // Read file, can't continue without it,
    // so not much use making it async
    posts = JSON.parse(fs.readFileSync(path, 'utf8')).posts;
  }

  // Setup data
  req.locals = req.locals || {};
  req.locals.posts = posts;

  // Safe reference to original res.end
  var end = res.end;
  // When the response has ended, save the
  // that current data to cache
  res.end = function(data, encoding){
    var dataSet = {
      env: env,
      posts: posts
    };

    // write json to tmp
    fs.writeFile(path, JSON.stringify(dataSet), function(err) {
      if(err) {
        console.log(err);
        console.log("Error saving data to disk, this may result in data lose.");
      }
    });

    // Set back the original func
    res.end = end;
    res.end(data, encoding);
  };
  next();
};