const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const hiringManagerSchema = new Schema({
  id: { type: ObjectId },
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
});

module.exports = hiringManagerSchema;
