const server = require('express')();
const setupGlobalMiddleware = require('./middleware').globals;
const setupPublicRoutes = require('./routes').public;

const setupApiRoutes = require('./routes').api;
const setupPaymentStripe = require('./routes').payments.stripe;

/**
 * Public: endpoints
 */
// Apply global middlewares
setupGlobalMiddleware(server);

// Public access endpoints
setupPublicRoutes(server);

// API routes
setupApiRoutes(server);

/**
 * Wire stripe endpoint with the Server.
 */
setupPaymentStripe(server);

module.exports = {
  server,
};
