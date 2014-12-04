var express = require('express');
var session = require('express-session');

var path = require('path');
var app = express();
var userRoutes = require('./routes/users');
// Setup serving static assets
app.use(express.static('public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Add session support
app.use(session({
  secret: '...', // Customize this string for security!
  saveUninitialized: true,
  resave: false
}));

// Setup initial routing - index
app.use('/users', userRoutes);

app.get('/', function(req, res) {
  res.render('index', {title: 'SSS - Exercise 3'});
});

// Start the server
app.listen(3000, function(){
  console.log('App listening at http://localhost:3000');
});