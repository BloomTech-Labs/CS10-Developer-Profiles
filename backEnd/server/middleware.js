const express = require('express');

module.exports = {
  server: function(server) {
    server.use(express.json());
    /*
      ADD ADDITIONAL EXPRESS MIDDLEWARE
    */
  },
};
