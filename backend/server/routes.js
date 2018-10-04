const path = require('path');
const seekersRouter = require('../api/routes/Seeker.router');
const employerRouter = require('../api/routes/Employer.router');
const loginRouter = require('../api/routes/login.router');
const registerRouter = require('../api/routes/register.router');
const stripeRouter = require('../payments/routes/stripe.router');
const setupAuthMiddleware = require('./middleware').auth;
const setUpApiRouter = require('../api/routes/api.router');
const { userHasToken } = require('../api/utils/authUtils');

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
    server.use('/api', setUpApiRouter(userHasToken));
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
