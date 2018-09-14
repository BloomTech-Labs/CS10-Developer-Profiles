require('dotenv').config();
const mongoose = require('mongoose');
const EmployerModel = require('./Employer.model');

const { MONGODB_URI_TEST } = process.env;

describe('Hiring Manager Model', () => {
  // Connect to MongoDB
  // prettier-ignore
  beforeAll(() => mongoose
    .connect(
      MONGODB_URI_TEST,
      // eslint-disable-next-line comma-dangle
      { useNewUrlParser: true }
      // A mongoose feature is deprecated, to fix that change it is neccesary to pass this options.
      // eslint-disable-next-line no-console
    ).catch(e => console.log('Error Connecting to DB', e)));

  // Disconnect DB
  // eslint-disable-next-line no-console
  afterAll(() => mongoose.disconnect().catch(e => console.log('Error disconecting from DB', e)));

  describe('The document is created.', () => {
    // Clean DB
    // eslint-disable-next-line no-console
    beforeAll(() => EmployerModel.deleteMany({}).catch(e => console.log("ERROR: Couldn't delete data form DB.", e)));

    // Create a new Employer
    // prettier-ignore
    beforeEach(() => EmployerModel.create({
      companyName: 'We hire talent inc',
      companyEmail: 'hiring-manager@email.com',
      password: 'Super4duper$sercret',
      hiringManagers: [
        {
          hiringManagerFirstName: 'Manager name',
          hiringManagerEmail: 'a@a.com',
          hiringManagerLastName: 'Manager last name',
        },
      ],
    }));

    // Delete all entries in DB
    // eslint-disable-next-line no-console
    afterEach(() => EmployerModel.deleteMany({}).catch(e => console.log("ERROR: Couldn't delete data form DB.", e)));

    test('should create the hiring manager document', async () => {
      const doc = await EmployerModel.findOne({ companyEmail: 'hiring-manager@email.com' });
      expect(doc).toHaveProperty('hiringManagers');
    });

    test('should have paths with key-values pairs', async () => {
      const doc = await EmployerModel.findOne({ companyEmail: 'hiring-manager@email.com' });
      const { hiringManagers } = doc;
      expect(hiringManagers[0].hiringManagerFirstName).toMatch('Manager name');
      expect(hiringManagers[0].hiringManagerEmail).toMatch('a@a.com');
      expect(hiringManagers[0].hiringManagerLastName).toMatch('Manager last name');
    });
  });
});
