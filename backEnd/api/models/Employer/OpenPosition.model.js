const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const OpenPosition = new Schema({
  id: { type: ObjectId },
});

module.exports = mongoose.model('OpenPositions', OpenPosition);
