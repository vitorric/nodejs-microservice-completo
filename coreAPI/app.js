const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  app = express();

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});


const { xXssProtection, hidePoweredBy } = require('./src/middleware/security.js');

app.disable('x-powered-by');

app.use(
  xXssProtection(),
  hidePoweredBy(),
  morgan('dev'),
  bodyParser.json({ limit: '1000MB', extended: true }),
  bodyParser.urlencoded({ limit: '2000MB', extended: true })
);


app.all('*', (req, res, next) => {
  //console.log('CORS setting up the headers...');

  res.header('Access-Control-Allow-Origin', process.env.ALLOWEDORIGINS);
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Headers', 'Content-type, Accept, Authorization');
  res.setHeader('access-control-expose-headers',
    'APIm-Debug-Trans-Id, X-RateLimit-Limit, X-RateLimit-Remaining, ' +
      'X-RateLimit-Reset, X-Global-Transaction-ID');

  //console.log('IP: ', req.connection.remoteAddress);
  next();
});

require('./src/middleware/passport/_passport.index.js')();

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError &&
    err.status >= 400 && err.status < 500 &&
    err.message.indexOf('JSON') !== -1) {
    return res.status(500).jsonp({ sucess: false, result: 'Invalid data' });
  }
  next();
});

require('./src/routes')(app);

module.exports = app;