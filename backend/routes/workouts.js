const express = require("express");
const router = express.Router();
const {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} = require("../controller/workoutController");

// GET all workouts
router.get("/", getWorkouts);

// GET a single workout
router.get("/:id", getWorkoutById);

// CREATE a new workout
router.post("/", createWorkout);

// DELETE a workout
router.delete("/:id", deleteWorkout);

// UPDATE a workout
router.patch("/:id", updateWorkout);

module.exports = router;
