'use strict';

const express = require('express');

const data = require('./db/notes');

const app = express();
app.use(express.static('public'));

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

app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`); // eslint-disable-line no-console
}).on('error', err => {
  console.error(err); // eslint-disable-line no-console
});