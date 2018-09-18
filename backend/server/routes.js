const path = require('path');
const seekersRouter = require('../api/routes/Seeker.router');
const employerRouter = require('../api/routes/Employer.router');
const loginRouter = require('../api/routes/login.router');
const registerRouter = require('../api/routes/register.router');

// prettier-ignore
module.exports = (server) => {
  server.use('/api/seekers', seekersRouter);
  server.use('/api/employers', employerRouter);
  server.use('/api/login', loginRouter);
  server.use('/api/register', registerRouter);

  server.get('/api', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Developer Profiles API"}');
  });

  server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../frontend/lambda-in/build', 'index.html'));
  });
};
