'use strict';

const express = require('express');
const app = express();

const { PORT } = require('./config');

const morgan = require('morgan');


const notesRouter = require('./router/notes.router');

app.use(morgan('dev'));

app.use(express.static('public'));

app.use(express.json());

app.use('/api', notesRouter);

app.use(function (req, res, next) { // eslint-disable-line no-unused-vars
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

app.use(function (err, req, res, next) { // eslint-disable-line no-unused-vars
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

if (require.main === module) {
  app.listen(PORT, function () {
    console.info(`Server listening on ${this.address().port}`); // eslint-disable-line no-console
  }).on('error', err => {
    console.error(err); // eslint-disable-line no-console
  });
}

module.exports = app;