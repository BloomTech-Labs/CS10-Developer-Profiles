const seekersRouter = require('../api/routes/Seeker.router');
const employerRouter = require('../api/routes/Employer.router');
const loginRouter = require('../api/routes/login.router');

// prettier-ignore
module.exports = (server) => {
  server.use('/api/seekers', seekersRouter);
  server.use('/api/employers', employerRouter);
  server.use('/api/login', loginRouter);

  server.get('/api', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Developer Profiles API"}');
  });
};
