const express = require('express');
const { RouterFactory } = require('express-router-factory');
const { register } = require('../middleware/authentication');
const Seekers = require('../models/Seeker/Seeker.model');
const Employers = require('../models/Employer/Employer.model');

/**
 * Register endpoints for seekers and employers
 *
 * Handle registration with 'register(model, req, res)' middleware
 */
const router = express.Router();
const seekersRF = new RouterFactory(router, Seekers);
const employersRF = new RouterFactory(router, Employers);

// Create register/POST endpoints.
seekersRF.POST('/seekers', register.bind(this, Seekers));
employersRF.POST('/employers', register.bind(this, Employers));

module.exports = router;
