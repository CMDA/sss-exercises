# Server-side scripting in node.js -- Exercise 3

Practice exercises for the [sss-course](https://github.com/CMDA/sss-course).

## Overview
In this exercise we will work with login for a user. We will work with sessions to see if a user is logged in. 

## Before you start
* [Download this exercise](http://cl.ly/0u3W0D3k0d07)
* Run ```$ npm install``` to install the dependencies. 
* Read the exercises, review the slides of [last lecture](http://cmda.github.io/sss-course/lesson3).
* _It is advisable to type all code by hand_, and not to copy-paste the examples. By typing them by hand, helps you reason about every single line and makes it comprehensible. 

### Reading list
* [Node. js in Action, Cantelon, Mike, et al. - Manning Publications, 2014](http://www.manning.com/cantelon/)
    - Hoofdstuk 4.1, 4.2 en 4.4 (p. 71 t/m 80 & p. 87 t/m 94);
    - Hoofdstuk 11.1 en 11.2 (p. 264 t/m 275);
    - Manage session using Node.js and Express 4; http://codeforgeek.com/2014/09/manage-session-using-node-js-express-4/

## Task 1
In this task we'll create a log on form. And will display a message if the user is logged in. You can use the [lecture slides](http://cmda.github.io/sss-course/lesson3#/6/9) for code examples.

1. Start the application with ```node app.js```.
2. Create a router with routes for the followings paths, let the routers for the moment return the path they respond to:
    - ``` [GET] /users ```
    - ``` [GET] /users/login ```
    - ``` [POST] /users/login ```
    - Load this router in your app.
3. Lets set up the root of this router (```/users```), make sure this route; a) checks if the username is set in the session, and b) otherwise redirects to the login form that will be created in step 4.
4. Create a template for the form and add rendering so that the form is displayed when you open [localhost:3000/users/login](http://localhost:3000/users/login).
5. Create the POST route ``` router.post("/login", fn) ``` in ```routes/users.js```. Now verify that the form values are correct and set the username in the session. Finally redirect the user to the [localhost:3000/users](localhost:3000/users)
6. Now you see the username printed out on [localhost:3000/users](localhost:3000/users).

### Answer
I start by adding the routes for the user router (controller). For this I create a router in the ```/routes``` directory. To this router I add the following routes. 
```javascript
// routes/users.js
var express = require('express');
var router = express.Router();

// [GET] /users
router.get("/", function(req, res){
    res.send('[GET] /users');
});

// [GET] /users/login
router.get('/login', function(req, res){
    res.send('[GET] /users/login');
});

// [POST] /users/login
router.post('/login', function(req, res){
    res.send('[POST] /users/login');
});

module.exports = router;
```

I use ```res.send``` to debug my routes, and see they respond as I would expect. When trying out this code, you'll find that this won't work yet. We still have to connect, or _mount_ in more technical terms, to our application. We do this by adding the following code to our ```app.js```.

```javascript
// Including routes
var userRoutes = require('./routes/users');

app.use('/users', userRoutes);
```

Now visiting [localhost:3000/users](http://localhost:3000/users) and the browser will display: _'[GET] /users'_. This router has two responsibilities, 1) if the user is logged in, it will display its name, and otherwise 2) displays a form where the user can login. We can verify if the user is logged in, by checking if the username is stored in the session. The session can be accessed by the ```req``` object. More specifically we check the username in the session by using ```if(req.session.username)```. If this is not true we redirect the user with ```res.redirect('/users/login')```. Making our route look something around the lines of:
```javascript
// routes/users.js
// more code....

// [GET] users/login
router.get("/", function(req, res){
  if(req.session.username){
    res.send("Welcome, " + req.session.username);
  } else {
    // Redirect the user here
    res.redirect("/users/login");
  }
});

// the other two routes...
```

When we try accessing [localhost:3000/users](http://localhost:3000/users) we are redirected to [localhost:3000/users/login](http://localhost:3000/users/login) and we should see _'[GET] /users/login'_. We must make a template with a login form and render this template. We create a template with the following HTML in ```views/users/login.ejs```. 

```ejs
<!-- views/users/login.ejs -->
<form action="/users/login" method="post">
  <label for="field_username">Username: </label>
  <input type="text" id="field_username" name="username" value="">

  <label for="field_password">Password: </label>
  <input type="text" id="field_password" name="password" value="">

  <button type="submit">Login!</button>
</form>
```

And we render this template by replacing ```res.send('[GET] /users/login');```, with ```res.render('users/login')```. 

```
// [GET] /users/login
router.get('/login', function(req, res){
  res.render('users/login');
});

```

Filling in this form will show _'[POST] /users/login'_. To make some sense of the posted data from the form, we use the [body parser ]() package. We install it with npm: ```npm install --save body-parser```. And add it to our application, by adding the following lines to app.js. 

```
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
```

**N.b.** Pay attention to where you add these lines, in general they should be added after you initialize the application. And before you define your routers and routes.

To test if everything worked we let ```[POST] /users/login``` return the username. By modifing the route with:
```
// [POST] users/login
router.post('/login', function(req, res){
  var username = req.body.username;
  res.send('Gebruikersnaam is:' + username);
});
```

When this works we complete the logic this route
```
// [POST] users/login
router.post('/login', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  if(username === 'admin' &&
     password === '1234'){
    req.session.username = username;
    res.redirect('/users');
  } else {
    res.send('Wachtwoord of gebruikersnaam is niet juist');
  }
});
```

Visiting [localhost:3000/users](http://localhost:3000/users), should now show us the login form. Logging in with username: 'admin' and password: '1234'. Should now log us in. While there are some issues such that the user cannot yet log out and doesn't support multiple user (we will on this in exercise 5), we have some basic login functionality.

## Wrapping up
As we have an exam this week the exercise is rather short. We have used the concept of previous week to connect URLs to our application code with a router and used form's to post user data.
