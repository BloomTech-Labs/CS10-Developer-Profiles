require('dotenv').config();

const mongoose = require('mongoose');
const Seeker = require('./Seeker.model');
const { testSeeker } = require('../../utils/seeker.testData');

const { MONGODB_URI_TEST } = process.env;

describe('seeker model', () => {
  beforeAll(() => mongoose.connect(MONGODB_URI_TEST));

  afterEach(() => Seeker.remove());

  afterAll(() => mongoose.disconnect());

  it('should require firstName, lastName, password, email, desiredTitle', () => {
    const seeker = new Seeker();

    seeker.validate((err) => {
      expect(err.errors).toHaveProperty('firstName');
      expect(err.errors).toHaveProperty('lastName');
      expect(err.errors).toHaveProperty('password');
      expect(err.errors).toHaveProperty('email');
      expect(err.errors).toHaveProperty('desiredTitle');
    });
  });

  it('should disallow passwords shorter than 8 characters', () => {
    const invalidData = Object.assign({}, testSeeker, { password: 'Pa3&' });
    const seeker = new Seeker(invalidData);

    seeker.validate((err) => {
      expect(err.errors).toHaveProperty('password');
    });
  });

  it('should disallow any passwords that do not contain 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character', () => {
    const invalidData = Object.assign({}, testSeeker, { password: 'Password123' });
    const seeker = new Seeker(invalidData);

    seeker.validate((err) => {
      expect(err.errors).toHaveProperty('password');
    });
  });

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
