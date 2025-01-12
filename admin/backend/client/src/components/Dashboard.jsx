import React, { useState, useEffect, useContext } from "react";
import StudentContext from "../context/StudentContext";

export default function Dashboard() {
  const { User} = useContext(StudentContext); 
  const [attendance, setAttendance] = useState("Loading...");
  const [dashboardData, setDashboardData] = useState({
    classes: 0,
    assignments: 0,
    nextExam: "Not Scheduled",
  });
  
  useEffect(() => {
    // Simulate fetching user and dashboard data
    // const fetchUserData = async () => {
    //   try {
    //     const userData = await Promise.resolve({
    //       userId: {
    //         name: "John Doe",
    //         profileImg: "/vite.svg",
    //       },
    //     });
    //     //(userData); // Update user context
    //   } catch (error) {
    //     console.error("Failed to fetch user data:", error);
    //   }
    // };

    const fetchDashboardData = async () => {
      try {
        const data = await Promise.resolve({
          classes: 3,
          assignments: 2,
          nextExam: "October 15, 2024",
        });
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    const fetchAttendance = async () => {
      try {
        const attendanceData = await Promise.resolve("85%");
        setAttendance(attendanceData);
      } catch (error) {
        console.error("Failed to fetch attendance:", error);
      }
    };

    // fetchUserData();
    fetchDashboardData();
    fetchAttendance();
  }, [User]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="ml-64 w-full p-6">
        {/* Header */}
        <header className="bg-white shadow rounded mb-6 flex justify-between items-center p-4">
          <div className="text-xl font-semibold">
            Welcome, <span className="text-blue-700">{`${User?.userId?.name} (${User?.userId?.email})`  || "UserName"}</span>
          </div>
          <div className="flex items-center space-x-4">
          {/* <img
              src="profile.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            /> */}
            <a
              href="/dashboard/announcements"
            >
              <span className="text-2xl cursor-pointer text-gray-600">🔔</span>
            </a>
          </div>
        </header>

        {/* Dashboard Overview */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white shadow rounded p-4 text-center">
            <h3 className="text-blue-700 text-lg font-semibold mb-2">Today's Classes</h3>
            <p className="text-gray-700">{dashboardData.classes} Classes Scheduled</p>
          </div>
          <div className="bg-white shadow rounded p-4 text-center">
            <h3 className="text-blue-700 text-lg font-semibold mb-2">Pending Assignments</h3>
            <p className="text-gray-700">{dashboardData.assignments} Assignments Due</p>
          </div>
          <div className="bg-white shadow rounded p-4 text-center">
            <h3 className="text-blue-700 text-lg font-semibold mb-2">Next Exam Date</h3>
            <p className="text-gray-700">{dashboardData.nextExam}</p>
          </div>
          <div className="bg-white shadow rounded p-4 text-center">
            <h3 className="text-blue-700 text-lg font-semibold mb-2">Attendance Overview</h3>
            <p className="text-gray-700">Attendance: {attendance}</p>
          </div>
        </section>

        {/* Recent Grades */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Recent Grades</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-700 text-white">
                <th className="p-3 text-left">Subject</th>
                <th className="p-3 text-left">Grade</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">Math</td>
                <td className="p-3">A</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Science</td>
                <td className="p-3">B+</td>
              </tr>
              <tr>
                <td className="p-3">History</td>
                <td className="p-3">A-</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
