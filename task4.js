//  ===================================
//  = Serverside scripting in node.js =
//  ===================================

//                                    .__                 ____ 
//   ____ ___  ___ ___________   ____ |__| ______ ____   /_   |
// _/ __ \\  \/  // __ \_  __ \_/ ___\|  |/  ___// __ \   |   |
// \  ___/ >    <\  ___/|  | \/\  \___|  |\___ \\  ___/   |   |
//  \___  >__/\_ \\___  >__|    \___  >__/____  >\___  >  |___|
//      \/      \/    \/            \/        \/     \/        

//  ==========
//  = Task 4 =
//  ==========
//  Working with asynchronous code
var serializeFlow = require('./lib/serialize-flow');

var func1 = function(callback){
  setTimeout(function(){
    console.log("Func1 done");
    if(callback){
      callback();
    }
  }, 200);
};

var func2 = function(callback){
  setTimeout(function(){
    console.log("Func2 done");
    if(callback){
      callback();
    }
  }, 20);
};

var func3 = function(callback){
  setTimeout(function(){
    console.log("Func3 done");
    if(callback){
      callback();
    }
  }, 2);
};


// Console should read:
// => Func1 done
// => Func2 done
// => Func3 done
// 
serializeFlow([func1, func2, func3]);

