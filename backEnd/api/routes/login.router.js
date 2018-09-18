const express = require('express');
const { RouterFactory } = require('express-router-factory');
const { login } = require('../utils/routerUtils');
const Seekers = require('../models/Seeker/Seeker.model');
const Employers = require('../models/Employer/Employer.model');

const router = express.Router();

/**
 * Seekers: login
 */
const seekersRF = new RouterFactory(router, Seekers);
// Currying Seekers model into 'login(model, req, res)' middleware
seekersRF.POST('/seekers', 'login', login.bind(this, Seekers));

/**
 * Employers: login
 */
const employersRF = new RouterFactory(router, Employers);
// Currying Employers model into 'login(model, req, res)' middleware
employersRF.POST('/employers', 'login', login.bind(this, Employers));

module.exports = router;
