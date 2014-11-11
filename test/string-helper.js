var stringModule = require('../lib/string-helper'),
    expect = require('chai').expect;

describe('String helper', function(){

  it('titleizes a string', function(){
    expect(stringModule.titleize('rick astley - song titles appear in titlecase'))
                            .to.equal('Rick Astley - Song Titles Appear In Titlecase');
  });

});