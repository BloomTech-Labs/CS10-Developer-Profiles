const bcrypt = require('bcrypt');
require('dotenv').config();
const mongoose = require('mongoose');
const EmployerModel = require('./Employer.model');
const { testEmployer } = require('../../utils/testData');

const { MONGODB_URI_TEST } = process.env;

describe('Employer Model', () => {
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
    test('should exist companyName, email and password in the Mongoose document', () => {
      const employer = new EmployerModel(testEmployer);

      expect(employer.companyName).toBe('The company inc');
      expect(employer.email).toBe('company@email.com');
      expect(employer.password).toBe('Super4duper$sercret');
    });
  });

  // TESTING VALIDATION OF REQUIRED FIELDS
  describe('*** Validate required fields ***', () => {
    // Delete form the DB the documents created.
    afterEach(async () => {
      // eslint-disable-next-line no-console
      await EmployerModel.deleteMany({}).catch(e => console.log("ERROR: Couldn't delete data form DB.", e));
    });

    // prettier-ignore
    test('should require companyName', (done) => {
      const badData = { ...testEmployer };
      delete badData.companyName;

      const newEmployer = EmployerModel.create(badData);

      // prettier-ignore
      return newEmployer.catch((e) => {
        expect(e.name).toEqual('ValidationError');
        expect(e.errors).toHaveProperty('companyName');
        expect(e.errors).not.toHaveProperty('email');
        expect(e.errors).not.toHaveProperty('password');
        done();
      });
    });

    // prettier-ignore
    test('should require email', (done) => {
      const badData = { ...testEmployer };
      delete badData.email;

      const newEmployer = EmployerModel.create(badData);

      // prettier-ignore
      return newEmployer.catch((e) => {
        expect(e.name).toEqual('ValidationError');
        expect(e.errors).not.toHaveProperty('companyName');
        expect(e.errors).toHaveProperty('email');
        expect(e.errors).not.toHaveProperty('password');
        done();
      });
    });

    // prettier-ignore
    test('should require password', (done) => {
      const badData = { ...testEmployer };
      delete badData.password;

      const newEmployer = EmployerModel.create(badData);

      // prettier-ignore
      return newEmployer.catch((e) => {
        expect(e.name).toEqual('ValidationError');
        expect(e.errors).not.toHaveProperty('companyName');
        expect(e.errors).not.toHaveProperty('email');
        expect(e.errors).toHaveProperty('password');
        done();
      });
    });
  });

  // TEST THAT THE PASSWORD IS HASHED. THAT REQUIRES A PRE-SAVE HOOK TO BE CALLED
  describe('*** Methods and pre-save hook ***', () => {
    beforeAll(async () => {
      // Clean DB
      // eslint-disable-next-line no-console
      await EmployerModel.deleteMany({}).catch(e => console.log("ERROR: Couldn't delete data form DB.", e));

      // Create a new Employer document
      await EmployerModel.create(testEmployer);
    });

    // Delete all entries in DB
    afterAll(async () => {
      // eslint-disable-next-line no-console
      await EmployerModel.deleteMany({}).catch(e => console.log("ERROR: Couldn't delete data form DB.", e));
    });

    describe('== isValidPassword Method ==', () => {
      test('should return `true` is password is valid', async () => {
        const doc = await EmployerModel.findOne({ email: 'company@email.com' });

        const isValidPassword = await doc.isValidPassword('Super4duper$sercret', doc.password);
        expect(isValidPassword).toBeTruthy();

        const isNotValidPassword = await doc.isValidPassword('wrong-password-Super4duper$sercret', doc.password);
        expect(isNotValidPassword).toBeFalsy();
      });
    });

    describe('== Pre-save hook ==', () => {
      test('should be the password hashed', async () => {
        const doc = await EmployerModel.findOne({ email: 'company@email.com' });
        expect(doc.password).toHaveLength(60);
      });

      test('should match test-hashed-password with the hashed password in DB', async () => {
        const doc = await EmployerModel.findOne({ email: 'company@email.com' });
        let testHashedPassword;
        bcrypt.hash('Super4duper$sercret', 12, (err, hash) => {
          testHashedPassword = hash;
        });

        expect(doc.password).toMatch(new RegExp(testHashedPassword));
      });
    });
  });
});
