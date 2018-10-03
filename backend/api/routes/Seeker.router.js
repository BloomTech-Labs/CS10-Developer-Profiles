const express = require('express');
const { RouterFactory } = require('express-router-factory');
const { userHasToken } = require('../middleware/authentication');
const { getSeekers } = require('../middleware/getters');
const Seekers = require('../models/Seeker/Seeker.model');

/**
 * Seekers CRUD endpoints
 *
 * Handle POST, GET/:id, PUT and DELETE with Router Factory
 * Handle GET with custom middleware
 * Authenticate all endpoints with userHasToken()
 */
const router = express.Router();
const seekersRF = new RouterFactory(router, Seekers);

// Set projections
seekersRF.setProjection({ password: 0, __v: 0 });

// Create all CRUD endpoints.
seekersRF.POST('/', userHasToken.bind(this), 'handlePOST');
seekersRF.GET('/', userHasToken.bind(this), getSeekers.bind(this, Seekers));
seekersRF.GET_id('/:id', userHasToken.bind(this), 'handleGET');
seekersRF.PUT('/:id', userHasToken.bind(this), 'handlePUT');
seekersRF.DELETE('/:id', userHasToken.bind(this), 'handleDELETE');

module.exports = router;
