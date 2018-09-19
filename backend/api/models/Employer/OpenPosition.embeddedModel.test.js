require('dotenv').config();
const mongoose = require('mongoose');
const EmployerModel = require('./Employer.model');
const { testEmployer, testOpenPositions } = require('../../utils/testData');

const { MONGODB_URI_TEST } = process.env;

describe('Open Position Model', () => {
  // prettier-ignore
  beforeAll(() => mongoose
    .connect(
      MONGODB_URI_TEST,
      { useNewUrlParser: true },
      // eslint-disable-next-line no-console
    ).catch(e => console.log('Error Connecting to DB', e)));

  // eslint-disable-next-line no-console
  afterAll(() => mongoose.disconnect().catch(e => console.log('Error disconecting from DB', e)));

  describe('*** The document is created ***', () => {
    test('should create the open position document', async () => {
      const doc = new EmployerModel({ ...testEmployer, openPositions: testOpenPositions });

      expect(doc).toHaveProperty('openPositions');
    });

    test('should have paths with key-values pairs', async () => {
      const doc = new EmployerModel({ ...testEmployer, openPositions: testOpenPositions });
      const { openPositions } = doc;

      expect(openPositions[0].jobTitle).toBe('Super Developer');
      expect(openPositions[0].projectName).toBe('Super project');
    });
  });
});
