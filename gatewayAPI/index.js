const express = require('express'),
  morgan = require('morgan'),
  app = express();

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

require('./src/middlewares/passport/index.js')();

app.use(
  morgan('dev')
);

require('./src/routes')(app);

app.listen(process.env.PORT, () => console.log(`Gateway listening on port ${process.env.PORT}!`));