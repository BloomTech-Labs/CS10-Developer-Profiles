const mongoose = require('mongoose');

const { Schema } = mongoose;

const educationSchema = new Schema({
  school: {
    type: String,
    required: [true, 'School is required'],
  },
  degree: {
    type: String,
  },
  fieldOfStudy: {
    type: String,
    required: [true, 'Field of study is required'],
  },
  startYear: {
    type: Date,
    required: [true, 'Start year is required'],
  },
  endYear: {
    type: Date,
  },
  description: {
    type: String,
  },
});

module.exports = educationSchema;
