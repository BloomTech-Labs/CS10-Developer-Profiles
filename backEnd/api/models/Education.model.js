const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const Education = new Schema({
  id: { type: ObjectId },
  employee: [{ type: ObjectId, ref: 'Seekers' }],
  school: {
    type: String,
    required: [true, 'School is required'],
  },
  degree: {
    type: String,
  },
  fieldOfStudy: {
    type: String,
    required: [true, 'Field of study is required'],
  },
  startYear: {
    type: Date,
    required: [true, 'A starting year is required'],
  },
  endYear: {
    type: Date,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model('Educations', Education);
