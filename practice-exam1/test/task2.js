var expect = require('chai').expect;

// GET /blogs/0 = 200
// GET /blogs/5 = 404
// GET /blogs/0 content =~ title
// GET /blogs/0 content =~ intro
// GET /blogs/0 content =~ author
// GET /blogs content =~ links to blogs

describe('Task two', function(){

  it('true', function(){
    expect(true).to.equal(true);
  });

});