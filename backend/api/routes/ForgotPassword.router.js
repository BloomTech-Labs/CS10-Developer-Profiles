/* eslint-disable */
const express = require('express');
const { RouterFactory } = require('express-router-factory');
const { getSeekers } = require('../middleware/getters');
const Seekers = require('../models/Seeker/Seeker.model');
const async = require("async");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/', function(req, res, next) {
  console.log(req.body)
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      Seekers.findOne({ email: req.body.email }, function(err, Seekers) {
        console.log(req.body)
        if (!Seekers) {
          console.log("boo")
          res
            .status(204)
            .json({ 'error': 'No account with that email address exists.' });
          return;
        }

        Seekers.resetPasswordToken = token;
        Seekers.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        Seekers.save(function(err) {
          done(err, token, Seekers);
        });
      });
    },
    function(token, Seekers, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'SendGrid', 
        auth: {
          user: process.env.SENDGRIDUSER,
          pass: process.env.SENDGRIDKEY
        }
      });
      var mailOptions = {
        to: Seekers.email,
        from: 'noreply@meetdev.com',
        subject: 'Meet Dev Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/api/saveresethash' + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        console.log('mail sent');
        res
          .status(200)
          .json({ 'success': 'An e-mail has been sent to ' + Seekers.email + ' with further instructions.'});
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res
      .status(400)
      .json({ 'error': 'something went horribly wrong! we are working get things back up!'});
  });
});

router.post('/reset/:token', function(req, res) {
  console.log(req.params.token)
  Seekers
    .findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } })
    .then(item => {
      console.log('item', item);

      bcrypt.hash(req.body.password, 12, (err, hash) => {
        // console.log("boo");
        if (err){
          res.status(500).json({ error: "the password couldn't be changed"})
        } 
        Seekers
          .findByIdAndUpdate(item._id, {password: hash})
          .then(item2 => {
            // Seekers.resetPasswordToken = "";
            // Seekers.resetPasswordExpires = ""; // 1 hour
            console.log('item2',item2);
            res.status(200).json({ success: "Your password has been changed successfully!"});
            //redirect user to login page
          })
          .catch(err => {
              res.status(500).json({ error: "sorry! password couldn't be modefied"})
          })
      });
      
    })
    .catch(err => {
        res.status(500).json({ error: "the password couldn't be changed"})
    })
});



  module.exports = router;