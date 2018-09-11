const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;
import { STACK, SKILLS } from '../../utils/skillsAndLanguagesList';

const OpenPosition = new Schema({
  id: { type: ObjectId },
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
    enum: [STACK],
    type: Array,
  },
  skills: {
    enum: [SKILLS], // to be filled, so we ensure that filtering works as expected and validation will be easy. Is alot of work but can be done.
    type: Array,
  },
  minSalary: {
    type: Number,
    min: [0, 'Min Salary can not be less than 0 monetary units'],
  },
  maxSalary: {
    type: Number,
    min: [30000, 'Min Salary can not be less than 30.000 monetary units'],
  },
});

module.exports = mongoose.model('OpenPositions', OpenPosition);
