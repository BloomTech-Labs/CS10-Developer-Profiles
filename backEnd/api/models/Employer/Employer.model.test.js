require('dotenv').config();
const mongoose = require('mongoose');
const EmployerModel = require('./Employer.model');

const { MONGODB_URI_TEST } = process.env;

describe('*** Employer Model ***', () => {
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

  // TESTING MONOG DB
  describe('*** All created fields exist in the DB ***', () => {
    // Create a new Employer
    beforeAll(async () => {
      // Clean DB
      // eslint-disable-next-line no-console
      await EmployerModel.deleteMany({}).catch(e => console.log("ERROR: Couldn't delete data form DB.", e));

      // Create a new Employer document
      await EmployerModel.create({
        companyName: 'The company inc',
        companyEmail: 'company@email.com',
        password: 'Super4duper$sercret',
      });
    });

    // Delete all entries in DB
    afterAll(async () => {
      // eslint-disable-next-line no-console
      await EmployerModel.deleteMany({}).catch(e => console.log("ERROR: Couldn't delete data form DB.", e));
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
      // eslint-disable-next-line no-console
      await EmployerModel.deleteMany({}).catch(e => console.log("ERROR: Couldn't delete data form DB.", e));
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
      // eslint-disable-next-line no-console
      await EmployerModel.deleteMany({}).catch(e => console.log("ERROR: Couldn't delete data form DB.", e));

      // Create a new Employer document
      await EmployerModel.create({
        companyName: 'The company inc',
        companyEmail: 'company@email.com',
        password: 'Super4duper$sercret',
      });
    });

    // Delete all entries in DB
    afterAll(async () => {
      // eslint-disable-next-line no-console
      await EmployerModel.deleteMany({}).catch(e => console.log("ERROR: Couldn't delete data form DB.", e));
    });

    test('password is hashed', async () => {
      const doc = await EmployerModel.findOne({ companyEmail: 'company@email.com' });
      // Hashed passwords must have a length === 60
      expect(doc.password).toHaveLength(60);
    });
  });
});
