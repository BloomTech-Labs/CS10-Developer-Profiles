const express = require('express');

module.exports = {
  server: function (server) {
    server.use(express.json());
    /*
      ADD ADDITIONAL EXPRESS MIDDLEWARE
    */
  }
};

{"firstName": "first",
"lastName": "last",
"password": "12345",
"email": "a@a.com",
"desiredTitle": "title",}