const path = require('path');
const express = require('express');
const helmet = require('helmet');

module.exports = {
  middleware: (server) => {
    server.use(express.json());
    server.use(helmet());

    // In production build, serve frontend build as static files
    if (process.env.NODE_ENV === 'production') {
      server.use(express.static(path.resolve(__dirname, '../../frontend/lambda-in/build')));
    }
  },
};
