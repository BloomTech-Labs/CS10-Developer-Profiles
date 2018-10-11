require('dotenv').config();

const mongoose = require('mongoose');
const { server } = require('./server/server');

const { PORT, MONGODB_URI } = process.env;

mongoose
  .connect(
    MONGODB_URI,
    { useNewUrlParser: true, useCreateIndex: true },
  )
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('\n*** CONNECTED to database ***\n');
    server.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`\n*** Listening on port ${PORT} ***\n`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log('\n*** ERROR connecting to database ***\n', err);
  });
