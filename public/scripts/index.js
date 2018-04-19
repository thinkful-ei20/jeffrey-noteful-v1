/* global $ noteful api store */
'use strict';

$(document).ready(function () {
  noteful.bindEventListeners();
  
  api.search({})
    .then(list => {
      store.notes = list;
      noteful.render();
    })
    .catch(err => {
      next(err);
    });    

});