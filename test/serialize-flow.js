var serializeFlow = require('../lib/serialize-flow'),
    expect = require('chai').expect,
    sinon = require('sinon');

describe('SerializeFlow', function(){

  it('executes an array of functions in serial sequencing', function(done){

    // Util function to wrap a function with a delay to simulate 
    // an asynchronous function
    var delayWithSpy = function(ms, spy){
      return function(callback){
        setTimeout(function(){
          spy();
          if(callback){
            callback();
          }
        }, ms);
      };
    };

    var spy1 = sinon.spy();
    var spy2 = sinon.spy();
    var spy3 = sinon.spy();

    var methods = {func0: delayWithSpy(10, spy1), func1: delayWithSpy(5, spy2), func2:  delayWithSpy(2, spy3)};

    var checkCalls = function(){
      // First spy is called before
      expect(spy1.calledBefore(spy2)).to.equal(true);
      expect(spy2.calledBefore(spy3)).to.equal(true);
      expect(spy3.calledAfter(spy2)).to.equal(true);

      // Lets mocha know we are done waiting
      done();
    };

    // Pass function we want to execute
    // and assertion checker as trailing method
    serializeFlow([methods.func0, methods.func1, methods.func2, checkCalls]);

  });

});