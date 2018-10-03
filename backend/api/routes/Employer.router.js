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

// Create all CRUD endpoints.
employerRF.POST('/', userHasToken.bind(this), 'handlePOST');
employerRF.GET('/', userHasToken.bind(this), 'handleGET');
employerRF.GET_id('/:id', userHasToken.bind(this), 'handleGET');
employerRF.PUT('/:id', userHasToken.bind(this), 'handlePUT');
employerRF.DELETE('/:id', userHasToken.bind(this), 'handleDELETE');

module.exports = router;
