const express = require('express');
const {
  createAttendance,
  getAllAttendance,
  getAttendanceByStudentId,
  updateAttendance,
  deleteAttendance,
  getCourceAttendance
} = require('../controllers/attendanceController');

const router = express.Router();

// Routes
router.post('/', createAttendance);
router.get('/', getAllAttendance);
router.get('/student/:studentId', getAttendanceByStudentId);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);
router.get('/course/:course', getCourceAttendance);
module.exports = router;
