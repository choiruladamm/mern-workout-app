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

describe("GET /api/workouts", () => {
  it("should return all workouts", async () => {
    const res = await request(app).get("/api/workouts");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /api/workouts/:id", () => {
  it("should return a workouts", async () => {
    const res = await request(app).get(
      "/api/workouts/64888eb4281f081d38eb74b7"
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Bench Press");
  });
});

describe("PUT /api/workouts/:id", () => {
  it("should update a workouts", async () => {
    const res = await request(app)
      .patch("/api/workouts/64888eb4281f081d38eb74b7")
      .send({
        title: "Bench Press",
        reps: 100,
        load: 20,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.load).toBe(20);
  });
});

describe("DELETE /api/workouts/:id", () => {
  it("should delete a workouts", async () => {
    const res = await request(app).delete(
      "/api/workouts/64888eb4281f081d38eb74b7"
    );
    expect(res.statusCode).toBe(200);
  });
});

// test-merge