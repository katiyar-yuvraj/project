import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [visibleForm, setVisibleForm] = useState(null);
  const [updateStudentData, setUpdateStudentData] = useState({
    _id: null,
    roll: "",
    name: "",
    email: "",
    course: "",
    department: "",
    password: "",
  });

  const convertGradeToMarks = (grade) => {
    const gradeToMarks = {
      A: 90,
      B: 80,
      C: 70,
      D: 60,
      E: 50,
      F: 40,
    };
    return gradeToMarks[grade] || 0;
  };

  const [rollNumber, setRollNumber] = useState("");
  const subjects = [
    { subject: "Mathematics", id: "attendanceMath" },
    { subject: "Physics", id: "attendancePhysics" },
    { subject: "Chemistry", id: "attendanceChemistry" },
    { subject: "Computer Science", id: "attendanceCS" },
    { subject: "Electrical Engineering", id: "attendanceEE" },
    { subject: "Mechanical Engineering", id: "attendanceME" },
  ];

  const showStudentAction = (action) => {
    setVisibleForm(action);
  };

  const fetchDummyStudentData = async (roll) => {
    try {
      const apiUrl = `${import.meta.env.VITE_HOST_URL}/student/roll/${roll}`;
      const res = await fetch(apiUrl);

      if (!res.ok) {
        throw new Error(`Responed failed: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();

      const dummy = {
        _id: data._id,
        roll: roll,
        name: "John Doe",
        email: "johndoe@example.com",
        course: "Btech",
        department: "CSE",
        password: "dummyPassword",
      };
      return { ...dummy, ...data };
    } catch (error) {
      console.log(error);
    }
  };

  const handleRollNumberChange = (e) => {
    setRollNumber(e.target.value);
  };

  const handleRollSubmit = async () => {
    if (rollNumber) {
      const studentData = await fetchDummyStudentData(rollNumber);
      setUpdateStudentData(studentData);
      showStudentAction("updateStudentForm");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateStudentData((prev) => ({ ...prev, [name]: value }));
  };
  // done
  const handelmarkAttendence = async () => {
    if (rollNumber) {
      // Extract form values
      const rollNo = rollNumber;
      const name = document.getElementById("attendanceName")?.value;
      const department = document.getElementById("attendanceDepartment")?.value;
      const date = document.getElementById("attendanceDate")?.value;
      const subjectId = document.getElementById("attendanceSubject1")?.value;
      const status = document.getElementById("attendeResult")?.value;

      // Validate required fields
      if (!name || !department || !date || !subjectId || !status) {
        alert("Please fill in all fields.");
        return;
      }

      // Construct request body
      const requestBody = {
        subjectId,
        date,
        status,
      };

      try {
        // Send request to the API
        const response = await fetch(
          `${import.meta.env.VITE_HOST_URL}/attendance/${rollNo}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        // Handle the response
        if (response.ok) {
          const data = await response.json();
          alert("Attendance submitted successfully.");
          console.log("Response Data:", data);
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData?.message}`);
        }
      } catch (error) {
        console.error("Error submitting attendance:", error);
        alert("Failed to submit attendance. Please try again.");
      }
      showStudentAction("markAttendence");
    }
  };

  const handelmarkGrades = async () => {
    // Ensure roll number is provided
    if (!rollNumber) {
      alert("Roll Number is required!");
      return;
    }

    // Get the selected grade and subject from the form
    const grade = document.getElementById("attendeResult").value;
    const subjectID = document.getElementById("gradaeSubject").value;

    try {
      // Send a POST request to mark the grade
      const response = await fetch(
        `${import.meta.env.VITE_HOST_URL}/student/mark-grade/${rollNumber}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject: subjectID, // Pass the selected subject
            marks: convertGradeToMarks(grade), // Convert grade to marks (e.g., A -> 90)
            maxMarks: 100, // Assuming max marks are 100
          }),
        }
      );

      if (response.ok) {
        alert("Grade marked successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error marking grades:", errorData);
        alert("Failed to mark grades. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error?.message);
      alert("An error occurred. Please try again later.");
    }
  };

  // done
  const handeldeleteStudent = async () => {
    if (rollNumber) {
      try {
        const studentData = await fetch(
          `${import.meta.env.VITE_HOST_URL}/student/${rollNumber}`,
          {
            method: "DELETE",
          }
        );
        setUpdateStudentData(null);
      } catch (error) {
        console.log(error);
      }
      showStudentAction("deleteStudentForm");
    }
  };

  // done
  const handelupdateStudent = async () => {
    if (rollNumber) {
      try {
        const studentData = await fetch(
          `${import.meta.env.VITE_HOST_URL}/student/${updateStudentData?._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateStudentData),
          }
        );
        if (!studentData.ok) {
          throw new Error(
            `Login failed: ${studentData.status} ${studentData.statusText}`
          );
        }
        const data = await studentData.json();
        setUpdateStudentData(data);
        showStudentAction("updateStudentForm");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="ml-64 w-full p-6 bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
      </header>

      {/* Manage Students Section */}
      <section
        id="studentsSection"
        className="bg-white shadow-md rounded-lg p-6 mb-6"
      >
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Manage Students
        </h3>

        {/* Input for Roll Number to Fetch Student Data */}
        <div className="mb-6">
          <label htmlFor="rollNumber" className="block text-gray-600 mb-2">
            Enter Roll Number:
          </label>
          <input
            type="text"
            id="rollNumber"
            value={rollNumber}
            onChange={handleRollNumberChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Roll Number"
          />
          <button
            onClick={handleRollSubmit}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Fetch Student Details
          </button>
        </div>

        {/* Student Actions Menu */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => showStudentAction("markAttendence")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Mark Attendence
          </button>
          <button
            onClick={() => showStudentAction("updateStudentForm")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Update Student Data
          </button>
          <button
            onClick={() => showStudentAction("markGrades")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Student Grades
          </button>
          <button
            onClick={() => showStudentAction("deleteStudentForm")}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Delete Student
          </button>
        </div>

        {/* Add mark attendence */}
        {visibleForm === "markAttendence" && (
          <div id="markAttendence" className="p-4 border rounded-lg bg-gray-50">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">
              Mark Student Attendance for Subjects
            </h4>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="attendanceName"
                  className="block text-gray-600 mb-1"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="attendanceName"
                  required
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Student Name"
                />
              </div>

              <div>
                <label
                  htmlFor="attendanceDepartment"
                  className="block text-gray-600 mb-1"
                >
                  Department:
                </label>
                <input
                  type="text"
                  id="attendanceDepartment"
                  required
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Department Name"
                />
              </div>

              <div>
                <label
                  htmlFor="attendanceDate"
                  className="block text-gray-600 mb-1"
                >
                  Date:
                </label>
                <input
                  type="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  id="attendanceDate"
                  required
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Department Name"
                />
              </div>

              {/* Individual Subjects Attendance */}
              <div>
                <label
                  htmlFor="attendanceSubject1"
                  className="block text-gray-600 mb-1"
                >
                  Subject Name:
                </label>
                <select
                  id="attendanceSubject1"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.subject}>
                      {subject.subject}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="attendeResult"
                  className="block text-gray-600 mb-1"
                >
                  status:
                </label>
                <select
                  id="attendeResult"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                className="col-span-full mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                onClick={handelmarkAttendence}
              >
                Submit Attendance
              </button>
            </form>
          </div>
        )}

        {/* Add Student markGrades */}
        {visibleForm === "markGrades" && (
          <div id="markAttendence" className="p-4 border rounded-lg bg-gray-50">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">
              Mark Student Attendance for Subjects
            </h4>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="gradaeName"
                  className="block text-gray-600 mb-1"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="gradaeName"
                  required
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Student Name"
                />
              </div>

              <div>
                <label
                  htmlFor="gradaeDepartment"
                  className="block text-gray-600 mb-1"
                >
                  Department:
                </label>
                <input
                  type="text"
                  id="gradaeDepartment"
                  required
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Department Name"
                />
              </div>

              {/* Individual Subjects gradae */}
              <div>
                <label
                  htmlFor="gradaeSubject"
                  className="block text-gray-600 mb-1"
                >
                  Subject Name:
                </label>
                <select
                  id="gradaeSubject"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {/* <option value="present">Present</option>
                  <option value="absent">Absent</option> */}
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.subject}>
                      {subject.subject}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="attendeResult"
                  className="block text-gray-600 mb-1"
                >
                  status:
                </label>
                <select
                  id="attendeResult"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="DPlus">E</option>
                  <option value="F">F</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                className="col-span-full mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                onClick={handelmarkGrades}
              >
                Submit Attendance
              </button>
            </form>
          </div>
        )}

        {/* Update Student Form */}
        {visibleForm === "updateStudentForm" && (
          <div
            id="updateStudentForm"
            className="p-4 border rounded-lg bg-gray-50"
          >
            <h4 className="text-lg font-semibold text-gray-700 mb-4">
              Update Student Data
            </h4>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="updateStudentRoll"
                  className="block text-gray-600 mb-1"
                >
                  Roll No:
                </label>
                <input
                  type="text"
                  id="updateStudentRoll"
                  name="roll"
                  value={updateStudentData?.roll }
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label
                  htmlFor="updateStudentName"
                  className="block text-gray-600 mb-1"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="updateStudentName"
                  name="name"
                  value={updateStudentData?.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label
                  htmlFor="updateStudentEmail"
                  className="block text-gray-600 mb-1"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="updateStudentEmail"
                  name="email"
                  value={updateStudentData?.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label
                  htmlFor="updateStudentDept"
                  className="block text-gray-600 mb-1"
                >
                  Department:
                </label>
                <input
                  type="text"
                  id="updateStudentDept"
                  name="department"
                  value={updateStudentData?.department}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label
                  htmlFor="updateStudentPassword"
                  className="block text-gray-600 mb-1"
                >
                  Password:
                </label>
                <input
                  type="password"
                  id="updateStudentPassword"
                  name="password"
                  value={updateStudentData?.password}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <button
                type="button"
                className="col-span-full mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                onClick={handelupdateStudent}
              >
                Submit
              </button>
            </form>
          </div>
        )}

        {/* Delete Student Form */}
        {visibleForm === "deleteStudentForm" && (
          <div
            id="deleteStudentForm"
            className="p-4 border rounded-lg bg-gray-50"
          >
            <h4 className="text-lg font-semibold text-gray-700 mb-4">
              Delete Student
            </h4>
            <form>
              <label
                htmlFor="deleteStudentRoll"
                className="block text-gray-600 mb-1"
              >
                Conform Your Action By Typing RollNo:
              </label>
              <input
                type="text"
                id="deleteStudentRoll"
                required
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                placeholder="Enter Roll Number"
              />
              <button
                type="button"
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                onClick={handeldeleteStudent}
              >
                Delete Student
              </button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
