require('dotenv').config();

const mongoose = require('mongoose');
const educationSchema = require('./Education.embeddedModel');

const { MONGODB_URI_TEST } = process.env;
const Education = mongoose.model('Education', educationSchema);

describe('education model', () => {
  beforeAll(() => mongoose.connect(MONGODB_URI_TEST));

  afterAll(() => mongoose.disconnect());

  it('should require school, fieldOfStudy, startYear', () => {

  });
});
