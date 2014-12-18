# Server-side scripting in node.js -- Exercise 5

Practice exercises for the [sss-course](https://github.com/CMDA/sss-course).

## Overview
In this exercise we will work with further with login for a user, making our application work for multiple users. We will store user in the database and work with some basic models to programming our data interface.

## Before you start
* [Download this exercise](http://cl.ly/1e1s2K1n2l2o)
* Run ```$ npm install``` to install the dependencies. 
* Read the exercises, review the slides of [last lecture](http://cmda.github.io/sss-course/lesson5).
* _It is advisable to type all code by hand_, and not to copy-paste the examples. By typing them by hand, helps you reason about every single line and makes it comprehensible. 

### Reading list
* [Node. js in Action, Cantelon, Mike, et al. - Manning Publications, 2014](http://www.manning.com/cantelon/)
    -  Boek: 5.2 t/m 5.2.1 (pagina 102 t/m 110)
*  http://www.mysqltutorial.org
    -  [MySQL SELECT](http://www.mysqltutorial.org/mysql-select-statement-query-data.aspx)
    -  [MySQL INNER JOIN](http://www.mysqltutorial.org/mysql-inner-join.aspx)
    -  [MySQL LEFT JOIN](http://www.mysqltutorial.org/mysql-left-join.aspx)
    -  [MySQL INSERT](http://www.mysqltutorial.org/mysql-insert-statement.aspx)
    -  [MySQL UPDATE](http://www.mysqltutorial.org/mysql-update-data.aspx)
    -  [MySQL DELETE](http://www.mysqltutorial.org/mysql-delete-statement.aspx)

## Task 1
We have taken the end result of _exercise 3_. In exercise 3 we worked with user authentication, however we only supported one user right now. By means of a database we will be able to authenticate multiple users.

1. Use the SQL file to create the [initial tables with data](http://cmda.github.io/sss-course/lesson5#/3/6), you can find this file in the ```data/``` directory. 
2. Add the dependencies of mysql to this project. [This weeks lecture](http://cmda.github.io/sss-course/lesson5#/6) helps you out with the basics.
3. Display the list of all users in the database on ``` [GET] /users ```, when a user is logged in.
4. Now update the ```[POST] /users/login``` route so that the users in our database are able to log in.

### Extra task
1. Create a sign up form where a new user can create an account.