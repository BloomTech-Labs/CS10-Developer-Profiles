const mongoose = require('mongoose');

const { Schema } = mongoose;

const hiringManagerSchema = new Schema({
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
      validator: val => /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(
        val,
      ),
      message: '{VALUE} is not a valid email address',
    },
  },
});

module.exports = hiringManagerSchema;
