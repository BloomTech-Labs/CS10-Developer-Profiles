const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const openPositionSchema = require('./OpenPosition.embeddedModel');
const hiringManagerSchema = require('./HiringManager.embeddedModel');

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
  hiringManagers: [hiringManagerSchema],
  openPositions: [openPositionSchema],
});

employerSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 12, (err, hash) => {
    if (err) next(err);
    this.password = hash;
    next();
  });
});

employerSchema.methods.isValidPassword = function(testPassword) {
  return bcrypt.compare(testPassword, this.password);
};

module.exports = mongoose.model('Employers', employerSchema);
