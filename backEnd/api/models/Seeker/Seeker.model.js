const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const educationSchema = require('./Education.embeddedModel');
const experienceSchema = require('./Experience.embeddedModel');
const projectSchema = require('./Project.embeddedModel');

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
      // prettier-ignore
      validator: (val) => {
        return /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*?[!@#$%&]).{8,})\S$/.test(val);
      },
      message:
        'Password must contain 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character: !, @, #, $, %, &',
    },
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email address is required'],
    validate: {
      // prettier-ignore
      validator: (val) => {
        return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(val);
      },
      message: '{VALUE} is not a valid email address',
    },
  },
  desiredTitle: {
    type: String,
    required: [true, 'Desired title is required'],
  },
  currentLocation: {
    type: String,
    // PENDING: Implement validation.
  },
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
  placesInterested: {
    type: Array,
    // TODO: Validate city's names
  },
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

seekerSchema.pre('save', function hashPassword(next) {
  bcrypt.hash(this.password, 12, (err, hash) => {
    if (err) next(err);
    this.password = hash;
    next();
  });
});

seekerSchema.methods.isValidPassword = function validatePassword(testPassword) {
  return bcrypt.compare(testPassword, this.password);
};

module.exports = mongoose.model('Seeker', seekerSchema);
