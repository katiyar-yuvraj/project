const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { userRoutes, studentRouter, attendanceRoutes } = require("./routes");

const connect = require("./db.js");

dotenv.config();

const app = express();

connect()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/api/admin', adminRoutes);

const PORT = process.env.APP_PORT || 3000;

app.use("/student", userRoutes);
app.use("/student", studentRouter);
app.use("/attendance", attendanceRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Hello, welcome to my Express app!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
