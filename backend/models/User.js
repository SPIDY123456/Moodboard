const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: '' }, 
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  boards: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Board' },  // Links to Board model
  ],
  boardSuggestions: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Board' },  // Optional: If suggestions are references to boards
    // Alternatively, you can use String if the suggestions are just names or descriptions
  ],
  unorganizedIdeas: [
    { type: String }  // Array of strings for unorganized ideas
  ],
  pins: [
    {
      imageUrl: { type: String, required: true },
      photographer: { type: String, required: true },
      altText: { type: String },
    }
  ],
});

module.exports = mongoose.model('User', userSchema);
