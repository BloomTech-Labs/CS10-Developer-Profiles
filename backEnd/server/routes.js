const seekersRouter = require('../api/routes/Seeker.router');
const employerRouter = require('../api/routes/Employer.router');

module.exports = function defineRoutes(server) {
  // This serve the Seekers (Employees) DB. It allows GET, POST, PUT and DELETE
  server.use('/api/seekers', seekersRouter);

  // This serve the Employers DB. It allows GET, POST, PUT and DELETE
  server.use('/api/employers', employerRouter);

  server.get('/api', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Developer Profiles API"}');
  });
};
