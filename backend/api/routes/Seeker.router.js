const express = require('express');
const { RouterFactory } = require('express-router-factory');
const { getSeekers } = require('../middleware/getters');
const Seekers = require('../models/Seeker/Seeker.model');

/**
 * Seekers CRUD endpoints
 *
 * Handle POST, GET/:id, PUT and DELETE with default Router Factory
 * Handle GET with custom middleware
 */
const router = express.Router();
const seekersRF = new RouterFactory(router, Seekers);

seekersRF.POST();
seekersRF.GET('/', getSeekers.bind(this, Seekers));
seekersRF.GET_id();
seekersRF.PUT();
seekersRF.DELETE();

module.exports = router;
