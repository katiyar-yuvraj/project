const mongoose = require('mongoose');
const { Schema } = mongoose;

const attendanceSchema = new Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  subjectId: String,
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['present', 'absent'],
    required: true,
  },
  subject: {
    type: String,
    enum: ["Mathematics", "English", "Chemisty", "Physics", "CSE"],
    required: true,
  }

}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;
