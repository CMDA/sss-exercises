var serializeFlow = function(funcs){
  // Asynchronous flow is messed up
  funcs.forEach(function(func){
    func();
  });

};

module.exports = serializeFlow;
