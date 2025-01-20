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

  
    const result = await cloudinary.uploader.upload(url, {
      folder: 'Moodboard',
    });

   
    const image = await Upload.create({
      url: result.secure_url,  
      board: boardId,  
      user: req.user._id,  
      caption: caption || '',
    });

    const board = await Board.findById(boardId);
    board.images.push(result.secure_url);
    board.caption.push(caption);  

 
    await board.save();

    if (req.io) {
      req.io.emit('newUpload', image); 
  } else {
      console.error("Socket.io instance (req.io) is not available");
  }

    res.status(201).json(image);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = { upload };
