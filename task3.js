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
//  = Task 3 =
//  ==========
//  Creating a module
try{
  var myStringModule = require('./lib/string-helper');

  console.log(myStringModule.titleize("give me titlecase"));
  // kick of test
} catch(e){
  console.log("Create your module at ./lib/string-helper");
}
