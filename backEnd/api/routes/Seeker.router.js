const express = require('express');
const { RouterFactory } = require('express-router-factory');
const Seekers = require('../models/Seeker/Seeker.model');

const router = express.Router();

const RF = new RouterFactory(router, Seekers);

// Create all CRUD endpoints.
RF.CRUD();

module.exports = router;
