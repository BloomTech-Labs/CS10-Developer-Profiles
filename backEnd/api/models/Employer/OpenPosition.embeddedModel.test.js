require('dotenv').config();
const mongoose = require('mongoose');
const EmployerModel = require('./Employer.model');

const { MONGODB_URI_TEST } = process.env;

describe('Open Position Model', () => {
  // Connect to MongoDB
  beforeAll(() => {
    const connect = mongoose.connect(
      MONGODB_URI_TEST,
      { useNewUrlParser: true } // A mongo feature is deprecated, to fix that change it is neccesary to pass this options.
    );
    // const connect = mongoose.connect('mongodb://localhost/testdb');
    return connect
      .then(() => console.log('\n=== connected to TEST DB ==='))
      .catch(e => console.log('Error Connecting to DB', e));
  });

  // Disconnect DB
  afterAll(() => {
    const disconnect = mongoose.disconnect();
    return disconnect
      .then(() => console.log('\n=== disconnected from TEST DB ==='))
      .catch(e => console.log('error', e));
  });

  describe('The document is created.', () => {
    // Create a new Employer
    beforeAll(() => {
      // Clean DB
      EmployerModel.deleteMany({});

      const newEmployer = EmployerModel.create({
        companyName: 'We hire talent inc',
        companyEmail: 'hiring-manager@email.com',
        password: 'Super4duper$sercret',
        openPositions: [
          {
            jobTitle: 'Super Developer',
            projectName: 'Super project',
          },
        ],
      });

      return newEmployer.then(() => console.log('Document created')).catch(e => console.log('error', { e }));
    });

    // Delete all entries in DB
    afterAll(() => {
      const deletingEmployer = EmployerModel.deleteMany({});

      return deletingEmployer
        .then(response => console.log('Deleting all documents', response))
        .catch(e => console.log('error', e));
    });

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
