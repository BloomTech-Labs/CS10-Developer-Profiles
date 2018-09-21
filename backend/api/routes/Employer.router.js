const express = require('express');
const { RouterFactory } = require('express-router-factory');
const Employer = require('../models/Employer/Employer.model');

const router = express.Router();

const RF = new RouterFactory(router, Employer);

// Set projections
RF.setProjection({ password: 0, __v: 0 });

// Create all CRUD endpoints.
RF.CRUD();

module.exports = router;
