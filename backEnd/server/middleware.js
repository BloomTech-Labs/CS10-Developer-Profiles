const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { userHasToken } = require('../api/utils/authUtils');

module.exports = {
  globals(server) {
    server.use(express.json());
    server.use(helmet());
    server.use(cors({}));
  },
  auth(server) {
    // Validate if client has a valid token
    server.use(userHasToken);
  },
};
