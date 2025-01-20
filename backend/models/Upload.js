const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  url: { type: String, required: true },
  board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  caption: { type: String, required: false },
});

module.exports = mongoose.model('Upload', uploadSchema);