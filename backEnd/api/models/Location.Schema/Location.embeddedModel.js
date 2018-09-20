const mongoose = require('mongoose');

const { Schema } = mongoose;

const locationSchema = new Schema({
  place: {
    type: String,
  },
  loc: {
    type: { type: String },
    coordinates: [],
  },
});

module.exports = locationSchema;
