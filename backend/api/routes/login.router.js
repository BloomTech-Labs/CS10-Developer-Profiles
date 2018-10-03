const express = require('express');
const { RouterFactory } = require('express-router-factory');
const { login } = require('../middleware/authentication');
const Seekers = require('../models/Seeker/Seeker.model');
const Employers = require('../models/Employer/Employer.model');

/**
 * Login endpoints for seekers and employers
 *
 * Handle login with 'login(model, req, res)' middleware
 */
const router = express.Router();
const seekersRF = new RouterFactory(router, Seekers);
const employersRF = new RouterFactory(router, Employers);

// Create login/POST endpoints.
seekersRF.POST('/seekers', 'login', login.bind(this, Seekers));
employersRF.POST('/employers', 'login', login.bind(this, Employers));

module.exports = router;
