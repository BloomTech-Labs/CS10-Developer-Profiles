const mongoose = require('mongoose');
const projectSchema = require('./Project.embeddedModel');

const Project = mongoose.model('Project', projectSchema);

describe('Project Model', () => {
  it('should require title, description', (done) => {
    const project = new Project();

    project.validate((err) => {
      expect(err.errors).toHaveProperty('title');
      expect(err.errors).toHaveProperty('description');
      done();
    });
  });
});
