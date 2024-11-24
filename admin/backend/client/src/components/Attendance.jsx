import React, { useState, useEffect } from 'react';

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching attendance data
    const fetchAttendanceData = async () => {
      try {
        const data = await Promise.resolve([
          { date: 'Oct 1, 2024', subject: 'Mathematics', status: 'Present' },
          { date: 'Oct 2, 2024', subject: 'Science', status: 'Absent' },
          { date: 'Oct 3, 2024', subject: 'English', status: 'Present' },
          { date: 'Oct 4, 2024', subject: 'History', status: 'Present' },
          { date: 'Oct 5, 2024', subject: 'Geography', status: 'Present' },
        ]);
        setAttendanceData(data);

        // Calculate attendance percentage
        const totalClasses = data.length;
        const presentClasses = data.filter(item => item.status === 'Present').length;
        setAttendancePercentage(((presentClasses / totalClasses) * 100).toFixed(2));

        setLoading(false);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="ml-64 w-full p-6">
        {/* Header */}
        <header className="bg-white shadow rounded mb-6 flex justify-between items-center p-4">
          <div className="text-xl font-semibold text-gray-800">Attendance</div>
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
          <h2 className="text-2xl font-bold text-blue-700 mb-6">Attendance Record</h2>

          {/* Attendance Percentage */}
          <div className="bg-white shadow rounded p-4 mb-6">
            <h3 className="text-lg font-bold text-blue-700">
              Current Semester Attendance: 
              <span className="text-gray-800"> {loading ? 'Loading...' : `${attendancePercentage}%`}</span>
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
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-gray-700">Loading attendance data...</td>
                </tr>
              ) : (
                attendanceData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-4 text-gray-700">{item.date}</td>
                    <td className="p-4 text-gray-700">{item.subject}</td>
                    <td className={`p-4 font-semibold ${item.status === 'Present' ? 'text-green-600' : 'text-red-600'}`}>
                      {item.status}
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

export default Attendance;
