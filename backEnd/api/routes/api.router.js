const express = require('express');
const seekersRouter = require('../api/routes/Seeker.router');
const employerRouter = require('../api/routes/Employer.router');
const loginRouter = require('../api/routes/login.router');
const registerRouter = require('../api/routes/register.router');
const setupAuthMiddleware = require('./middleware').auth;

const router = express.Router();

router.get('/api', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Developer Profiles API"}');
});
router.use('/api/login', loginRouter);
router.use('/api/register', registerRouter);

/**
 * Private endpoints
 * @description Validate credentials user JWT credential.
 * If credentials are no valid do not allow access to private endpoints
 */
setupAuthMiddleware(server);

// This serves the Seekers (Employees) DB. It allows GET, POST, PUT and DELETE
router.use('/api/seekers', seekersRouter);

// This serves the Employers DB. It allows GET, POST, PUT and DELETE
router.use('/api/employers', employerRouter);
