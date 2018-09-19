const express = require('express');
const helmet = require('helmet');
const { userHasToken } = require('../api/utils/authUtils');

module.exports = {
  globals(server) {
    server.use(express.json());
    server.use(helmet());

    // In production build, serve frontend build as static files
    if (process.env.NODE_ENV === 'production') {
      server.use(
        express.static(
          path.resolve(__dirname, '../../frontend/lambda-in/build')
        )
      );
    }
  },
  auth(server) {
    // Validate if client has a valid token
    server.use(userHasToken);
  },
};
