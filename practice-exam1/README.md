# Server-side scripting in node.js -- practice exam 1

Practice exam for the [sss-course](https://github.com/CMDA/sss-course).

## Overview



## Before you start
* [Download this exercise](http://cl.ly/1z0Q373i1Q0R)
* Run ```$ npm install``` in the exercise directory to install the dependencies. 

## The structure of this project
We've supplied you with a minimum boilerplate, what we are going to build.


## Task 1
1. Create a router for ```/blog```
    ```
        <h1>Blog entries</h1>
        <ul>
            <li>
                <a href="#">
                    <h2>$title</h2>
                    <p></p>
                </a>
            </li>
        </ul>
    ```
2. Show on the all locations available on this page, with an anchor to a detail page for each location.


## Task 2
1. Create a route for a detail page for each post, such that a post can be visited with by an ID, ```/blog/:post_id```. E.g. ```/blog/1``` showing the following information for the blog post with ID 1.
```
    <header>
        <h1>$titel</h1>
        <p>Geschreven door $auteur, op 15 december 2014.</p>
    </header>
    <p class="intro">intro</p>
    ... content ...
```
2. 


## Task 3
1. Create a route for the ```/blog/new``` url. 
2. Render a form, with 3 fields, an ```input``` field for the _title_, a ```textarea``` for the _content_, and ```input``` field for the _author name_. And a submit button. 
3. 


