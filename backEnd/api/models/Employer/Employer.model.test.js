require('dotenv').config();
const mongoose = require('mongoose');
const EmployerModel = require('./Employer.model');

const { MONGODB_URI_TEST } = process.env;

describe('Employer Model', () => {
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

  // TESTING MONOG DB
  describe('*** All created fields exist in the DB ***', () => {
    // Create a new Employer
    beforeAll(async () => {
      // Clean DB
      EmployerModel.deleteMany({});

      // Create a new Employer document
      const newEmployer = await EmployerModel.create({
        companyName: 'The company inc',
        companyEmail: 'company@email.com',
        password: 'Super4duper$sercret',
      });

      // return newEmployer.then(() => console.log('Document created')).catch(e => console.log('error', { e }));
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

  // TESTING VALIDATION OF REQUIRED FIELDS
  describe('*** Validate required fields ***', () => {
    // Delete form the DB the documents created.
    afterEach(() => {
      const deletingEmployer = EmployerModel.deleteMany({});
      return deletingEmployer
        .then(response => console.log('Deleting document', response))
        .catch(e => console.log('error', e));
    });

    test('should require companyName', () => {
      const newEmployer = EmployerModel.create({
        // companyName: 'The company inc',
        companyEmail: 'company@email.com',
        password: 'super4duper-sercret',
      });

      return newEmployer.catch(e => expect(e.name).toEqual('ValidationError'));
    });

    test('should require companyEmail', () => {
      const newEmployer = EmployerModel.create({
        companyName: 'The company inc',
        // companyEmail: 'company@email.com',
        password: 'super4duper-sercret',
      });

      return newEmployer.catch(e => expect(e.name).toEqual('ValidationError'));
    });

    test('should require password', () => {
      const newEmployer = EmployerModel.create({
        companyName: 'The company inc',
        companyEmail: 'company@email.com',
        // password: 'super4duper-sercret',
      });

      return newEmployer.catch(e => expect(e.name).toEqual('ValidationError'));
    });
  });

  // TEST THAT THE PASSWORD IS HASHED. THAT REQUIRES A PRE-SAVE HOOK TO BE CALLED
  describe('should use the pre save hook', () => {
    beforeAll(() => {
      // Clean DB
      EmployerModel.deleteMany({});

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

    test('password is hashed', async () => {
      const doc = await EmployerModel.findOne({ companyEmail: 'company@email.com' });
      // Hashed passwords must have a length === 60
      expect(doc.password).toHaveLength(60);
    });
  });
});
