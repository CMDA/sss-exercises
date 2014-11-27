# Server-side scripting in node.js -- Exercise 2

Practice exercises for the [sss-course](https://github.com/CMDA/sss-course).

## Overview
This exercise will help you understand:
* the structure of a express application,
* how routers work and how extra paths can be created,
* the benefits and how to use templates,
* the way external data can be retrieved and rendered.

## Before you start
* [Download the exercises](http://cl.ly/3l0r160k1k0P)
* Read this exercise
* Install the dependencies, ```npm install```.
* _It is advisable to type all code by hand_, and not to copy-paste the examples. By typing them by hand, helps you reason about every single line and makes it comprehensible. 

### Reading list
* [Node. js in Action, Cantelon, Mike, et al. - Manning Publications, 2014](http://www.manning.com/cantelon/)
  * Hoodstuk 3.2, t/m 3.4 (p 46 t/m 67)
  * Hoodstuk 8, t/m 8.3 (p 176 t/m 193), minder relevant: "view caching"

## Task 1
In this course, [Express.js](http://expressjs.com/) will be used as framework. This framework offers an lean and accessible way of working with Node.js. In this task you will get familiar with basic structure of an Express application.

1. Start the server with ```node app.js```
2. Open [http://localhost:3000](http://localhost:3000) in your browser, this will display the list of tasks. 
  * Read [#Explaining app.js](#explaining-app.js) 
3. Add a image to the ```public/images``` directory in the public folder. You can find a example image in the ```data``` directory.
4. Point your browser to ```http://localhost:3000/images/your-filename```, is the image served?
5. The rest of the concepts such as templates and routes will be discussed in more depth in the next tasks.

### Explaining app.js
```
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
├── routes
│   ├── index.js
├── views
│   └── index.ejs
├── app.js
└── package.json
```

#### The public folder and serving static content
```
// Setup serving static assets
app.use(express.static('public'));
```

The public folder is used for storing content that isn't generated, also called static content, e.g. images, (client-side) Javascript and stylesheets. But static files can also include user uploaded files. Serving these assets is handled by [express.static](http://expressjs.com/guide/using-middleware.html#express.static). 

#### Setting the views engine
Next to configuring where the static assets can be found, we have to tell Express where it can find these templates and which type of templates(view engine). In our case we use the common convention to put them in the ```./views``` directory and our view engine (the type) is EJS. We define this with the following lines of code:

```
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
```

#### Routes
The application has currently 1 route, serving a index page on ```http://localhost:3000/```. You can play around with this route to understand how it works (see lecture slides).

```
app.get('/', function(req, res) {
  res.render('index', {title: 'Server-side Scripting - Exercise 2'});
});
```


#### Starting this server
So far we configured the server, the last thing we have to do is to start it. We do this with the ```.listen(port, callback)```, the documentation of this method can be found at: [http://expressjs.com/api.html#app.listen](http://expressjs.com/api.html#app.listen). Also other Express related information can be found here.
```
// Start the server
var server = app.listen(3000, function(){
  console.log('App listening at http://localhost:3000');
});
```


## Task 2
The task of the routers is to translate an incoming request, to specific code of your application. In express a route can be another ```Router``` object or a ```function```. In this exercise we'll experiment with both of them.

1. So far our application only has one route. 
2. If your server isn't running anymore ```node app.js```.
2. Thus, opening [http://localhost:3000/task2](http://localhost:3000/task2) in your browser. Will give a 404 error. Lets change that. 
3. There are two ways a route can be defined, we will discuss both of them. It is however important to understand that a route connects an URL to your code and defines the action that your application code will be executing when the route is requested. 
4. Read 'Route as function'.
5. Remember to restart the server (```node app.js```) when you've made any changes to the code. 
5. Can you make the url [http://localhost:3000/task2](http://localhost:3000/task2) work?
6. Read 'Route as Router'.
6. Can you make the url [http://localhost:3000/task2/sub-route](http://localhost:3000/task2/sub-route), using ```app.use(task2Router)```, work?

### Route as ```function```
Say you want to route the url ```/task2```, you can declare this route by using [app.get(path, fn)](http://expressjs.com/4x/api.html#router.METHOD). 

```
var task2 = require('./routes/task2');
app.get('/task2', task2);
```

You can then define the route as following. 
```
module.exports = function(req, res){
  res.send('Task 2');
};
```

This function get exectuted when ```http://localhost:3000/task``` is requested.
and its functionality is equal to:

```
var task2 = function(req, res){
  res.send('Task 2');
};

module.exports = task2;
```


### Route as ```Router()```
When you have more complex routes, ```Router()``` can help out structuring you code. The top level ```app``` object also acts as router, and conceptually a Router can be seen as a collection of routes. On [http://expressjs.com/4x/api.html#router](http://expressjs.com/4x/api.html#router) you can find additional resource on how to code your router. 

```
// routes/task2.js
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.send('This is task2')
});

router.get('/sub-route', function(req, res){
  res.send('This is a sub-route of task2, and is served @localhost:3000/task2/sub-route');
});

module.exports = router;
```

In the app.js you declare the ```router``` with the following code:
```
var task2Router = require('./routes/task2');
app.use('/task2', task2Router);
```


### Named params and query strings
With named params and query string you can make smart routes and render content depending on the values. The difference between these is that a param is required for you application, typically query string are optional. An example is a blogpost ID, without ID you can't display a blogpost, because you don't know which one. 

#### Query strings
* Query strings are composed as a series of key-values pair ```key=value```
* The key and value are seperated by ```=```.
* The query params are defined after the ```?``` in the URL.
* Each key-value pair can be seperated with ```&```

```
router.get('/', function(req, res){
  var name = req.query.name;
  res.send('Greeting,' + name);
});
```

#### Named parameters
```
// somewhere in routes/task2.js
// ...
router.get('/sub-route/:name', function(req, res){
  var name = req.params.name;
  res.send('Greeting,' + name);
});
// ...
```


## Task 3
To prevent that you have to use HTML tags in your code you can use templates to render this and to display your data. 
For task3 we created a router, so that you can play with some templates. 

1. Open ```routes/task3.js```
1. First we need to load a router like we did in task 2, point 5. We already created a router for this purpose, but you have to load it. You'll find the router in ```routes/task3.js``` Use ```require``` and ```app.use('/task3', task3)```. 
2. What happens if you change the title in the ```routes/task3.js``` and refesh the page? Now restart the application server with ```node app.js```, did you title change now?
3. Can you put the title in a nice ```<h1>```? Do you have to restart the server to pick up these changes?
2. Now add your own template for the boolean route, can you add a subtitle when the isBlogPost variable is true? See the [slides of lecture 2](http://cmda.github.io/sss-course/lesson2#/6/5)
3. Can you make render a list in the `localhost:3000/task3/loops` route. 


### On the task 3 router
```
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
    ... data ...
  }
];

router.get('/loops', function(req, res) {
  res.render('task3/loops', {
    title: 'The latest blog posts',
    blogPosts: blogPosts
  });
});


module.exports = router;
```

When you attach this router to you app with the following code ```app.use('/task3', task3);```. It will response to the following paths, ```http://localhost:3000/task3/title```, ```http://localhost:3000/task3/boolean```, ```http://localhost:3000/task3/loop```. 


## Task 4
External data, often referred to as (web) API's, REST service. These service can provide an easy way to provide a certain functionality in your application. Which otherwise may cost much effort to implement yourself. In this task, we will build a sample weather display. We will use a module called [request](https://github.com/request/request). This module is quite sophisticated, and offers more functionality we will need for now. However this module makes it easier to work with requests to external HTTP sources. As data source we will make use of [openweathermap.org](//:openweathermap.org), e.g. ```http://api.openweathermap.org/data/2.5/weather?q=Amsterdam,nl```. When we received the data, we will use a template to make this data more readable then the returned JSON.

1. Lets first see what happens if we visit request ```http://api.openweathermap.org/data/2.5/weather?q=Amsterdam,nl``` in a browser. And ```http://api.openweathermap.org/data/2.5/weather?q=London,uk```. As you'll see, these URL's return the weather for Amsterdam and London ```q=Amsterdam,nl```. 
2. We've created a router for this task, you can find this one in ```routes/task4.js```. Lets add this route to ```app.js```. *N.b.* Every time you change your code you have to restart the server.
3. Point your browser to [http://localhost:3000/task4](http://localhost:3000/task4). You should now see a title, saying "Het weer vandaag".
4. Basicly there are two thing left now; retrieving the data and displaying it. 
5. We first have to retrieved the data from the URL (pick a city you like). This can be done by the request example given below. Request by default returns the body as a *string-type*. For our use case this isn't very practical, as we cannot read this easily in our template. We create a nice object from the return data with ```JSON.parse(body)```.
6. We can now pass this object to our template and display our data. 

Note: in the returned data-set the temperature is in [Kelvin](http://en.wikipedia.org/wiki/Kelvin), can you calculate this in Celcius?

### Request example
```
var request = require("request");
var url = "http://api.openweathermap.org/data/2.5/weather?q=Amsterdam,nl";
request(url, function(error, response, body){
  if (!error && response.statusCode == 200) {
    console.log(body) // Print the weather.
  }
});
```

### ... when you're done
Can you make [http://localhost:3000/task4/:location](http://localhost:3000/task4/:location) work dynamic? Meaning you load the city that is specified in the ```:location``` named param?