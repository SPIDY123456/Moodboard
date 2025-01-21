const express = require('express');
const {register,login,getProfile,updateProfile,savePin, followUser, unfollowUser, boardSuggestions, unorganizedIdeas} = require('../controllers/authController');
const {protect} = require('../middleware/authMiddleware');

const router = express.Router();



router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/save-pin', protect, savePin);
router.post('/follow',protect,followUser);
router.post('/unfollow',protect,unfollowUser);
router.get('/board-suggestions',protect,boardSuggestions);
router.get('/unorganized-ideas',protect,unorganizedIdeas);

module.exports = router;
