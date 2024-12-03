import React, { useState, useEffect, useContext } from 'react';
import StudentContext from '../context/StudentContext';

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const [loading, setLoading] = useState(true);
  const { User } = useContext(StudentContext); // Getting User context

  useEffect(() => {
    // Function to fetch attendance data
    const fetchAttendanceData = async () => {
      try {
        // Fetch attendance data from the backend
        const response = await fetch(`${import.meta.env.VITE_HOST_URL}/attendance/${User?.rollNumber}`);
        const data = await response.json();
        
        // Check if the response contains attendance data
        const attendance = data.attendance || []; // Fallback to empty array if no attendance found
        
        setAttendanceData(attendance);

        // Calculate attendance percentage
        const totalClasses = attendance.length;
        const presentClasses = attendance.filter(item => item.status === 'Present').length;
        const percentage = totalClasses ? ((presentClasses / totalClasses) * 100).toFixed(2) : 0;
        setAttendancePercentage(percentage);

        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching attendance data:', error);
        setLoading(false); // Set loading to false on error
      }
    };

    // Fetch attendance data on mount
    if (User?.rollNumber) {
      fetchAttendanceData();
    } else {
      setLoading(false); // If no roll number, stop loading
    }
  }, [User]);

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
                attendanceData.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="p-4 text-center text-gray-700">No attendance data available.</td>
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
                )
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default Attendance;
