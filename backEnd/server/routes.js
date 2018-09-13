const seekersRouter = require('../api/routes/Seeker.router');
const employerRouter = require('../api/routes/Employer.router');
const seekerLoginRouter = require('../api/routes/login.router')

module.exports = (server) => {
  server.use('/api/seekers', seekersRouter);
  server.use('/api/employers', employerRouter);
  server.use('/api/login/seekers', seekerLoginRouter )

  server.get('/api', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Developer Profiles API"}');
  });
};
