const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

import OpenPosition from './OpenPosition.embeddedModel';

const employerSchema = new Schema({
  id: { type: ObjectId },
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
      validator: val => {
        return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(val);
      },
      message: '{VALUE} is not a valid email address',
    },
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
  hiringManagerFirstName: {
    type: String,
    required: [true, 'First name is required'],
  },
  hiringManagerLastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
  hiringManagerEmail: {
    type: String,
    required: [true, "Contact person's email is required"],
    validate: {
      validator: val => {
        return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(val);
      },
      message: '{VALUE} is not a valid email address',
    },
  },
  openPossitions: [OpenPosition],
});

module.exports = mongoose.model('Employers', employerSchema);
