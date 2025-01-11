const mongoose = require('mongoose');
const { Schema } = mongoose;

const attendanceSchema = new Schema({
  studentRoll:{
    type:String,
    required:true
  },
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
    // enum: ["Mathematics", "English", "Chemisty", "Physics", "CSE"],
    required: true,
  }

}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;
