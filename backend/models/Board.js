const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  images: [{ type: String }], 
  caption: [ {type: String,}] 
});

module.exports = mongoose.model('Board', boardSchema);