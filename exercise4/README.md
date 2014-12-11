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


## Task 2
For the next exercise we will create an authentication middleware that we can use application wide to make sure we have a logged in user. This is much based on the exercise of previous week.

1. Let's make sure the user can authenticate him- or herself by going to the [http://localhost:3000/login] page. When not logged in this page should display a form, where the user can input his name and password. When authentication is successful, the user gets redirected to the homepage. 
2. Add the functionality such that the user can logout.
3. Create two routes, one ```/secret``` and another ```/promotion```. 
4. Make sure that the ```/secret``` can only be accessed by those users that are logged in.
5. Is [localhost:3000/promotion](http://localhost:3000/promotion) still working for all users?


## Task 3
Often an application has support for user uploads, and shows these uploads in a list. Before creating any code, think about the structure of your application. Take dedicated folder for uploads. How much routes are required for this functionality?

1. Create the routes and forms for file uploading
2. Add the form handling for the file upload
3. Make an overview of the files uploaded, with a list and by reading for the [filesystem](http://nodejs.org/api/fs.html).

