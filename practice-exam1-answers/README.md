# Server-side scripting in node.js -- practice exam 1

Practice exam for the [sss-course](https://github.com/CMDA/sss-course).

## Getting started
* [Download this exam](http://cl.ly/1z0Q373i1Q0R)
* Run ```$ npm install``` in the exercise directory to install the dependencies.

## The rules

* Only change or create files if indicated in the tasks.
* Make sure you lint your code with jshint
* You can see if you pass by running `npm test`

* You are allowed to use:
    * The book
    * Your notes
    * Look up things on the internet

* You are *not* allowed to:
    * Communicate with your co-students or anyone else during the exam, this includes chat, e-mail, etc.

## Data

We have set up a simple array of blogposts. After you've started the application you can see the blogposts in `tmp/data-set.json`. You can access the blogposts by using `req.locals.store.posts`, all changes you make in `req.locals.store` will be saved as well.

## Task 1
1. Create a router in `routes/blogs.js`
1. Connect the router in `routes/blogs.js` to the `/blogs` URL
1. Change the `views/index.ejs` template and render all entries in the template. Make sure you at least print the title of each blog post.
1. Make the route `/` work in `routes/blogs.js` so we can see the list of blogposts when we visit the URL "/blogs"

## Task 2
1. Create a route for a detail page for each post in `routes/blogs.js` so we can visit the URL(s) "/blogs/0" or "/blogs/1", etc to get the blog posts by array index (0 being the first).
1. Create a `views/show.ejs` template and render them in the just created route. Make sure you output at least the blog title, the blog author and the blog intro
1. Change the template (`views/index.ejs`) from the previous task and link each blogpost in the list to the detail page so we can easily navigate from the overview to the subpage
1. *BONUS* output the blog body in a way that the HTML is not escaped.

## Task 3
1. Create a `/new` route in `routes/blogs.js` to render the form in `views/new.ejs`. Don't forget to pass the `req` object to the template.
1. Create a `/` route so the form works when you press the "Save" button in the form.
1. Add the data from the form to `req.locals.store.posts`.
1. Redirect the user to `/` after you've stored the data
1. Validate that the data from the form cannot contain an empty title.
1. If the title is empty pass the `error` variable with an error message to the template using `req.locals`.


