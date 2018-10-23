const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const educationSchema = require('./Education.embeddedModel');
const experienceSchema = require('./Experience.embeddedModel');
const projectSchema = require('./Project.embeddedModel');
const locationSchema = require('../Location.Schema/Location.embeddedModel');

const { Schema } = mongoose;

const seekerSchema = new Schema({
  img: {
    type: String,
    // TODO: Validate the URL
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    validate: {
      validator: val => /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*?[!@#$%&]).{8,})\S$/.test(val),
      message:
        'Password must contain 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character: !, @, #, $, %, &',
    },
  },
  passwordReset: {
    type: String,
    select: false,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email address is required'],
    validate: {
      validator: val => /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(
        val,
      ),
      message: '{VALUE} is not a valid email address',
    },
  },
  currentTitle: {
    type: String,
    // PENDING: Implement validation. Must match a list of allowed titles.
  },
  desiredTitle: {
    type: String,
  },
  currentLocation: locationSchema,
  summary: {
    type: String,
    maxlength: [128, 'Summary can not exceed 128 characters'],
  },
  github: {
    type: String,
    // PENDING: Validate with github API
  },
  linkedin: {
    type: String,
    // PENDING: Validate with linkedin API
  },
  portfolio: {
    type: String,
    // TODO: Validate the URL
  },
  resume: {
    type: String,
    // TODO: Validate the URL
  },
  acclaimBadge: {
    type: String,
    // PENDING: Validate via API
    // TODO: Validate the URL
  },
  placesInterested: [locationSchema],
  topSkills: {
    type: Array,
  },
  additionalSkills: {
    type: Array,
  },
  familiarWith: {
    type: Array,
  },
  socialNetwork: {
    type: String,
    // TODO: Validate the URL
  },
  projects: [projectSchema],
  experience: [experienceSchema],
  education: [educationSchema],
});

seekerSchema.index({ 'currentLocation.geolocation': '2dsphere' });

seekerSchema.pre('save', function hashPassword(next) {
  bcrypt.hash(this.password, 12, (err, hash) => {
    if (err) next(err);
    this.password = hash;
    next();
  });
});

seekerSchema.methods.isValidPassword = function comparePassword(testPassword) {
  return bcrypt.compare(testPassword, this.password);
};

module.exports = mongoose.model('Seeker', seekerSchema);
