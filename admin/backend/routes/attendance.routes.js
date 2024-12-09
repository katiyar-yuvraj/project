const express = require('express');
const {
  createAttendance,
  getAllAttendance,
  getAttendanceByStudentId,
  updateAttendance,
  deleteAttendance,
  getCourceAttendance,
  markAttendance,
  getAttendanceByRollNo
} = require('../controllers/attendanceController');

const router = express.Router();

// Routes
router.get('/', getAllAttendance);
router.get('/course/:course', getCourceAttendance);
router.get("/:rollNo", getAttendanceByRollNo);
router.get('/student/:studentId', getAttendanceByStudentId);
router.post('/', createAttendance);
router.post("/:rollNo", markAttendance);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);
module.exports = router;
