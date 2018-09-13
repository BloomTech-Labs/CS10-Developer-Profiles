// Set envirement variable NODE_ENV to 'test'
// process.env.NODE_ENV = 'test';

require('dotenv').config();
const mongoose = require('mongoose');
const EmployerModel = require('./Employer.model');

const { MONGODB_URI_TEST } = process.env;

describe('Hiring Manager Model', () => {
  EmployerModel.deleteMany({});
  // Connect to MongoDB
  beforeAll(() => {
    const connect = mongoose.connect(
      MONGODB_URI_TEST,
      { useNewUrlParser: true }
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
      const newEmployer = EmployerModel.create({
        companyName: 'The company inc',
        companyEmail: 'company@email.com',
        password: 'Super4duper$sercret',
        hiringManagers: [
          {
            hiringManagerFirstName: 'Manager name',
            hiringManagerEmail: 'a@a.com',
            hiringManagerLastName: 'Manager last name',
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

    test('should create the hiring manager document', async () => {
      const doc = await EmployerModel.findOne({ companyEmail: 'company@email.com' });
      expect(doc).toHaveProperty('hiringManagers');
    });

    test('should have paths and values', async () => {
      const doc = await EmployerModel.findOne({ companyEmail: 'company@email.com' });
      const { hiringManagers } = doc;
      expect(hiringManagers[0].hiringManagerFirstName).toMatch('Manager name');
      expect(hiringManagers[0].hiringManagerEmail).toMatch('a@a.com');
      expect(hiringManagers[0].hiringManagerLastName).toMatch('Manager last name');
    });
  });
});
