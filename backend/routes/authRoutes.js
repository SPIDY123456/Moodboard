const express = require('express');
const {register,login,getProfile,updateProfile,savePin} = require('../controllers/authController');
const {protect} = require('../middleware/authMiddleware');

const router = express.Router();



router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/save-pin', protect, savePin);


module.exports = router;