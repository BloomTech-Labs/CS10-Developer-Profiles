require('dotenv').config();
const mongoose = require('mongoose');
const EmployerModel = require('./Employer.model');

const { MONGODB_URI_TEST } = process.env;

describe('Employer Model', () => {
  // Connect to MongoDB
  beforeAll(() => mongoose.connect(MONGODB_URI_TEST).catch(e => console.log('Error Connecting to DB', e)));

  // Disconnect DB
  afterAll(async () => {
    const disconnect = await mongoose.disconnect();

    disconnect.catch(e => console.log('Error disconecting from DB', e));
  });

  // TESTING MONOG DB
  describe('*** All created fields exist in the DB ***', () => {
    // Create a new Employer
    beforeAll(async () => {
      // Clean DB
      await EmployerModel.deleteMany({}).catch(e => console.log('ERROR: Could delete data form DB.', e));

      // Create a new Employer document
      await EmployerModel.create({
        companyName: 'The company inc',
        companyEmail: 'company@email.com',
        password: 'Super4duper$sercret',
      });
    });

    // Delete all entries in DB
    afterAll(async () => {
      await EmployerModel.deleteMany({}).catch(e => console.log('ERROR: Could delete data form DB.', e));
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
    afterEach(async () => {
      await EmployerModel.deleteMany({}).catch(e => console.log('ERROR: Could delete data form DB.', e));
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
    beforeAll(async () => {
      // Clean DB
      await EmployerModel.deleteMany({});

      // Create a new Employer document
      await EmployerModel.create({
        companyName: 'The company inc',
        companyEmail: 'company@email.com',
        password: 'Super4duper$sercret',
      });
    });

    // Delete all entries in DB
    afterAll(async () => {
      await EmployerModel.deleteMany({}).catch(e => console.log('ERROR: Could delete data form DB.', e));
    });

    test('password is hashed', async () => {
      const doc = await EmployerModel.findOne({ companyEmail: 'company@email.com' });
      // Hashed passwords must have a length === 60
      expect(doc.password).toHaveLength(60);
    });
  });
});
