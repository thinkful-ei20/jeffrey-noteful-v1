'use strict';

const express = require('express');

const data = require('./db/notes');

const app = express();
app.use(express.static('public'));

app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`); // eslint-disable-line no-console
}).on('error', err => {
  console.error(err); // eslint-disable-line no-console
});