const Attendance = require('../models/Attendance');
const Student = require('../models/Student');

// Create a new attendance record
exports.createAttendance = async (req, res) => {
  try {
    const { studentId, date, status, subject } = await JSON(req.body);

    // Check if student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Create attendance record
    const attendance = new Attendance({ studentId, date, status, subject });
    await attendance.save();

    res.status(201).json({ message: 'Attendance recorded successfully', attendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all attendance records
exports.getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find().populate('studentId', 'name rollNumber');
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get attendance by student ID
exports.getAttendanceByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
    const attendance = await Attendance.find({ studentId }).populate('studentId', 'name rollNumber');
    if (!attendance.length) {
      return res.status(404).json({ message: 'No attendance records found for this student' });
    }
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an attendance record by ID
exports.updateAttendance = async (req, res) => {
  try {
    const { status, subject } = await JSON(req.body);
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      { status, subject },
      { new: true, runValidators: true }
    );

    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    res.status(200).json({ message: 'Attendance updated successfully', attendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an attendance record by ID
exports.deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    res.status(200).json({ message: 'Attendance record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCourceAttendance = async (req, res) => {
  try {
    const { course: courseName } = req.params;
        
    const attendance = await Attendance.find({subject: courseName }).populate('studentId', 'name rollNumber');
    if (!attendance.length) {
      return res.status(404).json({ message: 'No attendance records found for this course' });
    }
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};