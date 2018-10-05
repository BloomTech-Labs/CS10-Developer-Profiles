/* eslint-disable */
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
 * Authenticate POST, PUT and DELETE endpoints with userHasToken()
 */
const router = express.Router();


const seekersRF = new RouterFactory(router, Seekers);

// Set projections
seekersRF.setProjection({ password: 0, __v: 0 });

// Create public seeker endpoints
seekersRF.GET('/', getSeekers.bind(this, Seekers));
seekersRF.GET_id();

// Make routes after this point private
router.use(userHasToken);

// Create POST, GET/:id, PUT and DELETE endpoints
seekersRF.POST();
seekersRF.PUT();
seekersRF.DELETE();

module.exports = router;
