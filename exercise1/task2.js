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
//  = Task 2 =
//  ==========
//  Working with variables
var calculator = require('./lib/calculator');

console.log('The sum of 2 and 3 is:', calculator.sum(2,3));
console.log('Multiplying 4 with 5 is:', calculator.multiply(4, 5));
