import React, { useState, useEffect, useContext } from "react";
import StudentContext from "../context/StudentContext";

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const { User } = useContext(StudentContext); // Access User context to get rollNumber

  useEffect(() => {
    // Function to fetch grades data from the backend
    const fetchGrades = async () => {
      if (!User?.rollNumber) {
        setLoading(false); // If no roll number, stop loading
        // // sample data
        // const data = [
        //   { subject: "Mathematics", grade: "A", gradeColor: "text-green-600" },
        //   { subject: "Science", grade: "B+", gradeColor: "text-blue-600" },
        //   { subject: "History", grade: "A-", gradeColor: "text-red-600" },
        // ];
        // setGrades(data);
        return;
      }

      try {
        // Make API request to get grades based on roll number
        const response = await fetch(
          `${import.meta.env.VITE_HOST_URL}/grades/${User?.rollNumber}`
        );
        const data = await response.json();

        // Map response data to desired structure
        const mappedGrades = data.map((item) => ({
          subject: item.subject,
          grade: item.grade,
          gradeColor: item.gradeColor,
        }));

        // Set grades and stop loading
        setGrades(mappedGrades);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch grades:", error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchGrades(); // Call fetch function
  }, [User]); // Re-run the effect if the `User` context changes

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="ml-64 w-full p-6">
        {/* Header */}
        <header className="bg-white shadow rounded mb-6 flex justify-between items-center p-4">
          <div className="text-xl font-semibold text-gray-800">Grades</div>
          <div className="flex items-center space-x-4">
            <img
              src="profile.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-2xl cursor-pointer text-gray-600">🔔</span>
          </div>
        </header>

        {/* Grades Section */}
        <section>
          <h2 className="text-2xl font-bold text-blue-700 mb-6">My Grades</h2>

          {/* Grades Table */}
          <table className="w-full border-collapse bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-blue-700 text-white">
                <th className="p-4 text-left text-lg">Subject</th>
                <th className="p-4 text-left text-lg">Grade</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="2" className="p-4 text-center text-gray-700">
                    Loading grades...
                  </td>
                </tr>
              ) : grades.length === 0 ? (
                <tr>
                  <td colSpan="2" className="p-4 text-center text-gray-700">
                    No grades data available.
                  </td>
                </tr>
              ) : (
                grades.map((grade, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-4 text-gray-700">{grade.subject}</td>
                    <td className={`p-4 font-semibold ${grade.gradeColor}`}>
                      {grade.grade}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default Grades;
