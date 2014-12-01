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
6. Can you make the url [http://localhost:3000/task2/sub-route](http://localhost:3000/task2/sub-route), using ```app.use('/task2', task2Router)```, work?

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


### Answer
Using routes we can connect URL's to our application and in specific to some part of our code that we execute once a request comes in. The answers where already given in the explanation on _Route as ..._. It's however important to note and understand that a good structure helps organising your code and logic.

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

### Answer
To ```app.js```  we add the following code:

```
var task3Routes = require('./routes/task3');
app.use('/task3', task3Routes)
```

Make sure, that you add this code before you start the server, with the listen method like: ``` var server = app.listen(3000, fn)```.

#### title.ejs
```
<%= title %>
```

#### boolean.ejs
```
<h1>
  <% if(isBlogPost){ %><small>Blogpost:</small><% } %>
  <%= title %>
</h1>
```

#### loop.ejs
There was a small error in the view for task3, hence redirecting you to ```localhost:3000/task3/loops``` instead of ```localhost:3000/task3/loop```. :( 
Mea culpa.

```
<h1><%= title %></h1>

<% blogPosts.forEach(function(post){ %>
  <h2><%= post.title %></h2>
  <p><%= post.excerpt %></p>
<% }) %>
```


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

### Answer
When starting ```node app.js```, we see that we do not serve [http://localhost:3000/task4](http://localhost:3000/task4). We make this work by adding 
```
var task4Routes = require('./routes/task4');
app.use('/task4', task4Routes);
```
to ```app.js```. We add this before the ```.listen``` call. Restarting the server and visiting [http://localhost:3000/task4](http://localhost:3000/task4) will then yield, a title saying: "Het weer vandaag". A simple ```request``` looks like:
```
  var url = "http://api.openweathermap.org/data/2.5/weather?q=Amsterdam,nl";
  request.get(url, function(err, response, body){
    var weather = JSON.parse(body);
    res.render('task4', {title: 'Het weer vandaag', weather: weather});
  });
```
You must add this inside the route function in ```./routes/task4.js```. Restarting the server and visiting [http://localhost:3000/task4](http://localhost:3000/task4), show nothing yet. However we now have a weather object in the view, lets print that out. So that our template ```./views/task4.ejs``` will look like the following.

```
<%= include layouts/head %>

<h1><%= title %></h1>

<%= weather %>

<%= include layouts/foot %>
```

Refreshing [http://localhost:3000/task4](http://localhost:3000/task4), we now print the title with ```[object Object]```. Which isn't that helpful, this is because we parsed the body to JSON in our router. To see whats inside this ```[object Object]``` we make a string back of it with ```JSON.stringify(weather)```. This is the inverse of ```JSON.parse```. Lets refresh again! We now see whats inside our weahter object, lets add the location to the title. Modifying the view into: 
```
<%= include layouts/head %>

<h1><%= title %> in <%= weather.name %></h1>

<%= JSON.stringify(weather) %>

<%= include layouts/foot %>
```

Now lets at the min, max and current temperature to the page.

```
<%= include layouts/head %>

<h1><%= title %> in <%= weather.name %></h1>

<dl>
  <dt>Current Temperature</dt>
  <dd><%= weather.main.temp %></dd>
  <dt>Minimum Temperature</dt>
  <dd><%= weather.main.temp_min %></dd>
  <dt>Max Temperature</dt>
  <dd><%= weather.main.temp_max %></dd>
</dl>

<%= JSON.stringify(weather) %>

<%= include layouts/foot %>
```

We now still have the temparature in Kelvin, lets make a module so we can recalculate. Lets create a file called ```temperature```, inside the ```./lib``` folder. Luckily for us kelvin to celsuis is easily calculated by distracting _'-272.15'_. And we round the number to look a little more user-friendly with the [.toFixed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) function.

```
function kelvinToCelsius(kelvin){
  return (kelvin - 272.15).toFixed(1);
}

module.exports = {
  kelvinToCelsius: kelvinToCelsius
};
```

Lets test this module in the REPL. Start it with ```$ node```.
```
> var temp = require('./lib/temperature')
undefined
> temp
{ kelvinToCelsius: [Function: kelvinToCelsius] }
> temp.kelvinToCelsius(275)
2.9
```

That seems to work, lets make that function available in our view. First we require the temp module in our route. Making our ```./routes/task4``` look like this:

```
var express = require('express');
var router = express.Router();
var request = require("request");
var tempCalc = require("../lib/temperature");

/* GET Weather page. */
router.get('/', function(req, res) {

  var url = "http://api.openweathermap.org/data/2.5/weather?q=Amsterdam,nl";
  request.get(url, function(err, response, body){
    var weather = JSON.parse(body);
    res.render('task4', {
      title: 'Het weer vandaag', 
      weather: weather, 
      tempCalc: tempCalc
    });
  });


});

// Extra opdacht op basis van query string weer ophalen
module.exports = router;
```

Now can use it in our template like this:

```
<%= tempCalc.kelvinToCelsius(weather.main.temp) %>
```

As last thing we want to display the icon that comes from openweathermap. We use a image tag to display this image. The icon code is found in the weather variable. Unfortunately this makes are code look abit clumpsy, but thats al right for the moment. This ```weather``` object is an array, we access the first element in this array with ```[0]```. We then remove the ```JSON.stringify``` line, to clean things up. Making our template look like:

```
<%= include layouts/head %>

<h1><%= title %> in <%= weather.name %></h1>
<img src="http://openweathermap.org/img/w/<%= weather.weather[0].icon %>.png" alt="Current weather: <%= weather.weather[0].main%>">
<dl>
  <dt>Current Temperature</dt>
  <dd><%= tempCalc.kelvinToCelsius(weather.main.temp) %></dd>
  <dt>Minimum Temperature</dt>
  <dd><%= tempCalc.kelvinToCelsius(weather.main.temp_min) %></dd>
  <dt>Max Temperature</dt>
  <dd><%= tempCalc.kelvinToCelsius(weather.main.temp_max) %></dd>
</dl>

<%= include layouts/foot %>
```

And we are done.