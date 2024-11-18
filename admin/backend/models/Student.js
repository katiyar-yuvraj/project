const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define a schema for exam marks
const examSchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  maxMarks: {
    type: Number,
    default: 100,
  },
}, {
  _id: false // Prevents creating separate ObjectId for each exam entry
});

const studentSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true,
  },
  class: {
    type: String,
    required: true,
  },
  course:{
    type:String,
    require:true
  },
  exams: [examSchema], // Array of exams
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
