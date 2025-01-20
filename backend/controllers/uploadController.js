const asyncHandler = require('express-async-handler');
const Upload = require('../models/Upload');
const Board = require('../models/Board');
const cloudinary = require('../config/cloudinary');
const upload = asyncHandler(async (req, res) => {
  try {
    const { url, caption, boardId } = req.body;

    if (!url || !boardId) {
      return res.status(400).json({ message: 'No image URL or board ID provided' });
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(url, {
      folder: 'Moodboard',
    });

    // Create a new image in the Upload model (optional if you need to track details)
    const image = await Upload.create({
      url: result.secure_url,  // URL from Cloudinary
      board: boardId,  // The board where the image belongs
      user: req.user._id,  // The user who uploaded the image
      caption: caption || '',
    });

    // Find the board by ID and add the image URL to the board's images array
    const board = await Board.findById(boardId);
    board.images.push(result.secure_url);
    board.caption.push(caption);  // Push the URL (string) directly into the array

    // Save the board with the new image URL added to the images array
    await board.save();

    res.status(201).json(image);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = { upload };