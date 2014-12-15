var express = require('express');
var router = express.Router();

// Create routes for the following URL's

// [GET] /users
router.get("/", function(req, res){
  if(req.session.username){
    res.send("Welcome, " + req.session.username);
  } else {
    // Redirect the user here
    res.redirect("/users/login");
  }
});

// [GET] /users/login
router.get('/login', function(req, res){
  res.render('users/login', {
    postUrl: '/users/login',
    error: true
  });
});


// [POST] /users/login
router.post('/login', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  if(username === 'admin' &&
     password === '1234'){
    req.session.username = 'admin';
    res.redirect('/users');
  } else {
    res.send('Wachtwoord of gebruikersnaam is niet juist');
  }
});
module.exports = router;