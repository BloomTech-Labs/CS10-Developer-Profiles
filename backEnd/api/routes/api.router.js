const express = require('express');
const seekersRouter = require('./Seeker.router');
const employerRouter = require('./Employer.router');
const loginRouter = require('./login.router');
const registerRouter = require('./register.router');

const router = express.Router();

module.exports = (userHasToken) => {
  router.get('/', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Developer Profiles API"}');
  });

  router.use('/login', loginRouter);
  router.use('/register', registerRouter);

  /**
   * Private endpoints
   * @description Validate credentials user JWT credential.
   * If credentials are no valid do not allow access to private endpoints
   */
  router.use(userHasToken);

  // This serves the Seekers (Employees) DB. It allows GET, POST, PUT and DELETE
  router.use('/seekers', userHasToken, seekersRouter);

  // This serves the Employers DB. It allows GET, POST, PUT and DELETE
  router.use('/employers', userHasToken, employerRouter);

  return router;
};
