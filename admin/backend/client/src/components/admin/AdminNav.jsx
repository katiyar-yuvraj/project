import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => {
  // Define menu items as a constant
  const menuItems = [
    { id: 1, name: "Dashboard", path: "/admin" },
    { id: 2, name: "Add New Student", path: "/register" },
    { id: 2, name: "Student Portal", path: "/" },
  ];

  return (
    <nav className="w-64 bg-blue-700 text-white h-screen fixed top-0 left-0 pt-8">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold">IKGPTU Admin</h2>
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

export default AdminNav;
