# Server-side scripting in node.js -- Final Assignment Base Application

This is the basic application with which you can create your final assignment.

## Getting started

* [Download this base application](http://cl.ly/1N2h0t1R1z1p).
* Run ```npm install``` to install the dependencies.

## Included

* Node.js basic application with all required dependencies (express-session, body-parser, multer, MySQL, express-myconnection, etc.)
* Basic database (see `database/database.sql`).

## Database
The base database should be enough to create the bare minimum application required. The database includes 3 tables; users, photos and comments:

![Datamodel](database/model.png?raw=true)

## Session
There is one minor difference between the excersises and this assignment in session handling. Sessions will not be removed when the application restarts. Delete the contents of the `sessions` directory to remove all sessions.