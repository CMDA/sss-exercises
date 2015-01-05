var expect = require('chai').expect;
var request = require('supertest');

var data = require(__dirname + '/support/data');
var app = require(__dirname + '/../app');

// GET /blogs/0 = 200
// GET /blogs/5 = 404
// GET /blogs/0 content =~ title
// GET /blogs/0 content =~ intro
// GET /blogs/0 content =~ author
// GET /blogs content =~ links to blogs

describe('Task two', function(){

  it('1. /blogs/0 works', function(done){
    request(app)
      .get('/blogs/0')
      .expect(200, done);
  });

  // Issue: getting anything works but just gives no output
  it('1. /blogs/5 doesn\'t work', function(done){
    request(app)
      .get('/blogs/5')
      .end(function(err, res){
        expect(err).to.not.exist();
        expect(res.status).to.not.equal(200);
        done();
      });
  });

  it('2. /blogs/0 contains title', function(done){
    request(app)
      .get('/blogs/0')
      .end(function(err, res){
        expect(err).to.not.exist();
        expect(res.text).to.include(data.posts[0].title);
        expect(res.text).not.to.include(data.posts[1].title);
        done();
      });
  });

  it('2. /blogs/0 contains intro', function(done){
    request(app)
      .get('/blogs/0')
      .end(function(err, res){
        expect(err).to.not.exist();
        expect(res.text).to.include(data.posts[0].intro);
        expect(res.text).not.to.include(data.posts[1].intro);
        done();
      });

  });

  it('2. /blogs/0 contains author', function(done){
    request(app)
      .get('/blogs/0')
      .end(function(err, res){
        expect(err).to.not.exist();
        expect(res.text).to.include(data.posts[0].author);
        expect(res.text).not.to.include(data.posts[1].author);
        done();
      });
  });

  it('3. /blogs includes links', function(done){
    request(app)
      .get('/blogs')
      .expect(200)
      .end(function(err, res){
        expect(err).to.not.exist();
        for(var i = 0; i < data.posts.length; i++){
          expect(res.text).to.include('/blogs/' + i);
        }
        done();
      });
  });

});