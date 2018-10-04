const path = require('path');
const seekersRouter = require('../api/routes/Seeker.router');
const employerRouter = require('../api/routes/Employer.router');
const loginRouter = require('../api/routes/login.router');
const registerRouter = require('../api/routes/register.router');
const stripeRouter = require('../payments/routes/stripe.router');
const setupAuthMiddleware = require('./middleware').auth;

module.exports = {
  public: (server) => {
    // In production build all other requests are handled by the frontend
    // prettier-ignore
    if (process.env.NODE_ENV === 'production') {
      server.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../frontend/lambda-in/build', 'index.html'));
      });
    }
  },
  api: (server) => {
    server.use('/api/login', loginRouter);
    server.use('/api/register', registerRouter);
    server.get('/api', (req, res) => {
      res.set('Content-Type', 'application/json');
      res.send('{"message":"Developer Profiles API"}');
    });

    /**
     * Private endpoints
     * @description Validate credentials user JWT credential.
     * If credentials are no valid do not allow access to private endpoints
     */
    setupAuthMiddleware(server);

    // This serves the Seekers (Employees) DB. It allows GET, POST, PUT and DELETE
    server.use('/api/seekers', seekersRouter);

    // This serves the Employers DB. It allows GET, POST, PUT and DELETE
    server.use('/api/employers', employerRouter);
  },
  payments: {
    /**
     * Define an endpoint to process Stripe payment requests
     */
    stripe: (server) => {
      server.use('/payments/stripe', stripeRouter);
    },
  },
};
