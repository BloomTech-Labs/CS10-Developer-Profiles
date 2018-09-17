const seekersRouter = require('../api/routes/Seeker.router');
const employerRouter = require('../api/routes/Employer.router');
const loginRouter = require('../api/routes/login.router');
const registerRouter = require('../api/routes/register.router');

<<<<<<< HEAD
module.exports = function defineRoutes(server) {
  // This serve the Seekers (Employees) DB. It allows GET, POST, PUT and DELETE
||||||| merged common ancestors
module.exports = (server) => {
=======
// prettier-ignore
module.exports = (server) => {
>>>>>>> 81d1b4fd39d7d1d01d5240a26d8f68cbb5837f49
  server.use('/api/seekers', seekersRouter);

  // This serve the Employers DB. It allows GET, POST, PUT and DELETE
  server.use('/api/employers', employerRouter);
  server.use('/api/login', loginRouter);
  server.use('/api/register', registerRouter);

  server.get('/api', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Developer Profiles API"}');
  });
};
