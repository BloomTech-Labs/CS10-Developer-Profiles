require('dotenv').config();

const mongoose = require('mongoose');
const Seeker = require('./Seeker.model');

const { MONGODB_URI_TEST } = process.env;

describe('seeker model', () => {
  const testSeeker = {};

  beforeAll(() => {
    testSeeker.firstName = 'John';
    testSeeker.lastName = 'Smith';
    testSeeker.password = 'Password123&';
    testSeeker.email = 'jsmith@example.com';
    testSeeker.desiredTitle = 'Software Engineer';

    return mongoose.connect(MONGODB_URI_TEST);
  });

  afterEach(() => Seeker.remove());

  afterAll(() => mongoose.disconnect());

  it('should hash password before saving', async () => {
    const newSeeker = await Seeker.create(testSeeker);

    expect(newSeeker.password).not.toBe(testSeeker.password);
  });
});
