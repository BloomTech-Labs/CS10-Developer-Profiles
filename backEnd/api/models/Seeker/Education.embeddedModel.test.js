const mongoose = require('mongoose');
const educationSchema = require('./Education.embeddedModel');

const Education = mongoose.model('Education', educationSchema);

describe('Education Model', () => {
  it('should require school, fieldOfStudy, startYear', (done) => {
    const education = new Education();

    education.validate((err) => {
      expect(err.errors).toHaveProperty('school');
      expect(err.errors).toHaveProperty('fieldOfStudy');
      expect(err.errors).toHaveProperty('startYear');
      done();
    });
  });
});
