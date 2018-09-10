/*
  IMPORT API ROUTES

  Ex:
  const { tasksRouter } = require('../api/routes/tasks');
  const { usersRouter } = require('../api/routes/users');
*/

module.exports = function(server) {
  /*
    ADD API ROUTES TO SERVER

    Ex:
    server.use('/api/tasks', tasksRouter);
    server.use('/api/users', usersRouter);
  */

  server.get('/api', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Developer Profiles API"}');
  });
};
