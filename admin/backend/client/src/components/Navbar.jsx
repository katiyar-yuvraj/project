import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Define menu items as a constant
  const menuItems = [
    { id: 1, name: "Dashboard", path: "/dashboard" },
    { id: 2, name: "Grades", path: "/dashboard/grades" },
    { id: 3, name: "Attendance", path: "/dashboard/attendance" },
    { id: 4, name: "Timetable", path: "/dashboard/timetable" },
    { id: 5, name: "Announcements", path: "/dashboard/announcements" },
  ];

  return (
    <nav className="w-64 bg-blue-700 text-white h-screen fixed top-0 left-0 pt-8">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold">IKGPTU School</h2>
      </div>
      <ul className="list-none p-0">
        {menuItems.map((item) => (
          <li key={item.id} className="mb-5">
            <Link
              to={item.path}
              className="block px-6 py-3 text-lg hover:bg-blue-800 active:bg-blue-900 rounded-lg"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
