const express = require('express');
const { model } = require('mongoose');

const router = express.Router();

const notifications = [
    {
      id: 1,
      title: 'New Assignment Due',
      message: `Your next assignment for ${courseName} is due by ${getDateDaysAhead(15)}.`,
    },
    {
      id: 2,
      title: 'Class Canceled',
      message: `The class for ${courseName} on ${getDateDaysAhead(20)} has been canceled.`,
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

model.exports = router;
