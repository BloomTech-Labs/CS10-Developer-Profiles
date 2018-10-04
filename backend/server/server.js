const server = require('express')();
const setupMiddleware = require('./middleware').middleware;
const setupRoutes = require('./routes').routes;

/**
 * Apply server middleware
 */
setupMiddleware(server);

/**
 * Setup all backend routes
 */
setupRoutes(server);

module.exports = {
  server,
};
