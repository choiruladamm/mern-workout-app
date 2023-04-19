const express = require("express");
require("dotenv").config();
const workoutRoutes = require("./routes/workouts");

// express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);

// listening for request
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
