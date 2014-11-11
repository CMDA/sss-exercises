var http = require('http'),
    expect = require('chai').expect,
    server = require('../lib/server');

describe('Server', function(){

  // start server
  server();
  
  it('runs on 127.0.0.1:3000, greeting with "Hello World!"', function(done){
    var body = '', failed;
    
    http.get('http://127.0.0.1:3000', function(res){
      res.on('data', function(responseData){
        body += responseData;
      });

      res.on('end', function(){
        expect(body).to.equal('Hello World!');
        done();
      });
    }).on('error', function(){
      // Works for now, but could use some love
      // Mainly it makes sure it doesnt fail twice, when the error event
      // is triggered twice.
      if(!failed){
        failed = true;
        expect(false).to.equal(true);
      }
      done();
    });
  });

});