const express = require('express');

const Seekers = require('../models/Seeker.model');

const { RouterFactory } = require('express-router-factory');

const router = express.Router();

const RF = new RouterFactory(router, Seekers);

// Create all CRUD endpoints.
RF.CRUD();

module.exports = router;
