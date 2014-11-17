var http = require('http'),
    chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    server = require('../lib/server');

describe('Server', function(){

  // start server
  server();
  
  it("should running on 3000 and return statuscode 200", function(done) {
    http.get("http://127.0.0.1:3000", function(res) {
      expect(res.statusCode).to.equal(200);
      done();
    }).on('error', function(){
      done(new Error('Server not running or returning statuscode 200'));
    });
  });

  it('should running on 3000 and it should return greeting with "Hello World!"', function(done){
    var body = '';
    
    http.get('http://127.0.0.1:3000', function(res){
      res.on('data', function(responseData){
        body += responseData;
      });

      res.on('end', function(){
        expect(body).to.equal('Hello World!');
        done();
      });
    }).on('error', function(){
      done(new Error('Server not responding with "Hello World!" or not running on 3000'));
    });
  });

});