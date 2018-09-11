/*
  IMPORT API ROUTES

  Ex:
  const { usersRouter } = require('../api/routes/users');
*/
const seekersRouter = require('../api/routes/Seeker.router');

module.exports = function(server) {
  /*
    ADD API ROUTES TO SERVER

    Ex:
    server.use('/api/tasks', tasksRouter);
  */
  server.use('/api/seekers', seekersRouter);

  server.get('/api', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Developer Profiles API"}');
  });
};
