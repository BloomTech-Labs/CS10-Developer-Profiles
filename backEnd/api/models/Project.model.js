const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const Project = new Schema({
  id: { type: ObjectId },
  employee: [{ type: ObjectId, ref: 'Seekers' }],
  title: {
    type: String,
    required: [true, 'A title is required'],
  },
  despription: {
    type: String,
  },
  imgUrl: {
    type: String,
    // PENDING Validate URL
  },
  link: {
    type: String,
    // PENDING Validate URL
  },
  gitubRepoLink: {
    type: String,
    // PENDING Validate URL
  },
  tech: {
    type: Array,
  },
});

module.exports = mongoose.model('Projects', Project);
