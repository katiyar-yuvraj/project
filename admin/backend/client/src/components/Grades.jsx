import React, { useState, useEffect } from 'react';

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating fetching grades data
    const fetchGrades = async () => {
      try {
        const fetchedGrades = await Promise.resolve([
          { subject: 'Mathematics', grade: 'A', gradeColor: 'text-green-600' },
          { subject: 'Science', grade: 'B+', gradeColor: 'text-blue-600' },
          { subject: 'History', grade: 'A-', gradeColor: 'text-red-600' },
        ]);
        setGrades(fetchedGrades);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch grades:', error);
        setLoading(false);
      }
    };

    fetchGrades();
  }, []);

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
