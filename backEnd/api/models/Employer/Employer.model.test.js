// Set envirement variable NODE_ENV to 'test'
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const EmployerModel = require('./Employer.model');

describe('Employer Model', () => {
  // Connect to MongoDB
  beforeAll(() => {
    return mongoose
      .connect(process.env.MONGODB_URI_TEST)
      .then(() => console.log('\n=== connected to TEST DB ==='))
      .catch(e => console.log('error', e));
  });

  // Disconnect DB
  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='))
      .catch(e => console.log('error', e));
  });

  // Test Employer.model.js (Without the Embedded Docs)
  describe('Employer.model.js', () => {});

  // Test OpenPosition.embeddedModel.js
  describe('OpenPosition.embeddedModel.js', () => {});

  // Test HiringManager.embeddedModel.js
  describe('HiringManager.embeddedModel.js', () => {});
});
