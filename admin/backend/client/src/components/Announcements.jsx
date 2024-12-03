import React, { useState, useEffect } from "react";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to calculate the date 12 days from today
  // const getDateDaysAhead = (num) => {
  //   const today = new Date();
  //   today.setDate(today.getDate() + num);
  //   return today.toLocaleDateString(); // Return the date in a readable format
  // };

  useEffect(() => {
    // Simulate fetching announcements data
    const fetchAnnouncements = async () => {
      try {
        // Simulate fetching data from an API or database
        const data = await fetch(
          `${import.meta.env.VITE_HOST_URL}/announcement`
        ).then((res) => res.json());

        setAnnouncements(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching announcements:", error);
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="ml-64 w-full p-6">
        {/* Header */}
        <header className="bg-white shadow rounded mb-6 flex justify-between items-center p-4">
          <div className="text-xl font-semibold text-gray-800">
            Announcements
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

        {/* Announcements Section */}
        <section className="bg-white shadow rounded p-6">
          {loading ? (
            <div className="text-center text-gray-700">
              Loading announcements...
            </div>
          ) : announcements.length === 0 ? (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-blue-700 mb-4">
                No New Announcements
              </h3>
              <p className="text-gray-700">
                Stay tuned! Any new announcements will appear here.
              </p>
            </div>
          ) : (
            announcements.map((announcement) => (
              <div key={announcement.id} className="announcement-message mb-6">
                <h3 className="text-2xl font-bold text-blue-700 mb-4">
                  {announcement.title}
                </h3>
                <p className="text-gray-700">{announcement.message}</p>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default Announcements;
