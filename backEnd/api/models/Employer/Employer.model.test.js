// Set envirement variable NODE_ENV to 'test'
// process.env.NODE_ENV = 'test';

require('dotenv').config();
const mongoose = require('mongoose');
const EmployerModel = require('./Employer.model');

const { MONGODB_URI_TEST } = process.env;

describe('Employer Model', () => {
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

  describe('*** All created fields exist in the DB ***', () => {
    // Create a new Employer
    beforeAll(() => {
      const newEmployer = EmployerModel.create({
        companyName: 'The company inc',
        companyEmail: 'company@email.com',
        password: 'Super4duper$sercret',
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

    test('companyName is in DB', async () => {
      const doc = await EmployerModel.findOne({ companyEmail: 'company@email.com' });
      expect(doc.companyName).toMatch('The company inc');
    });

    test('companyEmail is in DB', async () => {
      const doc = await EmployerModel.findOne({ companyEmail: 'company@email.com' });
      expect(doc.companyEmail).toMatch('company@email.com');
    });

    test('password is in DB', async () => {
      const doc = await EmployerModel.findOne({ companyEmail: 'company@email.com' });
      expect(doc.password).toBeTruthy();
    });
  });

  describe('*** Validate required fields ***', () => {
    // Delete form the DB the documents created.
    afterEach(() => {
      const deletingEmployer = EmployerModel.deleteMany({});
      return deletingEmployer
        .then(response => console.log('Deleting document', response))
        .catch(e => console.log('error', e));
    });

    test('Validate companyName', () => {
      const newEmployer = EmployerModel.create({
        // companyName: 'The company inc',
        companyEmail: 'company@email.com',
        password: 'super4duper-sercret',
      });

      return newEmployer.catch(e => expect(e.name).toEqual('ValidationError'));
    });

    test('Validate companyEmail', () => {
      const newEmployer = EmployerModel.create({
        companyName: 'The company inc',
        // companyEmail: 'company@email.com',
        password: 'super4duper-sercret',
      });

      return newEmployer.catch(e => expect(e.name).toEqual('ValidationError'));
    });

    test('Validate password', () => {
      const newEmployer = EmployerModel.create({
        companyName: 'The company inc',
        companyEmail: 'company@email.com',
        // password: 'super4duper-sercret',
      });

      return newEmployer.catch(e => expect(e.name).toEqual('ValidationError'));
    });
  });

  // Test OpenPosition.embeddedModel.js
  describe('OpenPosition.embeddedModel.js', () => {});

  // Test HiringManager.embeddedModel.js
  describe('HiringManager.embeddedModel.js', () => {});
});
