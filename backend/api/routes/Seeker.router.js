const express = require('express');
const { RouterFactory } = require('express-router-factory');
const Seekers = require('../models/Seeker/Seeker.model');

const router = express.Router();

const RF = new RouterFactory(router, Seekers);

// Set projections
RF.setProjection({ password: 0, __v: 0 });

// Create all CRUD endpoints.
RF.CRUD();

module.exports = router;
