var calculator = require('../lib/calculator'),
    expect = require('chai').expect;

describe('Calculator', function(){

  it('sums two values', function(){
    expect(calculator.sum(-2, 4)).to.equal(2);
  });

  it('multiplies two values', function(){
    expect(calculator.multiply(4, 5)).to.equal(20);
  });

});