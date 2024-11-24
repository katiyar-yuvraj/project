import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
    <nav className="w-64 bg-blue-700 text-white h-screen fixed top-0 left-0 pt-8">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold">My School</h2>
      </div>
      <ul className="list-none p-0">
        <li className="mb-5">
          <Link
            to="/dashboard"
            className="block px-6 py-3 text-lg hover:bg-blue-800 active:bg-blue-900 rounded-lg"
          >
            Dashboard
          </Link>
        </li>
        {/* Uncomment the following lines for more menu options */}
        {/* <li className="mb-5">
          <Link
            to="/courses"
            className="block px-6 py-3 text-lg hover:bg-blue-800 active:bg-blue-900 rounded-lg"
          >
            My Courses
          </Link>
        </li> */}
        {/* <li className="mb-5">
          <Link
            to="/assignments"
            className="block px-6 py-3 text-lg hover:bg-blue-800 active:bg-blue-900 rounded-lg"
          >
            Assignments
          </Link>
        </li> */}
        <li className="mb-5">
          <Link
            to="/dashboard/grades"
            className="block px-6 py-3 text-lg hover:bg-blue-800 active:bg-blue-900 rounded-lg"
          >
            Grades
          </Link>
        </li>
        <li className="mb-5">
          <Link
            to="/dashboard/attendance"
            className="block px-6 py-3 text-lg hover:bg-blue-800 active:bg-blue-900 rounded-lg"
          >
            Attendance
          </Link>
        </li>
        <li className="mb-5">
          <Link
            to="/dashboard/timetable"
            className="block px-6 py-3 text-lg hover:bg-blue-800 active:bg-blue-900 rounded-lg"
          >
            Timetable
          </Link>
        </li>
        {/* <li className="mb-5">
          <Link
            to="/messages"
            className="block px-6 py-3 text-lg hover:bg-blue-800 active:bg-blue-900 rounded-lg"
          >
            Messages
          </Link>
        </li> */}
        <li className="mb-5">
          <Link
            to="/dashboard/announcements"
            className="block px-6 py-3 text-lg hover:bg-blue-800 active:bg-blue-900 rounded-lg"
          >
            Announcements
          </Link>
        </li>
      </ul>
    </nav>
     </>
  );
};

export default Navbar;
