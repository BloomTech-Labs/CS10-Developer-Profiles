const mongoose = require('mongoose');
const locationSchema = require('../Location.Schema/Location.embeddedModel');
const { STACK, SKILLS } = require('../../utils/skillsAndLanguagesList');

const { Schema } = mongoose;

const openPositionSchema = new Schema({
  projectName: {
    type: String,
    required: [true, 'A project name is required'],
  },
  description: {
    type: String,
    minlength: 30,
  },
  jobTitle: {
    type: String,
    required: [true, 'A title for the offered position is required.'],
  },
  techStack: {
    enum: STACK,
    type: String,
  },
  skills: {
    // To be filled, so we ensure that filtering works as expected and validation will be easy.
    // Is alot of work but can be done.
    enum: SKILLS,
    type: String,
  },
  minSalary: {
    type: Number,
    min: [0, 'Min Salary can not be less than 0 monetary units'],
  },
  maxSalary: {
    type: Number,
    min: [30000, 'Min Salary can not be less than 30.000 monetary units'],
  },
  location: locationSchema,
});

module.exports = openPositionSchema;
