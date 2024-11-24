const express = require('express');
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentByRoll
} = require('../controllers/studentController');

const router = express.Router();

// Routes
router.post('/', createStudent);
router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.get('/roll/:id', getStudentByRoll);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;
