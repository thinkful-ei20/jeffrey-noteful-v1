'use strict';

const express = require('express');

const data = require('./db/notes');

const app = express();

const { PORT } = require('./config');

const { myLogger } = require('./middleware/myLogger');

app.use(express.static('public'));

app.use(myLogger);

app.get('/api/notes', (req, res) => {
  let results = data.slice();

  if(req.query.searchTerm) {
    results = results.filter(item => item.title.toUpperCase().includes(req.query.searchTerm.toUpperCase()));
  }

  res.json(results);
});

app.get('/api/notes/:id', (req, res) => {
  res.json(data.find(item => item.id === parseInt(req.params.id)));
});

app.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`); // eslint-disable-line no-console
}).on('error', err => {
  console.error(err); // eslint-disable-line no-console
});