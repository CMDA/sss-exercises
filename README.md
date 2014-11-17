# Server-side scripting in node.js -- Exercise 1

Practice exercises for the [sss-course](https://github.com/CMDA/sss-course).


## Overview
This exercise will help you:

* run your first node.js script,
* work with variables,
* create and use your own module,
* understand asynchronous code, and
* start the first webserver based on node.js.

Commands that are required to be run on terminal or command prompt are prefixed with a ```$```. The commands must be executed from the root of the exercise project. For every task expect task 1, some basic tests are added. These test help you to verify your solution. These tests can be found in ```./test/``` directory. First of all, these tests aren't holy. So it may be the case that while the tests are failing your solution is perfectly fine. Understanding why it fails however is fairly important. Last thing is that in theory they are fairly easy to cheat, and may not check all edge cases, which you would like to catch in production code. We just hope they give you some pointers. 


## Prerequisites
To get you running quickly. [Fork this repo](https://github.com/Digitpaint/server-side-scripting-in-nodejs-exercise1/fork), and [clone it](http://git-scm.com/book/ch2-1.html#Cloning-an-Existing-Repository) onto your computer. The reason for forking is that you can easily keep track of your changes and share you code with your fellow students. Also, it makes it easier for us to give feedback on your code. For more explanation on how to get feedback see the [course guide](https://github.com/DigitPaint/server-side-scripting-in-nodejs-course#workflow).

### Reading list
* [Node. js in Action, Cantelon, Mike, et al. - Manning Publications, 2014](http://www.manning.com/cantelon/)
  * Chapter 3, t/m 3.2.3 (p 27 t/m 58)
  * Appendix A5 (p 363 t/m 366)
  * Appendix B1 t/m B3.2 (p 367 t/m 371) 


## Task 1
For this course it is important that you can run node.js code and understand how to run node.js code.


1. Install node.js, grab the installer from [nodejs.org](http://nodejs.org)
    1a. While node is installing, take your time to read to exercise and review [the lecture](http://cmda.github.io/sss-course/lesson1) 
2. After installing node.js you should be able to start the REPL by typing, ```$ node ``` in your command prompt. Feel free to play around, e.g. ``` > 4 + 2```.
3. Install the dependencies for this exercise ```$ npm install ```
4. Run the first commandline script ``` $ node index.js ``` 


## Task 2
We have a made a very simple calculator, however the implementation is missing. As this is a very simple calculator, it only supports a sum and multiplication methods. 

1. Open the calculator ```./lib/calculator.js```
2. Complete the implementation for the ```sum``` method.
3. Run ```$ node task2.js```. Is it working?
4. Complete the implementation for the ```multiply``` method.
5. Run ```$ node task2.js```. Is it working?
6. Run ```$ npm run test:task2```. All green? Well done!


## Task 3
In the earlier example, you've seen the first module. Lets make our own one, now. In this module we are going to convert a string to titlecase, e.g. 

```javascript
stringModule.titleize('this string will appear in titlecase') // => This String Will Appear In Titlecase
```

1. Create a file named ```string-helper.js```, in the ```lib``` folder. 
2. Create an object, with the function ```titleize```, this function should take an input string and return this string in titlecase.
3. You can verify your module by running ```$ node task3.js```. 
4. The supplied tests can be run with ```$ npm run test:task3```.


## Task 4
In node.js quite a portion of code, requires you to understand asynchronicity. In node.js an asynchronous code typically takes a callback, that is executed once its work is completed. Sometimes however you require the first asynchronous function call to be completed before the second one. 

1. Open ```lib/serialize-flow.js```.
2. Right now, ```serializeFlow``` just executes all functions in the given array.
3. You can see this by running ```$ node task4.js```, to see the defined asynchronous function open ```task4.js```.
3. Modify this function to make it work in serial sequence. *Tip:* The given functions to ```serializeFlow``` always will take an optional callback.
4. Run ```$ node task4.js``` again, is Func1 run before Fun2 now?
5. Run ```$ npm run test:task4``` to test your implementation. All green? Well done!


## Task 5
So far, we haven't done anything server related. But héh, ...this course is called server-side scripting. So let's run a server. It will be a fairly simple one, greeting us with: "Hello World!".

1. Open ```lib/server.js```.
2. Implement the server starting on port 3000 and returning "Hello World!";
3. Start the server with running ```node task5.js```
4. Point your browser to ```localhost:3000```.
5. It should greet you with a warmthy "Hello World!".
6. Run ```$ npm run test:task5```, to run the supplied test.


## Wrapping up
You've now completed the first exercise of this course. There are however a few last things. You can run the complete test suite, with ```$ npm test```. If all the individual ```npm run test:task*``` tested successfully, this should work to test the complete set. As discussed during the lecture, ```jshint``` can help you verify the consistency your code style. Running ```$ node_modules/.bin/jshint .``` will check it for all your code. 

As last, it is advisable to commit and push your solutions because they will help you with the final assignment and prepare the exams. Pushing your code will make sure that your code is backed up by GitHub. 



