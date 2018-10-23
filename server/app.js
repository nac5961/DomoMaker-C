// Import libraries
const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const session = require('express-session');

// Import custom files
const router = require('./router.js');

// Set environment variables
const port = process.env.PORT || process.env.NODE_PORT || 3000;
const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/DomoMaker';

// Setup connection to mongodb
// Exit if connection failed
mongoose.connect(dbURL, (err) => {
  if (err) {
    console.log('Could not connect to database');
    throw err;
  }
});

// Setup express
const app = express();

app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted/`))); // re-route to /assets
app.use(favicon(`${__dirname}/../hosted/img/favicon.png`)); // set favicon to use
app.use(compression()); // compresses/minifies the data being sent and received
app.use(bodyParser.urlencoded({
  extended: true,
})); // gives app ability to parse urlencoded data

app.use(session({
  key: 'sessionid',
  secret: 'Domo Arigato',
  resave: true,
  saveUninitialized: true,
})); // setup the session (the cookies used to keep track of user sessions)

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' })); // hook up handlebars
app.set('view engine', 'handlebars'); // also hooks up express with handlebars
app.set('views', `${__dirname}/../views`); // sets the location of the views

app.use(cookieParser());

// Setup routing
// Pass express to the router for handling requests
router(app);

// Start the server
app.listen(port, (err) => {
  if (err) {
    throw err;
  }

  console.log(`Listening on port ${port}`);
});
