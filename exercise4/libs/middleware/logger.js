// Request logger
module.exports = function(req, res, next){
  // Grab request type and url
  var method = '['+ req.method + ']';
  var url = req.url;

  // Write log message to terminal
  console.log(method + ' on: ' + url);

  // Continue execution
  next();
};