import React from 'react';

const TimeTable = () => {
  const timeTableData = [
    { day: "Monday", classes: ["Math (9:00 AM)", "Science (11:00 AM)", "English (2:00 PM)"] },
    { day: "Tuesday", classes: ["History (10:00 AM)", "Physics (12:00 PM)", "PE (3:00 PM)"] },
    { day: "Wednesday", classes: ["Biology (9:30 AM)", "Chemistry (11:30 AM)", "Arts (2:30 PM)"] },
    { day: "Thursday", classes: ["Geography (10:00 AM)", "Economics (1:00 PM)", "Math (3:30 PM)"] },
    { day: "Friday", classes: ["Computer Science (9:00 AM)", "Music (11:00 AM)", "English (2:00 PM)"] },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar or Navigation (if applicable) */}
      <div className="ml-64 w-full p-6">
        {/* Header */}
        <header className="bg-white shadow rounded mb-6 flex justify-between items-center p-4">
          <div className="text-xl font-semibold text-gray-800">Time Table</div>
          <div className="flex items-center space-x-4">
            <img
              src="profile.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-2xl cursor-pointer text-gray-600">🔔</span>
          </div>
        </header>

        {/* Timetable Section */}
        <section>
          <h2 className="text-2xl font-bold text-blue-700 mb-6">Weekly Time Table</h2>

          {/* Timetable Table */}
          <table className="w-full border-collapse bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-blue-700 text-white">
                <th className="p-4 text-left text-lg">Day</th>
                <th className="p-4 text-left text-lg">Classes</th>
              </tr>
            </thead>
            <tbody>
              {timeTableData.map((daySchedule, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4 text-gray-700 font-medium">{daySchedule.day}</td>
                  <td className="p-4 text-gray-700">
                    {daySchedule.classes.map((classItem, idx) => (
                      <div key={idx} className="mb-2">
                        {classItem}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default TimeTable;
