# Server-side scripting in node.js -- practice exam 1

Practice exam for the [sss-course](https://github.com/CMDA/sss-course).

## Overview



## Before you start
* [Download this exercise](http://cl.ly/1z0Q373i1Q0R)
* Run ```$ npm install``` in the exercise directory to install the dependencies. 

## The structure of this project
We've supplied you with a minimum boilerplate, what we are going to build.

Database snitz as middleware. req.locals.blogposts is een array. You can reset the data anytime by removing the tmp directory in your project.

## Task 1
1. Connect the router to '/blog' 
2. Show on the all blog posts that are in the post model. You get call all postobjects by calling ```.all()``` on the post object. Render them on the index page with an anchor to the detail page for each location.
        <h1>Blog entries</h1>
        <ul>
            <li>
                <a href="/blog/<%= blog.id %>">
                    <h2><%= blog.title %></h2>
                    <p></p>
                </a>
            </li>
        </ul>
this works when

1. /blog 200
2. /blog content ~= expected content with titles
3. run by npm run test:task1

## Task 2
1. Create a route for a detail page for each post, such that a post can be visited with by an ID, ```/blog/:post_id```. E.g. ```/blog/1``` showing the following information for the blog post with ID 1.

        <header>
            <h1>$titel</h1>
            <p>Geschreven door $auteur, op 15 december 2014.</p>
        </header>
        <div class="content">
            <p class="intro">intro</p>
            ... content ...            
        </div>
2. 


## Task 3
1. Link the anchor in the index list to detail page.


## Bonus task
Losse test etc.

2. Render a form, with 3 fields, an ```input``` field for the _title_, a ```textarea``` for the _content_, and ```input``` field for the _author name_. And a submit button. 



