// Set envirement variable NODE_ENV to 'test'
// process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const EmployerModel = require('./Employer.model');

describe('Employer Model', () => {
  // Connect to MongoDB
  beforeAll(() => {
    const connect = mongoose.connect(process.env.MONGODB_URI_TEST);
    return connect.then(() => console.log('\n=== connected to TEST DB ===')).catch(e => console.log('error', e));
  });

  // Disconnect DB
  afterAll(() => {
    const disconnect = mongoose.disconnect();
    return disconnect
      .then(() => console.log('\n=== disconnected from TEST DB ==='))
      .catch(e => console.log('error', e));
  });

  // Test Employer.model.js (Without the Embedded Docs)
  describe('Employer.model.js', () => {
    // Create mockup data
    const requiredFields = {
      companyName: 'The company inc',
      companyEmail: 'company@email.com',
      password: 'super4duper-sercret',
    };

    // delte form DB the data created by each test
    afterEach(() => {
      const deletingEmployer = EmployerModel.remove({});
      return deletingEmployer
        .then(response => console.lo('Deleting document', response))
        .catch(e => console.log('error', e));
    });

    test('Validate companyName', () => {
      const newEmployer = EmployerModel.create({
        // companyName is missing here
        companyEmail: 'company@email.com',
        password: 'super4duper-sercret',
      });

      return newEmployer.catch(e => expect(e.name).toEqual('ValidationError'));
    });
  });

  // Test OpenPosition.embeddedModel.js
  describe('OpenPosition.embeddedModel.js', () => {});

  // Test HiringManager.embeddedModel.js
  describe('HiringManager.embeddedModel.js', () => {});
});
