'use strict'

var express  = require('express');
var app      = express();
var port     = process.env.PORT || 5000;

var mongoose    = require('mongoose');
var database    = require('./configs/database');

// Pull information from HTML POST (express4)
var bodyParser     = require('body-parser');

// Mongoose connection
mongoose.connect(database[process.env.NODE_ENV].url);

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended':'true'}));

// Parse application/json
app.use(bodyParser.json());

// Parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Routes
require('./routes/api-ai.js')(app);

// Listen (start app with node index.js)
app.listen(port);
