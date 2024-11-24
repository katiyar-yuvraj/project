import React from 'react';

const Attendance = () => {
 return(
  <div className="flex min-h-screen bg-gray-100">
  {/* Sidebar or Navigation (if required) */}
  <div className="ml-64 w-full p-6">
    {/* Header */}
    <header className="bg-white shadow rounded mb-6 flex justify-between items-center p-4">
      <div className="text-xl font-semibold text-gray-800">
        Attendance
      </div>
      <div className="flex items-center space-x-4">
        <img
          src="profile.jpg"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="text-2xl cursor-pointer text-gray-600">🔔</span>
      </div>
    </header>

    {/* Attendance Overview Section */}
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        Attendance Record
      </h2>

      {/* Attendance Percentage */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h3 className="text-lg font-bold text-blue-700">
          Current Semester Attendance: 
          <span id="attendancePercentage" className="text-gray-800"> 0%</span>
        </h3>
      </div>
    </section>

    {/* Attendance Table */}
    <section>
      <table className="w-full border-collapse bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-blue-700 text-white">
            <th className="p-4 text-left text-lg">Date</th>
            <th className="p-4 text-left text-lg">Subject</th>
            <th className="p-4 text-left text-lg">Status</th>
          </tr>
        </thead>
        <tbody id="attendanceData">
          <tr className="border-b">
            <td className="p-4 text-gray-700">Oct 1, 2024</td>
            <td className="p-4 text-gray-700">Mathematics</td>
            <td className="p-4 font-semibold text-green-600">Present</td>
          </tr>
          <tr className="border-b">
            <td className="p-4 text-gray-700">Oct 2, 2024</td>
            <td className="p-4 text-gray-700">Science</td>
            <td className="p-4 font-semibold text-red-600">Absent</td>
          </tr>
          <tr className="border-b">
            <td className="p-4 text-gray-700">Oct 3, 2024</td>
            <td className="p-4 text-gray-700">English</td>
            <td className="p-4 font-semibold text-green-600">Present</td>
          </tr>
          <tr className="border-b">
            <td className="p-4 text-gray-700">Oct 4, 2024</td>
            <td className="p-4 text-gray-700">History</td>
            <td className="p-4 font-semibold text-green-600">Present</td>
          </tr>
          <tr>
            <td className="p-4 text-gray-700">Oct 5, 2024</td>
            <td className="p-4 text-gray-700">Geography</td>
            <td className="p-4 font-semibold text-green-600">Present</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</div>

 )
};

export default Attendance;
