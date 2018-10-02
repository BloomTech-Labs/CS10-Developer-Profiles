/* eslint-disable */
const express = require('express');
const { RouterFactory } = require('express-router-factory');
const { getSeekers } = require('../middleware/getters');
const Seekers = require('../models/Seeker/Seeker.model');
const passport = require("passport");
const async = require("async");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
/**
 * Seekers CRUD endpoints
 *
 * Handle POST, GET/:id, PUT and DELETE with default Router Factory
 * Handle GET with custom middleware
 */
const router = express.Router();


const seekersRF = new RouterFactory(router, Seekers);

seekersRF.setProjection({ password: 0, __v: 0 });
seekersRF.POST();
seekersRF.GET('/', getSeekers.bind(this, Seekers));
seekersRF.GET_id();
seekersRF.PUT();
seekersRF.DELETE();

module.exports = router;
