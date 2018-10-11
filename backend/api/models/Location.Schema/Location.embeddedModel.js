const mongoose = require('mongoose');

const { Schema } = mongoose;

const geoJSONSchema = new Schema({
  type: {
    type: String,
    required: [true, 'A GeoJSON object type must be declared.'],
    enum: ['Point'],
    default: 'Point',
  },
  coordinates: {
    type: [Number],
    required: [true, 'Coordinates are required as [longitude, latitude].'],
  },
  index: '2dsphere',
});

const locationSchema = new Schema({
  place: {
    type: String,
    required: [true, 'A location name is required'],
  },
  location: geoJSONSchema,
});

module.exports = locationSchema;
