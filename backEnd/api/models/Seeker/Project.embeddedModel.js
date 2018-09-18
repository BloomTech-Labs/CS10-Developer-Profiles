const mongoose = require('mongoose');

const { Schema } = mongoose;

const projectSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
  },
  img: {
    type: String,
    // PENDING Validate URL
  },
  link: {
    type: String,
    // PENDING Validate URL
  },
  repo: {
    type: String,
    // PENDING Validate URL
  },
  tech: {
    type: Array,
  },
});

module.exports = projectSchema;
