const express = require('express');
const utils = require('../utils/authUtils');
const Employer = require('../models/Employer/Employer.model');
const { RouterFactory } = require('express-router-factory');

const router = express.Router();

const RF = new RouterFactory(router, Employer);

RF.POST('/', "auth" ,loginEmployer);


/**
 * ROUTER HANDLERS: handle endpoints
 */


function loginEmployer(req, res, next) {
  const { companyEmail, password } = req.body;
  //console.log("email", companyEmail, "password", password)
  Employer.findOne({ companyEmail }, { companyName: 1, password: 1, _id: 1 })
    .then(user => {
      const { _id, companyName } = user;
      console.log(companyName);
      user
        .isValidPassword(password)
        .then(validPassword => {
          if (!validPassword)
            return res
              .status(422)
              .json({ 'Bad Credentials': 'Please, check your credentials, there are some wrong data.' });

          const jwt = utils.createToken({ _id, companyEmail });
          res.status(200).json({ companyName, companyEmail, jwt });
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