var express = require('express');
var router = express.Router();

// Create routes for the following URL's

// [GET] /users
router.get('/', function(req, res){
  if(req.session.username){
    res.render('users/index', {
      title: 'Welcome, ' + req.session.username
    });
  } else {
    // Redirect the user here
    res.redirect('/users/login');
  }
});

// [GET] /users/login
router.get('/login', function(req, res){
  res.render('users/login', {
    postUrl: '/users/login',
    error: false
  });
});

// [POST] /users/login
router.post('/login', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  // We now authorize the use against a hardcoded one,
  // in this task we want to authorize against the database table
  // with users (see also data/database.sql)
  if(username === 'admin' &&
     password === '1234'){
    req.session.username = 'admin';
    res.redirect('/users');
  } else {
    res.render('users/login', {
      postUrl: '/users/login',
      error: 'Gebruikersnaam en/of wachtwoord onjuist.'
    });
  }
});

// [GET] /users/logout
router.get('/logout', function(req, res){
  // Destroy the session
  req.session.destroy();
  // Redirect to index page
  res.redirect('/users');
});

module.exports = router;