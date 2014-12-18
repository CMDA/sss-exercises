var expect = require('chai').expect;
var request = require('supertest');

var app = require(__dirname + "/../app");


// 1. GET /blogs = 200
// 2. GET /blogs content ~= expected content with titles

describe('Task one', function(){

  // is there a url /blog returning 200
  it('The / works', function(done){
    request(app)
      .get("/")
      .expect(200)
      .end(function(err, res){
        if (err) throw err;
        done();
      })
  });

});

