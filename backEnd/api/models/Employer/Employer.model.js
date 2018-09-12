const mongoose = require('mongoose');
const openPositionSchema = require('./OpenPosition.embeddedModel');
const hiringManagerSchema = require('./HiringManager.embeddedModel');

const { Schema } = mongoose;

const employerSchema = new Schema({
  companyName: {
    type: String,
    required: [true, 'Company name is required.'],
    unique: true,
  },

  companyEmail: {
    type: String,
    unique: true,
    required: [true, 'A main email for this account is required'],
    validate: {
      validator: val => /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(
        val,
      ),
      message: '{VALUE} is not a valid email address',
    },
  },
  password: {
    type: String,
    required: [true, 'Password required'],
    minlength: [8, 'Password must be at least 8 characters'],
    validate: {
      validator: val => /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*?[!@#$%&]).{8,})\S$/.test(val),
      message:
        'Password must contain 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character: !, @, #, $, %, &',
    },
  },
  hiringManagers: [hiringManagerSchema],
  openPositions: [openPositionSchema],
});

module.exports = mongoose.model('Employers', employerSchema);
