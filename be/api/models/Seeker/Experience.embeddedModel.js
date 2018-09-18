const mongoose = require('mongoose');

const { Schema } = mongoose;

const experienceSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
  },
  company: {
    type: String,
    required: [true, 'Company is required'],
  },
  location: {
    type: String,
    required: [true, 'Job location is required'],
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
    required: [true, 'Start year is required'],
  },
  endYear: {
    type: Date,
  },
});

module.exports = experienceSchema;
