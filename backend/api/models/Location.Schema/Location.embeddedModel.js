const mongoose = require('mongoose');

const { Schema } = mongoose;

const locationSchema = new Schema({
  place: {
    type: String,
    required: [true, 'A location name is required'],
  },
  loc: {
    type: { type: String },
    coordinates: [],
  },
});

module.exports = locationSchema;
