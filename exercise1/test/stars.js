var Stars = require('../lib/stars'),
    expect = require('chai').expect;

describe('Repository stars', function(){
  var repos = [
      {'name': 'lib0', 'stargazers_count': 245},
      {'name': 'lib1', 'stargazers_count': 368},
      {'name': 'lib2', 'stargazers_count': 10},
      {'name': 'lib3', 'stargazers_count': 17},
      {'name': 'lib4', 'stargazers_count': 201},
      {'name': 'lib5', 'stargazers_count': 78}
    ];

  it('creates a top 5', function(){
    var stars = Stars(repos);
    expect(stars.top5().length).to.equal(5);
    expect(stars.top5()).to.deep.equal([
      {'name': 'lib1', 'stargazers_count': 368},
      {'name': 'lib0', 'stargazers_count': 245},
      {'name': 'lib4', 'stargazers_count': 201},
      {'name': 'lib5', 'stargazers_count': 78},
      {'name': 'lib3', 'stargazers_count': 17}
    ]);
  });

  it('calculates an average', function(){
    var stars = Stars([
      {'name': 'lib4', 'stargazers_count': 10},
      {'name': 'lib5', 'stargazers_count': 10}
    ]);
    expect(stars.averageStars()).to.equal(10);
  });

});