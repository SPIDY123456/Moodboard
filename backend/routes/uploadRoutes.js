const express = require('express');
const { upload } = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/upload', protect, upload);

module.exports = router;