const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const Seeker = new Schema({
  id: { type: ObjectId },
  profilePicture: {
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
    required: [true, 'Password required'],
    minlength: [8, 'Password must be at least 8 characters'],
    validate: {
      validator: val => {
        return /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*?[!@#$%&]).{8,})\S$/.test(val);
      },
      message:
        'Password must contain 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character: !, @, #, $, %, &',
    },
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email address required'],
    validate: {
      validator: val => {
        return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(val);
      },
      message: '{VALUE} is not a valid email address',
    },
  },
  desiredTitle: {
    type: String,
    required: [true, 'Define your prefered title'],
  },
  currentLocation: {
    type: String,
    // PENDING: Implement validation.
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
  acclaimBadge: {
    type: String,
    // PENDING: Validate via API
    // TODO: Validate the URL
  },
  placesInterested: {
    type: Array,
    // TODO: Validate city's names
  },
  summary: {
    type: String,
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
  projects: [{ type: ObjectId, ref: 'Projects' }],
  experience: [{ type: ObjectId, ref: 'Experience' }],
  education: [{ type: ObjectId, ref: 'Educations' }],
  linkToResume: {
    type: String,
    // TODO: Validate the URL
  },
});

module.exports = mongoose.model('Seekers', Seeker);
