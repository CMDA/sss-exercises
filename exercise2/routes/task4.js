var express = require('express');
var router = express.Router();
var request = require("request");
/* GET Weather page. */
router.get('/', function(req, res) {

  var url = "http://api.openweathermap.org/data/2.5/weather?q=Amsterdam,nl";

  res.render('task4', {title: 'Het weer vandaag'});

});

// Extra opdacht op basis van query string weer ophalen
module.exports = router;