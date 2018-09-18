require('dotenv').config();
const mongoose = require('mongoose');
const EmployerModel = require('./Employer.model');
const { testEmployer, testHiringManager } = require('../../utils/testData');

const { MONGODB_URI_TEST } = process.env;

describe('Hiring Manager Model', () => {
  // prettier-ignore
  beforeAll(() => mongoose
    .connect(
      MONGODB_URI_TEST,
      { useNewUrlParser: true },
      // eslint-disable-next-line no-console
    ).catch(e => console.log('Error Connecting to DB', e)));

  // eslint-disable-next-line no-console
  afterAll(() => mongoose.disconnect().catch(e => console.log('Error disconecting from DB', e)));

  describe('*** Hiring Manager document is created ***', () => {
    test('should create the hiring manager document', () => {
      const doc = new EmployerModel({ ...testEmployer, hiringManagers: testHiringManager });
      expect(doc).toHaveProperty('hiringManagers');
    });

    test('should have paths with key-values pairs', async () => {
      const doc = new EmployerModel({ ...testEmployer, hiringManagers: testHiringManager });
      const { hiringManagers } = doc;

      expect(hiringManagers[0].hiringManagerFirstName).toBe('Manager name');
      expect(hiringManagers[0].hiringManagerEmail).toBe('hiring-manager@email.com');
      expect(hiringManagers[0].hiringManagerLastName).toBe('Manager last name');
    });
  });
});
