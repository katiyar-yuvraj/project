import React from 'react';

const Grades = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar or Navigation (if required) */}
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
            <tbody id="gradesData">
              {/* Placeholder rows; replace with dynamic data */}
              <tr className="border-b">
                <td className="p-4 text-gray-700">Mathematics</td>
                <td className="p-4 font-semibold text-green-600">A</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 text-gray-700">Science</td>
                <td className="p-4 font-semibold text-blue-600">B+</td>
              </tr>
              <tr>
                <td className="p-4 text-gray-700">History</td>
                <td className="p-4 font-semibold text-red-600">A-</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default Grades;
