const express = require('express');
const { getBoards, createBoard, updateBoard } = require('../controllers/boardController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getBoards);  
router.post('/board',protect,createBoard);
router.put('/:id',protect,updateBoard)

module.exports = router;