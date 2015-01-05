var express = require('express');

// Middleware includes
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('./libs/middleware/logger');
var multer = require('multer');

var path = require('path');
var app = express();

// Setup serving static assets
app.use('/public', express.static(__dirname + '/public'));

// Load routes
var userRoutes = require('./routes/users');
var uploadRoutes = require('./routes/uploads');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Add session support
app.use(session({
  secret: '...', // Customize this string for security!
  saveUninitialized: true,
  resave: false
}));

// Support for form data
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer({dest: __dirname + '/public/uploads' }));

// Add logging
app.use(logger);

app.get('/', function(req, res) {
  var user = false;
  // Check for logged in user
  if (req.session.username){
    user = req.session.username;
  }

  // [GET] /
  res.render('index', {
    title: 'SSS - Exercise 4',
    user: user
  });
});

app.use('/users', userRoutes);
app.use('/uploads', uploadRoutes);


// Make promotion
app.get('/promotion', function(req, res){
  res.send('Buy our latest products');
});


// A routes and middleware below this are only
// accessable when the req.session.username is set
app.use(function(req, res, next){
  if (req.session.username){
    next();
  } else {
    res.send('Access denied.');
  }
});

//  ================
//  = Secret routes =
//  ================
app.get('/secret', function(req, res){
  res.send('We only give very high discounts for logged in users');
});



// Start the server
app.listen(3000, function(){
  console.log('App listening at http://localhost:3000');
});