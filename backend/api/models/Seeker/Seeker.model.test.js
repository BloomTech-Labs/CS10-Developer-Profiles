require('dotenv').config();

const mongoose = require('mongoose');
const Seeker = require('./Seeker.model');
const { testSeeker, invalidEmails, validEmails } = require('../../utils/testData');

const { MONGODB_URI_TEST } = process.env;

describe('Seeker Model', () => {
  describe('*** Validation ***', () => {
    it('should require firstName, lastName, password, email', (done) => {
      const seeker = new Seeker();

      seeker.validate((err) => {
        expect(err.errors).toHaveProperty('firstName');
        expect(err.errors).toHaveProperty('lastName');
        expect(err.errors).toHaveProperty('password');
        expect(err.errors).toHaveProperty('email');
        done();
      });
    });

    it('should disallow passwords shorter than 8 characters', (done) => {
      const invalidData = Object.assign({}, testSeeker, { password: 'Pa3&' });
      const seeker = new Seeker(invalidData);

      seeker.validate((err) => {
        expect(err.errors).toHaveProperty('password');
        done();
      });
    });

    it('should force passwords to have 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character', (done) => {
      const invalidData = Object.assign({}, testSeeker, { password: 'Password123' });
      const seeker = new Seeker(invalidData);

      seeker.validate((err) => {
        expect(err.errors).toHaveProperty('password');
        done();
      });
    });

    it('should disallow invalid email formats', (done) => {
      invalidEmails.forEach((email) => {
        const invalidData = Object.assign({}, testSeeker, { email });
        const seeker = new Seeker(invalidData);

        seeker.validate((err) => {
          expect(err.errors).toHaveProperty('email');
          done();
        });
      });

      validEmails.forEach((email) => {
        const validData = Object.assign({}, testSeeker, { email });
        const seeker = new Seeker(validData);

        seeker.validate((err) => {
          expect(err).toBeNull();
          done();
        });
      });
    });

    it('should not allow summary to exceed 128 characters', (done) => {
      const invalidData = Object.assign({}, testSeeker, {
        summary:
          'Lorem ipsum dolor sit amet, quem movet habemus eu his, quis pericula conceptam in sea, laudem fierent consetetur ei eos. Ad deserunt scribentur philosophia vis, autem veritus eum et.',
      });
      const seeker = new Seeker(invalidData);

      seeker.validate((err) => {
        expect(err.errors).toHaveProperty('summary');
        done();
      });
    });
  });

  describe('*** Middleware/Methods ***', () => {
    beforeAll(() => mongoose
      .connect(
        MONGODB_URI_TEST,
        { useNewUrlParser: true },
      )
      // eslint-disable-next-line no-console
      .then(() => console.log('\n*** CONNECTED to database ***\n'))
      // eslint-disable-next-line no-console
      .catch(err => console.log('\n*** ERROR connecting to database ***\n', err)));

    afterAll(() => mongoose
      .disconnect()
      // eslint-disable-next-line no-console
      .then(() => console.log('\n*** DISCONNECTED from database ***\n'))
      // eslint-disable-next-line no-console
      .catch(err => console.log('\n*** ERROR disconnecting from database ***\n', err)));

    afterEach(() => Seeker.deleteMany()
      // eslint-disable-next-line no-console
      .then(() => console.log('\n*** CLEAR database ***\n'))
      // eslint-disable-next-line no-console
      .catch(err => console.log('\n*** ERROR clearing database ***\n', err)));

    it('should hash password before saving', async () => {
      const newSeeker = await Seeker.create(testSeeker);

      expect(newSeeker.password).not.toBe(testSeeker.password);
    });

    it('should have method isValidPassword that checks if given password is correct', async () => {
      const newSeeker = await Seeker.create(testSeeker);
      const correctPassword = await newSeeker.isValidPassword(testSeeker.password);
      const incorrectPassword = await newSeeker.isValidPassword(`not${correctPassword}`);

      expect(correctPassword).toBeTruthy();
      expect(incorrectPassword).toBeFalsy();
    });
  });
});
