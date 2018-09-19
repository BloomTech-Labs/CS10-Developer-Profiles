const server = require('express')();
const setupGlobalMiddleware = require('./middleware').globals;
const setupPublicRoutes = require('./routes').public;
const setupAuthMiddleware = require('./middleware').auth;
const setupPrivateRoutes = require('./routes').private;

/**
 * Public: endpoints
 */
// Apply global middlewares
setupGlobalMiddleware(server);

// Public access endpoints
setupPublicRoutes(server);

/**
 * Private: endpoints
 * Validate credentials,
 * If credentials are no valid do not allow access
 * to private endpoints
 */
setupAuthMiddleware(server);

// Private access endpoints
setupPrivateRoutes(server);

module.exports = {
  server,
};
