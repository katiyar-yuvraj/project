import React, { useState } from "react";

const MarkGrades = ({ visibleForm, subjects, rollNumber }) => {
  // State for form inputs
  const [studentName, setStudentName] = useState("");
  const [department, setDepartment] = useState("");
  const [subject, setSubject] = useState(subjects[0]?.subject || "");
  const [grade, setGrade] = useState("A");

  // Function to handle form submission
  const handleMarkGrades = async () => {
    if (!rollNumber) {
      alert("Roll Number is required!");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_HOST_URL}/student/mark-grade/${rollNumber}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          marks: convertGradeToMarks(grade),
          maxMarks: 100, // Assuming max marks are 100
        }),
      });

      if (response.ok) {
        alert("Grade marked successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error marking grades:", errorData);
        alert("Failed to mark grades. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error.message);
      alert("An error occurred. Please try again later.");
    }
  };

  // Helper function to convert grades to numerical marks
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

  return (
    <>
       (
        <div id="markGrades" className="p-4 border rounded-lg bg-gray-50">
          <h4 className="text-lg font-semibold text-gray-700 mb-4">
            Mark Student Grades for Subjects
          </h4>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="gradeName" className="block text-gray-600 mb-1">
                Name:
              </label>
              <input
                type="text"
                id="gradeName"
                required
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Student Name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="gradeDepartment"
                className="block text-gray-600 mb-1"
              >
                Department:
              </label>
              <input
                type="text"
                id="gradeDepartment"
                required
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Department Name"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="gradeSubject" className="block text-gray-600 mb-1">
                Subject Name:
              </label>
              <select
                id="gradeSubject"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.subject}>
                    {subject.subject}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="gradeResult" className="block text-gray-600 mb-1">
                Grade:
              </label>
              <select
                id="gradeResult"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
              </select>
            </div>

            <button
              type="button"
              className="col-span-full mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              onClick={handleMarkGrades}
            >
              Submit Grades
            </button>
          </form>
        </div>
      )
    </>
  );
};

export default MarkGrades;
