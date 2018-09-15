require('dotenv').config();
const mongoose = require('mongoose');
const EmployerModel = require('./Employer.model');

const { MONGODB_URI_TEST } = process.env;

describe('Open Position Model', () => {
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

  describe('*** The document is created ***', () => {
    // Create a new Employer
    // eslint-disable-next-line no-console
    beforeAll(() => EmployerModel.deleteMany({}).catch(e => console.log("ERROR: Couldn't delete data form DB.", e)));

    // Create a new Employer
    // prettier-ignore
    beforeEach(() => EmployerModel.create({
      companyName: 'We hire talent inc',
      companyEmail: 'hiring-manager@email.com',
      password: 'Super4duper$sercret',
      openPositions: [
        {
          jobTitle: 'Super Developer',
          projectName: 'Super project',
        },
      ],
    }));

    // Delete all entries in DB
    // eslint-disable-next-line no-console
    afterEach(() => EmployerModel.deleteMany({}).catch(e => console.log("ERROR: Couldn't delete data form DB.", e)));

    test('should create the open position document', async () => {
      const doc = await EmployerModel.findOne({ companyEmail: 'hiring-manager@email.com' });
      expect(doc).toHaveProperty('openPositions');
    });

    test('should have paths with key-values pairs', async () => {
      const doc = await EmployerModel.findOne({ companyEmail: 'hiring-manager@email.com' });
      const { openPositions } = doc;
      expect(openPositions[0].jobTitle).toMatch('Super Developer');
      expect(openPositions[0].projectName).toMatch('Super project');
    });
  });
});
