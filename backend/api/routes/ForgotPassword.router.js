/* eslint-disable */
const express = require('express');
const { RouterFactory } = require('express-router-factory');
const { getSeekers } = require('../middleware/getters');
const Seekers = require('../models/Seeker/Seeker.model');
const passport = require("passport");
const async = require("async");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const router = express.Router();

router.post('/', async (req, res) => {
   
    // res.send({}).status(200)
    
    let result;
    try {
      // check and make sure the email exists
      const query = Seekers.findOne({ email: req.body.email });
      console.log(query)
      // If the user exists, save their password hash
      const timeInMs = Date.now();
      const hashString = `${req.body.email}${timeInMs}`;
      const secret = 'alongrandomstringshouldgohere';
     
      const hash = crypto.createHmac('sha256', secret)
                         .update(hashString)
                         .digest('hex');
        
      foundUser.passwordReset = hash;
      
      foundUser.save((err) => {
        if (err) { result = res.send(JSON.stringify({ error: 'Something went wrong while attempting to reset your password. Please Try again' })); }
        result = res.send(JSON.stringify({ success: true }));
      });
    } catch (err) {
      // if the user doesn't exist, error out
      result = res.send(JSON.stringify({ error: 'Something went wrong while attempting to reset your password. Please Try again' }));
    }
    return result;
  });

  module.exports = router;