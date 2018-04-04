Polling application made with Node/Express/MongoDB and Angular frontend. Uses jwt token authentication.

This app serves as a MEAN application example/POC. Feel free to modify it as you need to.

Still in progress - not everything is implemented yet (prevent multiple votes, some validation etc.) ...

Working example of this simple app can be seen here (heroku): https://polls-node.herokuapp.com 

App enables registration/login. As a logged-in user you can create, list and delete your own polls. Anonymous users can vote and see results of polls.

To run, build backend & angular frontend and copy dist files to express '/static' folder; inside project folder run:

npm install
cd frontend
npm install
npm build
cd ..
node app.js

When build, frontend files are copied to over to static folder with npm scripts, which is served by Express.
