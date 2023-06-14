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

// Get Single Workout
describe("GET /api/workouts/:id", () => {
  it("should return a workouts", async () => {
    const res = await request(app).get(
      "/api/workouts/64897efc9701cfe1e2665640"
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Bench Press");
  });
});

// Create Workout
describe("POST /api/workouts", () => {
  it("should create a workouts", async () => {
    const res = await request(app).post("/api/workouts").send({
      title: "Push Up",
      reps: 18,
      load: 4,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Push Up");
  });
});

// Update Workout
describe("PUT /api/workouts/:id", () => {
  it("should update a workouts", async () => {
    const res = await request(app)
      .patch("/api/workouts/64897efc9701cfe1e2665640")
      .send({
        title: "Bench Press",
        reps: 100,
        load: 20,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.load).toBe(20);
  });
});

// Delete Workout
describe("DELETE /api/workouts/:id", () => {
  it("should delete a workouts", async () => {
    const res = await request(app).delete(
      "/api/workouts/64897efc9701cfe1e2665640"
    );
    expect(res.statusCode).toBe(200);
  });
});
