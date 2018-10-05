const path = require('path');
const seekersRouter = require('../api/routes/Seeker.router');
const employerRouter = require('../api/routes/Employer.router');
const loginRouter = require('../api/routes/login.router');
const registerRouter = require('../api/routes/register.router');
const stripeRouter = require('../payments/routes/stripe.router');
const forgotPasswordRouter = require('../api/routes/ForgotPassword.router');

module.exports = {
  routes: (server) => {
    server.use('/payments/stripe', stripeRouter);
    server.use('/api/login', loginRouter);
    server.use('/api/register', registerRouter);
    server.use('/api/seekers', seekersRouter);
    server.use('/api/employers', employerRouter);
    server.use('/api/saveresethash', forgotPasswordRouter);
    server.get('/api', (req, res) => {
      res.set('Content-Type', 'application/json');
      res.send('{"message":"Developer Profiles API"}');
    });

    // In production build all other requests are handled by the frontend
    if (process.env.NODE_ENV === 'production') {
      server.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../frontend/lambda-in/build', 'index.html'));
      });
    } else {
      server.get('*', (req, res) => {
        res.set('Content-Type', 'application/json');
        res.send('{"message":"On production build this action will result in a redirect to the frontend."}');
      });
    }
  },
};
