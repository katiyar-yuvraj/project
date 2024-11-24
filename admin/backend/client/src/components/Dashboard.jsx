import React, { useContext } from "react";
import StudentContext from "../context/StudentContext";

export default function Dashboard() {
  const { User } = useContext(StudentContext);
    // TODO:using useEffect have to set context 
    
  return (
    1 && (
      <>
        <div className="flex min-h-screen bg-gray-100">
          <div className="ml-64 w-full p-6">
            {/* Header */}
            <header className="bg-white shadow rounded mb-6 flex justify-between items-center p-4">
              <div className="text-xl font-semibold">
                Welcome, <span className="text-blue-700">{User?.userId?.name || "UserName"}</span>
              </div>
              <div className="flex items-center space-x-4">
                <img
                  src={`User?.userId?.profileImg || "/public/vite.svg"<`}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-2xl cursor-pointer">🔔</span>
              </div>
            </header>

            {/* Dashboard Overview */}
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white shadow rounded p-4 text-center">
                <h3 className="text-blue-700 text-lg font-semibold mb-2">
                  Today's Classes
                </h3>
                <p className="text-gray-700">2 Classes Scheduled</p>
              </div>
              <div className="bg-white shadow rounded p-4 text-center">
                <h3 className="text-blue-700 text-lg font-semibold mb-2">
                  Pending Assignments
                </h3>
                <p className="text-gray-700">3 Assignments Due</p>
              </div>
              <div className="bg-white shadow rounded p-4 text-center">
                <h3 className="text-blue-700 text-lg font-semibold mb-2">
                  Next Exam Date
                </h3>
                <p className="text-gray-700">October 15, 2024</p>
              </div>
              <div className="bg-white shadow rounded p-4 text-center">
                <h3 className="text-blue-700 text-lg font-semibold mb-2">
                  Attendance Overview
                </h3>
                <p className="text-gray-700">
                  Attendance: <span id="attendanceDisplay">Loading...</span>
                </p>
              </div>
            </section>

            {/* Recent Grades */}
            <section className="mt-8">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">
                Recent Grades
              </h2>
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
      </>
    )
  );
}
