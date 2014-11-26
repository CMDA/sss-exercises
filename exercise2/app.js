var express = require('express');
var path = require('path');
var app = express();

// Setup serving static assets
app.use(express.static('public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Setup initial routing - index
app.get('/', function(req, res) {
  res.render('index', {title: 'Server-side Scripting - Exercise 2'});
});

// Start the server
var server = app.listen(3000, function(){
  console.log('App listening at http://localhost:3000');
});