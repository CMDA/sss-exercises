var expect = require('chai').expect;

// GET /new 200
// POST {title : ""} / 200
// POST {title : ""} / req.locals.error
// POST {title : ""} / content contains error
// POST {title : "henk"} / 304 to "/"
// POST {title : "a", author: "b", intro: "c", body: "d"} / 304 to "/"
//

describe('Task three', function(){

  it('true', function(){
    expect(true).to.equal(true);
  });

});