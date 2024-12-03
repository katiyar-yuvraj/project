const express = require("express");
const router = express.Router();

// Helper function to format date as "Mon 12 Jan"
const formatDate = (date) => {
  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  return new Date(date).toLocaleDateString('en-US', options);
};

// Function to get dates for the current week
const getWeekDates = () => {
  const weekDates = [];
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();
  const diff = currentDate.getDate() - dayOfWeek + (dayOfWeek == 0 ? -6 : 1); // Adjust for Sunday

  // Loop over the days of the week (Mon to Fri)
  for (let i = 0; i < 5; i++) {
    const date = new Date(currentDate.setDate(diff + i));
    weekDates.push(formatDate(date));
  }

  return weekDates;
};

// Sample timetable data with engineering subjects and dates
const defaultTimetable = [
  { day: getWeekDates()[0], classes: ["Computer Science (9:00 AM)", "Electrical Engineering (11:00 AM)", "Mathematics (2:00 PM)"] },
  { day: getWeekDates()[1], classes: ["Mechanical Engineering (10:00 AM)", "Physics (12:00 PM)", "Control Systems (3:00 PM)"] },
  { day: getWeekDates()[2], classes: ["Civil Engineering (9:30 AM)", "Thermodynamics (11:30 AM)", "Engineering Drawing (2:30 PM)"] },
  { day: getWeekDates()[3], classes: ["Software Engineering (10:00 AM)", "Electronics (1:00 PM)", "Fluid Mechanics (3:30 PM)"] },
  { day: getWeekDates()[4], classes: ["Artificial Intelligence (9:00 AM)", "Signals & Systems (11:00 AM)", "Mechanical Engineering (2:00 PM)"] }
];

// Route to get timetable by courseId or default
router.get("/:courseId?", (req, res) => {
  const { courseId } = req.params;

  if (courseId) {
    // You can add logic here to fetch the timetable for the given courseId from the database
    // For now, let's assume that for any valid courseId, we send a course-specific timetable

    // Example of a specific engineering course timetable (this can be fetched from your database)
    const courseTimetable = [
      { day: getWeekDates()[0], classes: ["Computer Science (9:00 AM)", "Electrical Engineering (11:00 AM)", "Mathematics (2:00 PM)"] },
      { day: getWeekDates()[1], classes: ["Mechanical Engineering (10:00 AM)", "Physics (12:00 PM)", "Control Systems (3:00 PM)"] },
      { day: getWeekDates()[2], classes: ["Civil Engineering (9:30 AM)", "Thermodynamics (11:30 AM)", "Engineering Drawing (2:30 PM)"] },
      { day: getWeekDates()[3], classes: ["Software Engineering (10:00 AM)", "Electronics (1:00 PM)", "Fluid Mechanics (3:30 PM)"] },
      { day: getWeekDates()[4], classes: ["Artificial Intelligence (9:00 AM)", "Signals & Systems (11:00 AM)", "Mechanical Engineering (2:00 PM)"] }
    ];

    return res.json({ timetable: courseTimetable });
  }

  // If courseId is not provided, send the default timetable
  return res.json({ timetable: defaultTimetable });
});

module.exports = router;
