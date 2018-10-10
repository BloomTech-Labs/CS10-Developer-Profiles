const mongoose = require('mongoose');

const { Schema } = mongoose;

const locationSchema = new Schema({
  place: {
    type: String,
    required: [true, 'A location name is required'],
  },
  lat: {
    type: Number,
    required: [true, 'Latitude cooridinate is required.'],
  },
  lng: {
    type: Number,
    required: [true, 'Longitude cooridinate is required.'],
  },
});

module.exports = locationSchema;
