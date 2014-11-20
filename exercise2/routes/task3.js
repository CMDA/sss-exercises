var express = require('express');
var router = express.Router();

/* GET / */
router.get('/', function(req, res) {
  res.render('task3');
});

// Title
router.get('/title', function(req, res) {
  res.render('task3/title', {
    title: "De title in een template"
  });
});


// Boolean
router.get('/boolean', function(req, res) {
  res.render('task3/boolean', {
    isBlogPost: true,
    title: "De title in een template"
  });
});

// Loop
var blogPosts = [
  {
    id: 1,
    title: 'Smart templates with Node.js',
    excerpt: 'In this blogpost we"ll cover how to create lean templates.',
    date: new Date('2014-11-26')
  },
  {
    id: 2,
    title: 'Loops in templates help to manage complexity',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    date: new Date('2014-11-05')
  },
  {
    id: 3,
    title: 'Node.js is fun, when you get the hang of it',
    excerpt: 'Dolorum sunt in labore dicta, ducimus accusantium? Praesentium eligendi accusantium tempora accusamus pariatur voluptatem ipsam nulla molestiae aspernatur!',
    date: new Date('2014-10-25')
  }
];

router.get('/loop', function(req, res) {
  res.render('task3/loop', {
    title: 'The latest blog posts',
    blogPosts: blogPosts
  });
});


module.exports = router;