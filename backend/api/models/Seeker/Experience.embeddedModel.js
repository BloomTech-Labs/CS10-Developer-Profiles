const mongoose = require('mongoose');
const locationSchema = require('../Location.Schema/Location.embeddedModel');

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
  location: locationSchema,
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
