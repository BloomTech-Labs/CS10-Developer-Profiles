const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const Employer = new Schema({
  id: { type: ObjectId },
});

module.exports = mongoose.model('Employers', Employer);
