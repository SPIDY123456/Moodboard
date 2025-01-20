const Board = require('../models/Board');
const User = require("../models/User");
const asyncHandler = require('express-async-handler')

const getBoards = asyncHandler(async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user._id }).populate('images');
    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

const createBoard = asyncHandler(async (req, res) => {
  const { name } = req.body;
  try {
    // Create a new board
    const board = await Board.create({ name, user: req.user._id });

    // Add the board to the user's boards array
    const user = await User.findById(req.user._id);
    user.boards.push(board._id);
    await user.save();

    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


const updateBoard = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  try {
    const board = await Board.findById(id);
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }
    if (board.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    board.name = name || board.name;
    const updatedBoard = await board.save();
    res.json(updatedBoard);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = { getBoards, createBoard, updateBoard };