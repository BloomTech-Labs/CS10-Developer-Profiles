const express = require('express');
const cors = require('CORS');
const helmet = require('helmet');

module.exports = {
  server(server) {
    server.use(express.json());
    server.use(helmet())
    server.use(cors({}));

  },
};
