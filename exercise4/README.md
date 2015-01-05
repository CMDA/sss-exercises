# Server-side scripting in node.js -- Exercise 4

Practice exercises for the [sss-course](https://github.com/CMDA/sss-course).

## Overview
In this exercise we will work with middleware, and will use authentication  with user login. And we will an upload form for files.

## Before you start
* [Download this exercise](http://cl.ly/1z0Q373i1Q0R)
* Run ```$ npm install``` in the exercise directory to install the dependencies. 
* Read the exercises, review the slides of [last lecture](http://cmda.github.io/sss-course/lesson4).
* _It is advisable to type all code by hand_, and not to copy-paste the examples. By typing them by hand, helps you reason about every single line and makes it comprehensible. 

### Reading list
* [Node. js in Action, Cantelon, Mike, et al. - Manning Publications, 2014](http://www.manning.com/cantelon/)
    - Express.js Middleware Demystified; https://blog.safaribooksonline.com/2014/03/10/express-js-middleware-demystified/

## Task 1
We already worked with middleware before; while working with public assets. In our app.js we use [serve static](https://github.com/expressjs/serve-static) assets. 

1. Read the source of this middleware function on [https://github.com/expressjs/serve-static/blob/1f28cca9654462661a4112f43eb6ddac2f4910ef/index.js](https://github.com/expressjs/serve-static/blob/1f28cca9654462661a4112f43eb6ddac2f4910ef/index.js). Can you determine which code is execute about when ```app.use(express.static('public'));``` is used, which parts of that code is used on initialisation and what on request?
2. Create a middleware handle that shows the requested url and the request type on each request in the terminal. Tip: ```req.method``` and ```req.url``` can be used to see the request method and url. Now when you make a request to your application, you should see a log entry in your terminal.


### Answer

At *1.1* we wanted to show that the code we used for serving static assets
is already middleware. On [L:57](https://github.com/expressjs/serve-static/blob/1f28cca9654462661a4112f43eb6ddac2f4910ef/index.js#L57) you see `function serveStatic(req, res, next) ` which is used by `app.use`, and executed as all other middleware.

The middleware logger that shows use the requested url and request type, would look like:

```libs/middleware/logger.js
// Request logger
module.exports = function(req, res, next){
  // Grab request type and url
  var method = '['+ req.method + ']';
  var url = req.url;

  // Write log message to terminal
  console.log(method + ' on: ' + url);
  
  // Continue execution
  next();
});
```

We include this in app.js with:

```app.js
var logger = require('./lib/middleware/logger');
app.use(logger);
```

Place this code before your first router. Otherwise it may not be executed on all routes.

## Task 2
For the next exercise we will create an authentication middleware that we can use application wide to make sure we have a logged in user. This is much based on the exercise of previous week.

1. Let's make sure the user can authenticate him- or herself by going to the [http://localhost:3000/users/login] page. When not logged in this page should display a form, where the user can input his name and password. When authentication is successful, the user gets redirected to the homepage. 
2. Add the functionality such that the user can logout.
3. Create two routes, one ```/secret``` and another ```/promotion```. 
4. Make sure that the ```/secret``` can only be accessed by those users that are logged in.
5. Is [localhost:3000/promotion](http://localhost:3000/promotion) still working for all users?


### Answer
We've taken the code from exercise3, and added a `routes/users`, and `views/users`. 

For logout functionality; use the following code. What we do it we delete the username for the session object.

```
// [GET] /users/logout
router.get('/logout', function(req, res){
  delete req.session.username;
  res.redirect(req.baseUrl + '/');
});
```


In the ```app.get('/', ..```, add a quick check to see if we have a user.

```
// app.js
// ... code
// [GET] /
app.get('/', function(req, res) {
  var user = false;
  // Check for logged in user
  if (req.session.username){
    user = req.session.username;
  }

  res.render('index', {
    title: 'SSS - Exercise 4',
    user: user
  });
});
// ... 
```

I continue by updating the application index with 2 links and some boolean logic to see if the user is logged in.

```views/index
<h1><%= title %></h1>

<ul>
  <li><a href="/secret">secret</a></li>
  <li><a href="/promotion">promotion</a></li>
</ul>

<% if(user){ %>
  <p>Welkom <%= user %> <a href="/users/logout">(logout)</a></p>
<% } else { %>
  <p><a href="/users/login">login</a></p>
<% }%>
```

Now that we have a link to `/secret` and `/promotion`, lets make two routes for that. Use the following code for that, and add it after the other routes, but before the `app.listen` method call. This way we can separate the secret route, by making use of a middleware we can control access for multiple routes. We can do quite [powerfull actions](http://cmda.github.io/sss-course/lesson4#/5/8) with middleware, saving you from coding and thus bugs. 

```
// app.js
// ... 
// Make promotion
app.get('/promotion', function(req, res){
  res.send("Buy our latest products");
});


// A routes and middleware below this are only
// accessable when the req.session.username is set
app.use(function(req, res, next){
  if (req.session.username){
    next();
  }
  else {
    res.send('Access denied');
  }
});

//  ================
//  = Secret routes =
//  ================
app.get('/secret', function(req, res){
  res.send("We only give very high discounts for logged in users");
});

app.get('/secret2', function(req, res){
  res.send("More discounts");
});
// ... 
```


## Task 3
Often an application has support for user uploads, and shows these uploads in a list. Before creating any code, think about the structure of your application. Create a dedicated folder for your uploads. How much routes are required for this functionality?

1. Create the routes and forms for file uploading
2. Add the form handling for the file upload
3. Make an overview of the files uploaded, with a list and by reading of the [filesystem](http://nodejs.org/api/fs.html).

### Answer
For this functionality we need 3 routes, 1st to display all uploads, a 2nd for an upload form and a 3rd posting the form. It is arguable that you would need a 4th route to display the upload itself. But we will save them in the public directory, where they will be served by the static middleware we also use for css/js. Its depending of the requirements if this is suitable for your application, e.g. should everybody access? If that is a yes, the public directory is fine. We build the basic routing with the following code:

```
// routes/uploads.js
// [GET] /uploads
router.get('/', function(req, res){
    res.send('uploads will come here');
});

// [GET] /uploads/new
router.get('/new', function(req, res){
});

// [POST] /uploads
router.get('/', function(req, res){
});
```

And attaching them to the app with:

```
// app.js
// ...
var uploadRoutes = require('./routes/uploads');
app.use('/uploads', uploadRoutes);
// ...
```

Create an template for the upload form

```
<!-- views/uploads/form.ejs -->
<form action="/uploads/" method="post" enctype="multipart/form-data">
  <input type="file" name="imageFile" value="">
  <button>Upload!</button>
</form>
```

The `action` and `post` attributes we've already seen with regular forms. The `enctype` is required for [uploading files](http://stackoverflow.com/questions/4526273/what-does-enctype-multipart-form-data-mean). Next to the `enctype`, we need a parser to make sure node.js understand these types of forms. For this we use `multer`:

```
$ npm install multer --save
```

And add it to the app.js

```
var multer = require('multer');
app.use(multer({dest: __dirname + '/public/uploads' }));
```

With `multer` files are available in `req.files.upload` in the `[POST]`. Make sure the template is rendered, and add the following code inside the `[POST]` route. Make sure you don't forget to `require('fs')`, this is needed to rename the file back to its original name, uploading gives it a temporary name. 

```
// [POST] /uploads
router.post('/', function(req, res){
  // File path
  var filesPath = __dirname + '/../public/uploads/';
  var upload = req.files.imageFile;

  fs.rename(upload.path, filesPath + upload.originalname, function(err){
    if(err){
      res.send('Something went wrong!');
    } else {
      res.redirect(req.baseUrl + '/');
    }
  });
});
```

When everything is correct you can upload a new image on [/uploads/new](http://localhost:3000/uploads/new). It should be uploaded in `public/uploads`. 

Now we have to make the index route. We will use the file system, `fs`. To prevent duplication, move the `var filesPath = ... ` above `index` route. In the `index` route, we will get all files from the `filesPath` and render this to our template. The `files` variable will be an array of all our uploads.

```
// [GET] /uploads
router.get('/', function(req, res){
  fs.readdir(filesPath, function(err, files){
    if(err){
      res.send('Cannot access directory');
    }
    res.render('uploads/index',{
      files: files
    });
  });
});
```

With the following template we can now display the images.

```
<h1>Uploads</h1>
<% files.forEach(function(file){ %>
  <li><img src="<%= "/public/uploads/" + file %>"></li>
<% }) %>
```

