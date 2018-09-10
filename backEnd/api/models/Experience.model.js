const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const Experience = new Schema({
  id: { type: ObjectId },
  seeker: [{ type: ObjectId, ref: 'Seekers' }],
  title: {
    type: String,
    required: [true, 'A title is required'],
  },
  company: {
    type: String,
    required: [true, 'Company is required'],
  },
  location: {
    type: String,
    required: [true, 'A location is required'],
    // PENDING Validate
  },
  headline: {
    type: String,
  },
  description: {
    type: String,
  },
  startYear: {
    type: Date,
    required: [true, 'A starting year is required'],
  },
  endYear: {
    type: Date,
  },
});

module.exports = mongoose.model('Experience', Experience);
