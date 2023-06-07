const mongoose = require("mongoose");
const request = require("supertest");
const app = require('./server')

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
      "/api/workouts/64428dacdfb535aa8fa5a15d"
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Jumping");
  });
});
