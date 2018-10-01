const mongoose = require('mongoose');
const experienceSchema = require('./Experience.embeddedModel');

const Experience = mongoose.model('Experience', experienceSchema);

describe('Experience Model', () => {
  // prettier-ignore
  it('should require title, company, location, startYear', (done) => {
    const experience = new Experience();

    experience.validate((err) => {
      expect(err.errors).toHaveProperty('title');
      expect(err.errors).toHaveProperty('company');
      expect(err.errors).toHaveProperty('startYear');
      done();
    });
  });
});
