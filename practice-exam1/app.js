var express = require('express');
var dataSet = require('./data/store');
var path = require('path');
var app = express();

// Setup serving static assets
app.use(express.static('public'));

// Hook our dataSet middleware,
// making the dataset available
app.use(dataSet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index', {title: 'SSS - Practice exam 1'});
});

if(module === require.main){
  app.listen(3000, function(){
    console.log('App listening at http://localhost:3000');
  });
}

module.exports = app;
