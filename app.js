const Config = require('./config.js');
const fs = require('fs');
const express = require('express');
const app = express();
const logger = require('morgan');

const helmet = require('helmet');
const bodyParser = require('body-parser');
const RateLimit = require('express-rate-limit');


// View Engine
app.enable('trust proxy');

var apiLimiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  delayMs: 0 // disable delaying - full speed until the max limit is reached
});

app.use('/', apiLimiter);
if (app.get('env') === 'production') {
  app.use(logger('combined'));
} else {
  app.use(logger('dev'));
}

//Helmet Security
app.use(helmet());

// Body parser for POST
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

require('./api/routes')(app);

// 404 catch-all handler (middleware)
app.use((req, res, next) => {
  res.status(404);
});

// 500 error handler (middleware)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500);
});

app.listen(Config.webport);
console.log('[!] API is online.');