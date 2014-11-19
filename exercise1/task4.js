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

// Load up the TermCounter module
var Stars = require('./lib/stars');
var fs = require('fs');

// Read the data-set
var repositories = JSON.parse(fs.readFileSync('./data/task4.json', 'utf8'));

// Create stars instance
var stars = Stars(repositories.items);

// Get top5 & average
var top5 = stars.top5();
var avg = stars.averageStars();

// Output data to console
console.log('\n# TOP 5');
top5.forEach(function(repo, index){
  console.log('%d. %s (★ %d)', index + 1, repo.name, repo.stargazers_count); /* jshint ignore:line */
});

console.log('--------------------------------');
console.log('# Average ★', avg, '\n');