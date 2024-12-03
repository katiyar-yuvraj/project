const express = require('express');

const router = express.Router();

//  Function to calculate the date 12 days from today
  const getDateDaysAhead = (num) => {
    const today = new Date();
    today.setDate(today.getDate() + num);
    return today.toLocaleDateString(); // Return the date in a readable format
  };
const notifications = [
    {
      id: 1,
      title: 'New Assignment Due',
      message: `Your next assignment for Mathematics is due by ${getDateDaysAhead(15)}.`,
    },
    {
      id: 2,
      title: 'Class Canceled',
      message: `The class for Digital Electronics on ${getDateDaysAhead(20)} has been canceled.`,
    },
  ];

// Routes

router.get('/', (req, res) => {
    res.status(200).json(notifications);
});

router.post('/', (req, res) => {
    const newNotification = req.body;
    notifications.push(newNotification);
    res.status(201).json(newNotification);
});

module.exports = router;
