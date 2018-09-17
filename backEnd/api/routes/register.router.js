const express = require('express');
const { RouterFactory } = require('express-router-factory');
const { register } = require('../utils/routerUtils');
const Seekers = require('../models/Seeker/Seeker.model');
const Employers = require('../models/Employer/Employer.model');

const router = express.Router();

/**
 * Seekers: register
 */
const seekersRF = new RouterFactory(router, Seekers);
// Currying Seekers model into 'login(model, req, res)' middleware
seekersRF.POST('/seekers', 'auth', register.bind(this, Seekers));

/**
 * Employers: register
 */
const employersRF = new RouterFactory(router, Employers);
// Currying Employers model into 'login(model, req, res)' middleware
employersRF.POST('/employers', 'auth', register.bind(this, Employers));

module.exports = router;
