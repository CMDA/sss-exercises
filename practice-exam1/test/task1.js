var expect = require('chai').expect;
var request = require('supertest');

var data = require(__dirname + '/support/data');
var app = require(__dirname + '/../app');

describe('Task one', function(){

  // is there a url /blog returning 200
  it('The / works', function(done){
    request(app)
      .get('/')
      .expect(200)
      .end(function(err){
        if (err){
          throw err;
        }
        done();
      });
  });

  it('2. /blogs works', function(done){
    request(app)
      .get('/blogs')
      .expect(200, done);
  });

  it('3. /blogs contains titles', function(done){
    request(app)
      .get('/blogs')
      .end(function(err, res){
        if (err){
          throw err;
        }
        data.posts.forEach(function(post){
          expect(res.text).to.include(post.title);
        });
        done();
      });
  });

});

