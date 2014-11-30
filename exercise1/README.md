# Server-side scripting in node.js -- Exercise 1

Practice exercises for the [sss-course](https://github.com/CMDA/sss-course).


## Overview
This exercise will help you:

* run your first node.js script,
* work with variables,
* create and use your own module,
* learn working with the debugger statement.

Commands that are required to be run on terminal or command prompt are prefixed with a ```$``` __(it's not required to copy this)__. The commands are to be executed from the folder of the exercise. For most tasks some basic tests are added. These test help you to verify your solution. These tests can be found in ```./test/``` directory. First of all, these tests aren't holy. So it may be the case that while the tests are failing, your solution is perfectly fine. Understanding why it fails however is fairly important. Last thing is that in theory they are fairly easy to cheat, and may not check all edge cases, which you would like to catch in production code. We just hope they give you some pointers.


## Prerequisites
To get you running quickly. [Fork this repo](https://github.com/CMDA/sss-exercises/fork), and [clone it](http://git-scm.com/book/ch2-1.html#Cloning-an-Existing-Repository) onto your computer. The reason for forking is that you can easily keep track of your changes and share you code with your fellow students. Also, it makes it easier for us to give feedback on your code. For more explanation on how to get feedback see the [course guide](https://github.com/CMDA/sss-course/#workflow).

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
3. Exit the Node REPL by pressing ctrl+c twice
4. Enter the directory of excercise1 by typing ```cd ```(plus space) and drag+drop the 'excercise1' folder in the terminal window
5. Install the dependencies for this exercise ```$ npm install ```
6. Run the first commandline script ``` $ node index.js ```


## Task 2
We have a made a very simple calculator, however the implementation is missing. As this is a very simple calculator, it only supports a sum and multiplication methods.

1. Open the calculator ```./lib/calculator.js``` in your code editor (Brackets, Sublime, etc.)
2. Complete the implementation for the ```sum``` method.
3. Run ```$ node task2.js```. Is it working?
4. Complete the implementation for the ```multiply``` method.
5. Run ```$ node task2.js```. Is it working?
6. Run ```$ npm run test:task2```. All green? Well done!

### Answer
The code in ```./lib/calculator.js``` should look like.

```
// File ./lib/calculator.js
// Task 2
var calculator = {
  sum: function(x, y){
    return x * y;
  },
  multiply: function(x, y){
    return x * y;
  }
};

module.exports = calculator;
```

## Task 3
In the earlier example, you've seen the first module. Lets make our own one, now. In this module we are going to convert a string to titlecase, e.g.

```javascript
stringModule.titleize('this string will appear in titlecase') // => This String Will Appear In Titlecase
```

1. Create a file named ```string-helper.js```, in the ```lib``` folder.
2. Create an object, with the function ```titleize```, this function should take an input string and return this string in titlecase (see example below).
3. You can verify your module by running ```$ node task3.js```.
4. The supplied tests can be run with ```$ npm run test:task3```.

### Example module
```
var tools = {
  titleize: function(input){
    // manipulate the input the match the required behaviour
    return input;
  }
};

module.exports = tools;
```

### Answer
Two types of answer apply here, 1) you could use a regular expression, 2) split the string in tokens and capitalize every words in this array. As the second is somewhat more straight forward we have this one displayed below. 

```
var tools = {
  titleize: function(input){
    // make a seperate string for every word in the given input string
    var words = input.split(' ');
    var array = [];

    words.forEach(function(word){
      // We take the first char with .charAt, and make
      // an upper case of that
      var firstChar = word.charAt(0).toUpperCase();
      // The rest of the word, we make sure that it is lowercase
      word = word.toLowerCase();

      // Now we concatenate the two piece, where we only take
      // the characters after the first one with the slice function
      word = firstChar + word.substring(1);

      // Now we add the capitalized word into the array
      array.push(word);
    });

    // Because we have an array and expecting a string back
    // we join all substring into one string
    return array.join(' ');
  }
};

module.exports = tools;
```


## Task 4

For task 4 we created a small module that summaries API output from the [GitHub search api](https://developer.github.com/v3/search/) by making a top 5 of most stared repositories and calulating the average amount of stars. To keep things simple we have stored the output of this API call in a local JSON file. You'll find this file in ```data/task4.json```.

However, we have a problem! The tests aren't working and we don't understand why. Using the [node-inspector](https://github.com/node-inspector/node-inspector), we will investigate this issue.

1. Install the node-debugger with ```$ npm install -g node-inspector```
2. Open the file ```task4.js```, in this task we read the API data from ```data/task4.json``` and pass the `items` array to the stars module (```./lib/stars.js```). The stars has two functions 1) to select the 5 most stared repositories and 2) to calculate the average.
3. Execute ```$ node task4.js```, at first it looks that our module works just fine. However, when closely examining the results, the average turns out to be `NaN`. When running the tests for this ```$ npm run test:task4```, we see that are even more problems with this module.
4. Lets get our tests working again!
5. When revising the first error of the test command, it looks like the output of our function is not correct:
```
    AssertionError: expected [ Array(5) ] to deeply equal [ Array(5) ]
      + expected - actual
```

```Diff
       [
         {
      +    "name": "lib1"
      +    "stargazers_count": 368
      +  }
      +  {
           "name": "lib0"
           "stargazers_count": 245
         }
         {
         {
           "name": "lib3"
           "stargazers_count": 17
         }
      -  {
      -    "name": "lib2"
      -    "stargazers_count": 10
      -  }
       ]
```
6. While you could use ```console.log```, you'll see that the repository object holds quite some information making it hard to debug. Lets use ```node-inspector``` to solve this problem. Place a ```debugger``` statement after ``` var stars = function(repositories){ ``` in the ```lib/stars.js``` module and run ```task4.js``` again, but now instead of ```$ node task4.js``` use ```$ node-debug task4.js```.
7. The node-debug utility halts by default at the first line of your program. By pressing the _resume execution button (F8)_, node.js will continue the executing of the program. When you added the debugger statement correctly, you will now jump to the ```Stars``` function.
8. You can now open the console, by pressing the _Show console_ button (number 1 in the image below).
9. By typing ```repositories```, you'll see the contents of this variable. The functionality here is comparable with that of the REPL. You can see al the variables that are inside the scope here at in the _Scope Variable_ pane on the left.
10. When we revise the output of step 5, we can see that the return value of ``` top5() ``` is different than what our suite expects. Lets inspect that function and what happens inside.
11. You can now, either add a breakpoint in the inspector by clicking the line number you want the execution to break, or let the code continue (by clicking x), and add a ```debugger``` statement in code.
13. Re-run ```$ node-debug task4.js```.
13. Navigate to the the ```top5``` function,
  * Can you verify if the sorting function works?
  * Why are we using reverse()
  * And what happens when we call [Array.splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice), does that match with our intend?
13. Found the problem? Fix it and verify it ```$ npm run test:task4```
14. This should still point out a problem in the averageStars function, can you debug this?
15. When done; ```$ node task4.js``` && ```$ npm run test:task4```


### Node-inspector
![Show console](http://f.cl.ly/items/2u0t1V0u0A0H1S2O0O36/node-inspector.png)

1. _Show console_, interact with code at the breakpoint.
2. _Show navigator_, show all the files, so you can access you modules here also.
3. _Scope variables_, which variables are set at your breakpoint.
4. _Resume execution_, when you coded stopped execution at a breakpoint, use this button to continue.

### Extra task
Can you modify the ```task4.js``` to use the actual API of GitHub?

E.g. we've used to following url to retrieve the data set of ```data/task4.json```

```
https://api.github.com/search/repositories?q=node+language:javascript&per_page=100
```

### Answer
First of all our module throws a bug when you try to run it. That is because we haven't added the underscore module to the package, and thus isn't installed when all other dependencies where downloaded. To solve this you can use ```$ npm install underscore --save```. After that there where two bugs in this ```stars.js``` module. The first one:

```
// Line: 11
return sortedShortList.reverse().splice(1, 5); // BUGGY
// The corrected version
return sortedShortList.reverse().splice(0, 5); 
```
As array's in Javascript our zero indexed, following the documentation of the [Array.splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) function, we see that if we want the first five elements returned, we should be using 0 instead of 1. 

The second one:
```
// Line: 15
var avg, sum, repositories, count = 0; // Buggy
// The corrected version
var avg, sum, count = 0; 
```
By incident repositories became declared twice, because of the ```var``` statement. Because of that, the ```_.reduce``` iterates over undefined and then returns undefined, and so ```sum``` remains undefined.


## Wrapping up
You've now completed the first exercise of this course. There are however a few last things. You can run the complete test suite, with ```$ npm test```. If all the individual ```npm run test:task*``` tested successfully, this should work to test the complete set. As discussed during the lecture, ```jshint``` can help you verify the consistency of your code style. Running ```$ node_modules/.bin/jshint .``` will check it for all your code. However running jshint from your local node_modules path is a bit cumbersome. It's much easier to install jshint globally, that way you can just run ```jshint .```.

As last, it is advisable to commit and push your solutions because they will help you prepare the exams and develop the final assignment. Pushing your code will make sure that your code is backed up by GitHub.



