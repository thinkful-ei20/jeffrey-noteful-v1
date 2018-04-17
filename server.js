'use strict';

const express = require('express');

const data = require('./db/notes');
const simDB = require('./db/simDB');
const notes = simDB.initialize(data);

const app = express();

const { PORT } = require('./config');

const { myLogger } = require('./middleware/myLogger');

app.use(express.static('public'));

app.use(myLogger);

app.get('/api/notes', (req, res, next) => {
  const { searchTerm } = req.query;

  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err);
    }
    res.json(list);
  });
});

app.get('/api/notes/:id', (req, res) => {
  res.json(data.find(item => item.id === parseInt(req.params.id)));
});

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

app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`); // eslint-disable-line no-console
}).on('error', err => {
  console.error(err); // eslint-disable-line no-console
});