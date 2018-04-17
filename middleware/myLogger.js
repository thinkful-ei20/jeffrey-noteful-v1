'use strict';

// eslint-disable-next-line no-unused-vars
const myLogger = (req, res, next) => {
  console.log('`logger.myLogger` ran'); // eslint-disable-line no-console

  const now = new Date();
  // eslint-disable-next-line no-console
  console.log(`
  ${now.toLocaleDateString()} ${now.toLocaleTimeString()} ${req.method} ${req.url}
  `);
  
  next();
};

module.exports = { myLogger };