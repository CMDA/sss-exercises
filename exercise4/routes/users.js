var express = require('express');
var router = express.Router();

// [GET] /users
router.get('/', function(req, res){
  if(req.session.username){
    res.render('users/index', {user: req.session.username});
  } else {
    // Redirect the user here
    res.redirect('/users/login');
  }
});

// [GET] /users/login
router.get('/login', function(req, res){
  res.render('users/login', {error: false});
});

// [GET] /users/logout
router.get('/logout', function(req, res){
  delete req.session.username;
  res.redirect(req.baseUrl + '/');
});


// [POST] /users/login
router.post('/login', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  if(username === 'admin' &&
     password === '1234'){
    req.session.username = username;
    res.redirect(req.baseUrl + '/');
  } else {
    res.render('users/login', {error: 'Wachtwoord of gebruikersnaam is niet juist'});
  }
});

module.exports = router;