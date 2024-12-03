const express = require('express');
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentByRoll,
  loginStudent,
  getStudentByUserId
} = require('../controllers/studentController');

const router = express.Router();

// Routes
router.post('/', createStudent);
router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.get('/roll/:id', getStudentByRoll);
router.put('/:id', updateStudent);
router.delete('/:roll', deleteStudent);
router.post('/login', loginStudent);
router.get("/info/:uid", getStudentByUserId);

module.exports = router;
