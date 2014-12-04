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

## Wrapping up
As we have an exam this week the exercise is rather short. We have used the concept of previous week to connect URL to our application code with 
