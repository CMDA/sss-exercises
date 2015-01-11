var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){

  req.getConnection(function(err, connection){
    if(err){ return next(err); }

    connection.query('SELECT * FROM users', function(err, users){
      if(err){ return next(err); }
      res.render('test/index', {users: users});
    });
  });

});

module.exports = router;