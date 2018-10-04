const express = require('express');
const { RouterFactory } = require('express-router-factory');
const { userHasToken } = require('../middleware/authentication');
const Employer = require('../models/Employer/Employer.model');

/**
 * Employer CRUD endpoints
 *
 * Handle POST, GET, GET/:id, PUT and DELETE with Router Factory
 * Authenticate all endpoints with userHasToken()
 */
const router = express.Router();
const employerRF = new RouterFactory(router, Employer);

// Set projections
employerRF.setProjection({ password: 0, __v: 0 });

// Make routes after this point private
router.use(userHasToken);

// Create all CRUD endpoints
employerRF.CRUD();

module.exports = router;
