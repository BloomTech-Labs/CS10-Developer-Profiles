const mongoose = require('mongoose');

const { Schema } = mongoose;

const geoJSONSchema = new Schema({
  // eslint-disable-next-line quote-props
  'type': {
    type: String,
    required: [true, 'A GeoJSON object type must be declared.'],
    enum: ['Point'],
    default: 'Point',
  },
  coordinates: {
    type: [Number],
    required: [true, 'Coordinates are required as [longitude, latitude].'],
  },
});

const locationSchema = new Schema({
  place: {
    type: String,
    required: [true, 'A location name is required'],
  },
  geolocation: geoJSONSchema,
});

module.exports = locationSchema;
