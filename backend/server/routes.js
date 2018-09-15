const path = require('path');
const seekersRouter = require('../api/routes/Seeker.router');
const employerRouter = require('../api/routes/Employer.router');

module.exports = (server) => {
  // Handle API requests
  server.use('/api/seekers', seekersRouter);
  server.use('/api/employers', employerRouter);

  server.get('/api', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Developer Profiles API"}');
  });

  // In production build all other requests return the frontend client
  if (process.NODE_ENV === 'production') {
    server.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../../frontend/lambda-in/build', 'index.html'));
    });
  }
};
