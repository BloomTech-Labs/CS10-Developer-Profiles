const express = require('express');
const { RouterFactory } = require('express-router-factory');
const Employer = require('../models/Employer/Employer.model');

const router = express.Router();

const RF = new RouterFactory(router, Employer);

// Create all CRUD endpoints.
RF.CRUD();

module.exports = router;
