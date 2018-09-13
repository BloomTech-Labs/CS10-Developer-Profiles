const express = require('express');
const utils = require('../utils/authUtils');
const Seeker = require('../models/Seeker/Seeker.model');
// const Employers = require('../models/Employer/Employer.model');
const { RouterFactory } = require('express-router-factory');

const router = express.Router();

const RF = new RouterFactory(router, Seeker);

RF.POST('/', "auth" ,loginSeeker);


/**
 * ROUTER HANDLERS: handle endpoints
 */

function loginSeeker(req, res, next) {
  const { email, password } = req.body;
  console.log("email", email, "password", password)
  Seeker.findOne({ email }, { firstName: 1, password: 1, _id: 1 })
    .then(user => {
      const { _id, firstName } = user;
      console.log(firstName);
      user
        .isValidPassword(password)
        .then(validPassword => {
          if (!validPassword)
            return res
              .status(422)
              .json({ 'Bad Credentials': 'Please, check your credentials, there are some wrong data.' });

          const jwt = utils.createToken({ _id, email });
          res.status(200).json({ firstName, email, jwt });
        })
        .catch(e => {
          console.log('error', e);
          res.status(404).json({ e });
        });
    })
    .catch(e => {
      console.log('error', e);
      res.status(500).json({ e });
    });
}

module.exports = router;