var express = require('express');
var fs = require('fs');
var router = express.Router();

var filesPath = __dirname + '/../public/uploads/';

// [GET] /uploads
router.get('/', function(req, res){
  fs.readdir(filesPath, function(err, files){
    if(err){
      res.send('Cannot access directory');
    }
    res.render('uploads/index',{
      files: files
    });
  });
});

// [GET] /uploads/new
router.get('/new', function(req, res){
  res.render('uploads/form');
});

// [POST] /uploads
router.post('/', function(req, res){
  // File path
  var upload = req.files.imageFile;

  fs.rename(upload.path, filesPath + upload.originalname, function(err){
    if(err){
      res.send('Something went wrong!');
    } else {
      res.redirect(req.baseUrl + '/');
    }
  });
});

module.exports = router;