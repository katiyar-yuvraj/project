const Attendance = require('../models/Attendance');
const Student = require('../models/Student');

// Create a new attendance record
exports.createAttendance = async (req, res) => {
  try {
    const { studentId, date, status, subject } = await req.body;

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
    const { status, subject } = await req.body;
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

exports.markAttendance = async (req, res) => {
  const { rollNo } = req.params;
  const { subjectId, date, status } = req.body;

  // Validate request body
  if (!subjectId || !date || !status) {
    return res.status(400).json({ message: "Subject ID, date, and status are required." });
  }

  try {
    // Save attendance record
    const attendance = new Attendance({
      rollNo,
      subjectId,
      date: new Date(date),
      status,
    });

    await attendance.save();

    res.status(201).json({ message: "Attendance marked successfully.", attendance });
  } catch (error) {
    res.status(500).json({ message: "Failed to mark attendance.", error: error.message });
  }
};

const sampleAttendance = [
  { date: 'Mon, Oct 1, 2024', subject: 'Mathematics', status: 'Present' },
  { date: 'Tue, Oct 2, 2024', subject: 'Science', status: 'Absent' },
  { date: 'Wed, Oct 3, 2024', subject: 'English', status: 'Present' },
  { date: 'Thu, Oct 4, 2024', subject: 'History', status: 'Present' },
  { date: 'Fri, Oct 5, 2024', subject: 'Geography', status: 'Present' }
];

exports.getAttendanceByRollNo = async (req, res) => {
  const { rollNumber } = req.params;
  
  // If rollNumber is not provided, return the sample attendance data
  if (!rollNumber) {
    return res.status(200).json({ attendance: sampleAttendance });
  }

  try {
    // Find the student by roll number
    const student = await Student.findOne({ rollNumber });
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Fetch attendance records for the student
    const attendanceRecords = await Attendance.find({ studentId: student._id }).populate('studentId', 'rollNumber subject');

    // If no attendance data found
    if (!attendanceRecords || attendanceRecords.length === 0) {
      return res.status(404).json({ message: 'No attendance records found' });
    }

    // Format the attendance data for the response
    const formattedAttendance = attendanceRecords.map(record => ({
      date: record.date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }),
      subject: record.subject,
      status: record.status === 'present' ? 'Present' : 'Absent',
    }));

    // Respond with the formatted attendance data
    res.status(200).json({ attendance: formattedAttendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}