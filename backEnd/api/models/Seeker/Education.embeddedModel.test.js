require('dotenv').config();

const mongoose = require('mongoose');
const educationSchema = require('./Education.embeddedModel');

const { MONGODB_URI_TEST } = process.env;
const Education = mongoose.model('Education', educationSchema);

describe('education model', () => {
  beforeAll(() => mongoose
    .connect(
      MONGODB_URI_TEST,
      { useNewUrlParser: true },
    )
    // eslint-disable-next-line no-console
    .then(() => console.log('\n*** CONNECTED to database ***\n'))
    // eslint-disable-next-line no-console
    .catch(err => console.log('\n*** ERROR connecting to database ***\n', err)));

  afterAll(() => mongoose.disconnect()
    // eslint-disable-next-line no-console
    .then(() => console.log('\n*** DISCONNECTED from database ***\n'))
    // eslint-disable-next-line no-console
    .catch(err => console.log('\n*** ERROR disconnecting from database ***\n', err)));

  it('should require school, fieldOfStudy, startYear', () => {

  });
});
