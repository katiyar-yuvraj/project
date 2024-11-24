import React from 'react';

const Announcements = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar or Navigation (if applicable) */}
      <div className="ml-64 w-full p-6">
        {/* Header */}
        <header className="bg-white shadow rounded mb-6 flex justify-between items-center p-4">
          <div className="text-xl font-semibold text-gray-800">Announcements</div>
          <div className="flex items-center space-x-4">
            <img
              src="profile.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-2xl cursor-pointer text-gray-600">🔔</span>
          </div>
        </header>

        {/* Announcements Section */}
        <section className="bg-white shadow rounded p-6 text-center">
          <div className="announcement-message">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">
              No New Announcements
            </h3>
            <p className="text-gray-700">
              Stay tuned! Any new announcements will appear here.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Announcements;
