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

router.route(path).get(handleGET, sendResponseToClient);
router.use(handleError);

router.use(userHasToken);

seekersRF.setProjection({ password: 0, __v: 0 });
seekersRF.POST();
seekersRF.GET_id();
seekersRF.PUT();
seekersRF.DELETE();

module.exports = router;
