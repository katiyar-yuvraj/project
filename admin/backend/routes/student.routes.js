const express = require('express');
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentByRoll,
  loginStudent,
  getStudentByUserId,
  markGrade,
  getStudentGradeByRoll
} = require('../controllers/studentController');

const router = express.Router();

// Routes
router.post('/', createStudent);
router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.get('/roll/:id', getStudentByRoll);
router.get("/grade/:rollNumber", getStudentGradeByRoll);
router.put('/', updateStudent);
router.delete('/:roll', deleteStudent);
router.post('/login', loginStudent);
router.get("/info/:uid", getStudentByUserId);
router.post("/mark-grade/:rollNumber", markGrade);
module.exports = router;
