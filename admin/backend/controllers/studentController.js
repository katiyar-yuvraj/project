const Student = require("../models/Student");
const User = require("../models/User");

// Create a new student
exports.createStudent = async (req, res) => {
  try {
    const { userId, rollNumber, class: studentClass, course } = await req.body;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if student already exists with the given roll number
    const existingStudent = await Student.findOne({ rollNumber });
    if (existingStudent) {
      return res.status(400).json({ message: "Roll number already exists" });
    }

    // Create new student
    const student = new Student({
      userId,
      rollNumber,
      class: studentClass,
      course,
    });
    await student.save();

    res.status(201).json({ message: "Student created successfully", student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate(
      "userId",
      "name email profileImg"
    );
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate(
      "userId",
      "name email"
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get student by userId
exports.getStudentByUserId = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.params.uid }).populate(
      "userId",
      "name email"
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get student by roll number
exports.getStudentByRoll = async (req, res) => {
  try {
    const { id: roll } = req.params;

    // Query the database for the student
    const student = await Student.findOne({ roll }).populate("userId", "name email");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Return the desired structure
    const response = {
      roll: student.roll,
      name: student.userId?.name || "N/A", // In case userId is not populated
      email: student.userId?.email || "N/A",
      course: student.course || "N/A", // Assuming course is a field in the Student model
      department: student.department || "N/A", // Assuming department is a field in the Student model
      password: "dummyPassword", // Include only if needed; typically, passwords shouldn't be shared in responses
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update student by ID
exports.updateStudent = async (req, res) => {
  try {
    const { rollNumber, class: studentClass, exams } = await req.body;

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { rollNumber, class: studentClass, exams },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student updated successfully", student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete student by ID
exports.deleteStudent = async (req, res) => {
  try {
    const rollNumber = req.params.roll;
    const student = await Student.findOneAndDelete({ rollNumber });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Student login
exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "student") {
      return res.status(403).json({ message: "Forbidden" });
    }
    try {
      await user.comparePassword(password);
    } catch (error) {
      return res.status(401).json({ message: "Invalid credentials" , error: error.message});
    }
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.markGrade = async (req, res) => {
  const { rollNumber } = req.params;
  const { subject, marks, maxMarks } = req.body;

  // Validate required fields
  if (!subject || marks === undefined || maxMarks === undefined) {
    return res.status(400).json({ message: "Subject, marks, and maxMarks are required." });
  }

  try {
    // Find student by roll number
    const student = await Student.findOne({ rollNumber });
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    // Check if the subject already exists in exams
    const existingExam = student.exams.find((exam) => exam.subject === subject);

    if (existingExam) {
      // Update the existing subject's marks
      existingExam.marks = marks;
      existingExam.maxMarks = maxMarks;
    } else {
      // Add new subject with marks
      student.exams.push({ subject, marks, maxMarks });
    }

    // Save the updated student record
    await student.save();

    res.status(200).json({
      message: "Grade marked successfully.",
      exams: student.exams,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to mark grade.", error: error.message });
  }
};