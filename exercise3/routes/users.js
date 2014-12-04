var express = require('express');
var router = express.Router();

// Create routes for the following URL's
// [GET] /users
// [GET] /users/login
// [POST] /users/login

router.get("/", function(req, res){
  if(req.session.username){
    res.send("Welcome, " + req.session.username);
  } else {
    // Redirect the user here
    res.send("We should redirected to the form to login");
  }
});


module.exports = router;