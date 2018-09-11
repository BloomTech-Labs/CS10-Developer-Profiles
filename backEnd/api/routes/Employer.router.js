const express = require('express');

const Employer = require('../models/Employer/Employer.model');

const { RouterFactory } = require('express-router-factory');

const router = express.Router();

const RF = new RouterFactory(router, Employer);

// Create all CRUD endpoints.
RF.CRUD();

module.exports = router;
