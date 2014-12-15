var data = [{

}];

var Post = {
  all: function(){
    return data;
  },
  create: function(post){
    // return post object
    return data.push(post);
  }
};

module.export = Post;