const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

module.exports = {
  server(server) {
    server.use(express.json());
    server.use(express.static(path.resolve(__dirname, '../../frontend/lambda-in/build')));
  }
};
