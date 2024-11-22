const express = require('express');
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  addProfileImg
} = require('../controllers/userController');

const router = express.Router();

// Routes
router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', addProfileImg);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
