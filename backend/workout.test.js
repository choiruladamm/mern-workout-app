const mongoose = require("mongoose");
const request = require("supertest");
const app = require("./server");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

// Get ALL Workout
describe("GET /api/workouts", () => {
  it("should return all workouts", async () => {
    const res = await request(app).get("/api/workouts");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

// Create Workout
describe("POST /api/workouts", () => {
  it("should create a workouts", async () => {
    const res = await request(app).post("/api/workouts").send({
      title: "Bench Press",
      reps: 18,
      load: 4,
    });
    expect(res.statusCode).toBe(201);
    // expect(res.body.title).toBe("Push Up");
  });
});

// Get Single Workout
describe("GET /api/workouts/:id", () => {
  it("should return a workouts", async () => {
    const res = await request(app).get(
      "/api/workouts/6440ffb78f71c60ea35487e2"
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Push Ups");
  });
});

// Update Workout
describe("PUT /api/workouts/:id", () => {
  it("should update a workouts", async () => {
    const res = await request(app)
      .patch("/api/workouts/6440ffb78f71c60ea35487e2")
      .send({
        title: "Push Ups",
        reps: 200,
        load: 20,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.load).toBe(20);
  });
});

// // Delete Workout
// describe("DELETE /api/workouts/:id", () => {
//   it("should delete a workouts", async () => {
//     const res = await request(app).delete(
//       "/api/workouts/64898d10e93103a11acfdfc6"
//     );
//     expect(res.statusCode).toBe(200);
//   });
// });
