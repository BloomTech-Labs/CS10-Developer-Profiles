const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Project title is required']
  },
  description: {
    type: String
  },
  img: {
    type: String
    // PENDING Validate URL
  },
  link: {
    type: String
    // PENDING Validate URL
  },
  repo: {
    type: String
    // PENDING Validate URL
  },
  tech: {
    type: Array
  },
});

const experienceSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
  },
  company: {
    type: String,
    required: [true, 'Company is required'],
  },
  location: {
    type: String,
    required: [true, 'Job location is required'],
    // PENDING Validate
  },
  headline: {
    type: String,
  },
  description: {
    type: String,
  },
  startYear: {
    type: Date,
    required: [true, 'Start year is required'],
  },
  endYear: {
    type: Date,
  },
});

const educationSchema = new Schema({
  school: {
    type: String,
    required: [true, 'School is required']
  },
  degree: {
    type: String
  },
  fieldOfStudy: {
    type: String,
    required: [true, 'Field of study is required']
  },
  startYear: {
    type: Date,
    required: [true, 'Start year is required']
  },
  endYear: {
    type: Date
  },
  description: {
    type: String
  },
});

const seekerSchema = new Schema({
  img: {
    type: String
    // TODO: Validate the URL
  },
  firstName: {
    type: String,
    required: [true, 'First name is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    validate: {
      validator: val => {
        return /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*?[!@#$%&]).{8,})\S$/.test(
          val
        );
      },
      message:
        'Password must contain 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character: !, @, #, $, %, &'
    }
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email address is required'],
    validate: {
      validator: val => {
        return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(
          val
        );
      },
      message: '{VALUE} is not a valid email address'
    }
  },
  desiredTitle: {
    type: String,
    required: [true, 'Desired title is required']
  },
  currentLocation: {
    type: String
    // PENDING: Implement validation.
  },
  summary: {
    type: String
  },
  github: {
    type: String
    // PENDING: Validate with github API
  },
  linkedin: {
    type: String
    // PENDING: Validate with linkedin API
  },
  portfolio: {
    type: String
    // TODO: Validate the URL
  },
  resume: {
    type: String
    // TODO: Validate the URL
  },
  acclaimBadge: {
    type: String
    // PENDING: Validate via API
    // TODO: Validate the URL
  },
  placesInterested: {
    type: Array
    // TODO: Validate city's names
  },
  topSkills: {
    type: Array
  },
  additionalSkills: {
    type: Array
  },
  familiarWith: {
    type: Array
  },
  projects: [projectSchema],
  experience: [experienceSchema],
  education: [educationSchema],
});

module.exports = mongoose.model('Seeker', seekerSchema);
