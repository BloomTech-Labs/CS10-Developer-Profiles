const express = require('express');
const path = require('path');

module.exports = {
  server(server) {
    server.use(express.json());

    // In production build serve frontend build as static files
    if (process.NODE_ENV === 'production') {
      server.use(express.static(path.resolve(__dirname, '../../frontend/lambda-in/build')));
    }
  },
};
