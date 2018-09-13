const express = require('express');

module.exports = {
  server(server) {
    server.use(express.json());
    /*
      ADD ADDITIONAL EXPRESS MIDDLEWARE
    */
  },
};
