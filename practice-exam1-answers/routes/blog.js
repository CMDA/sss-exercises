var express = require('express');
var router = express.Router();

router.get("/", function(req, res){
  res.render("index", {title: "title", posts: req.locals.store.posts});
});

router.post("/", function(req, res){
  if(req.body.title != ""){
    req.locals.store.posts.push({
      title: req.body.title,
      author: req.body.author,
      intro: req.body.intro,
      body: req.body.body
    });
    res.redirect(req.baseUrl + "/");
  } else {
    res.locals.error = "foutje!";
    res.render("new", {req: req})
  }

});

router.get("/new", function(req, res){
  res.render("new", {req: req});
});

router.get("/:index", function(req, res){
  var post = req.locals.store.posts[req.params.index]
  if(post){
    res.render("show", {post: post});
  } else {
    res.status(404).send("not found");
  }

});


module.exports = router;