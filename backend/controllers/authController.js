const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');



const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '60d',
  });
};


const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    console.log(userExists);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Failed to  register',error.mesage)
    res.status(500).json({ message: 'Server error' });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(`Error: ${error.message}`)
    res.status(500).json({ message: 'Server error' });
  }
});


const getProfile = asyncHandler(async (req, res) => {
  try {
   
    const user = await User.findById(req.user._id).select('-password').populate('boards');

  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      profilePicture: user.profilePicture,
      name: user.name,
      email: user.email,
      followersCount: user.followers.length,  
      followingCount: user.following.length,  
      boards: user.boards,
      boardSuggestions: user.boardSuggestions || [],
      unorganizedIdeas: user.unorganizedIdeas || [],
      pins:user.pins,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
});


const updateProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    if (req.body.profilePicture) {
      user.profilePicture = req.body.profilePicture;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profilePicture: updatedUser.profilePicture,
      followers: updatedUser.followers,
      following: updatedUser.following,
      boards: updatedUser.boards,
      boardSuggestions: updatedUser.boardSuggestions,
      unorganizedIdeas: updatedUser.unorganizedIdeas,
      pins: updatedUser.pins
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
});

const savePin = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    const { imageUrl, photographer, altText } = req.body;

    
    const pin = {
      imageUrl,
      photographer,
      altText,
    };

    user.pins.push(pin);
    await user.save();

    if (req.io) {
      req.io.emit('newPins', pin); 
  } else {
      console.error("Socket.io instance (req.io) is not available");
  }

    res.status(200).json({ message: 'Image pinned successfully', pins: user.pins });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
});




module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  savePin,
};
