var expect = require('chai').expect; /* jshint ignore:line */
var request = require('supertest');

var app = require(__dirname + '/../app');

app.get('/store', function(req, res){
  res.json(req.locals.store);
});

// GET /new 200
// POST {title : ""} / 200
// POST {title : ""} / req.locals.error
// POST {title : ""} / content contains error
// POST {title : "henk"} / 304 to "/"
// POST {title : "a", author: "b", intro: "c", body: "d"} / 304 to "/"
//

describe('Task three', function(){
  var getStore = function(callback){
    request(app)
      .get('/store')
      .end(function(err, res){
        var store = JSON.parse(res.text);
        callback(err, store);
      });
  };

  it('1. [GET] Blog route works', function(done){
    request(app)
      .get('/blogs/new')
      .expect(200, done);
  });

  it('3. [POST] Save blog with all attributes', function(done){
    var postData = {title : 'a', author: 'b', intro: 'c', body: 'd'};
    request(app)
      .post('/blogs')
      .type("form")
      .send(postData)
      .expect(302)
      .end(function(err){
        expect(err).to.not.exist();
        getStore(function(err, store){
          expect(err).to.not.exist();
          expect(store.posts).to.include(postData);
          done();
        });
      });
  });

  it('4. [POST] Redirect after post', function(done){
    var postData = {title : 'a', author: 'b', intro: 'c', body: 'd'};
    request(app)
      .post('/blogs')
      .type("form")
      .send(postData)
      .expect(302, done);
  });


  it('5. [POST] Blog with invalid data is not added to store', function(done){
    var postData = {title : '', author: 'NOT'};

    request(app)
      .post('/blogs')
      .type("form")
      .send(postData)
      .expect(200)
      .end(function(err){
        expect(err).to.not.exist();
        getStore(function(err, store){
          expect(err).to.not.exist();
          expect(store.posts).to.not.include(postData);
          done();
        });
      });
  });

  it('6. [POST] #create blog with invalid data renders an error', function(done){
    var postData = {title : '', author: 'NOT'};

    request(app)
      .post('/blogs')
      .type("form")
      .send(postData)
      .end(function(err, res){
        expect(err).to.not.exist();
        expect(res.text).to.include('Error');
        done();
      });
  });

});