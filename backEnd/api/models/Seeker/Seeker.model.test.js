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
