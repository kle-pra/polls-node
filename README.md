Polling application made with Node/Express/MongoDB and Angular frontend. Still in progress ...

Working example of this app can be seen here (heroku): https://polls-node.herokuapp.com 

You can register and login, add logs and search archive by date.

To run, build backend & angular frontend and copy dist files to express '/static' folder; inside project folder run:

npm install
cd frontend
npm install
npm build
cd ..
node app.js


When build, frontend files are copied to over to static folder with npm scripts, which is served by Express.
