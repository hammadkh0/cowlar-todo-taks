const request = require("supertest");
const app = require("../server");
const User = require("./userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
beforeAll(async () => {
  await mongoose.connect(process.env.TEST_DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});

describe("User Authentication", () => {
  let user;
  beforeAll(async () => {
    user = await User.create({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
      image: "testimage.jpg",
    });
  });

  afterAll(async () => {
    await User.deleteMany();
  });

  test("should signup a new user", async () => {
    const res = await request(app).post("/api/v1/users/signup").send({
      name: "New User",
      email: "newuser@example.com",
      password: "password123",
      image: "newimage.jpg",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.status).toEqual("success");
    expect(res.body.name).toEqual("New User");
    expect(res.body.image).toEqual("newimage.jpg");
    expect(res.body.token).toBeDefined();
  });

  test("should not signup a user with an existing email", async () => {
    const res = await request(app).post("/api/v1/users/signup").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
      image: "testimage.jpg",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.status).toEqual("fail");
    expect(res.body.message).toBeDefined();
  });

  test("should login an existing user", async () => {
    const hashedPassword = await bcrypt.hash("password123", 12);
    const user = new User({
      name: "John Doe",
      email: "john@example.com",
      password: hashedPassword,
      image: "avatar.jpg",
    });
    await user.save();

    const response = await request(app).post("/api/v1/users/login").send({
      email: "john@example.com",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("name", "John Doe");
    expect(response.body).toHaveProperty("image", "avatar.jpg");
    expect(response.body).toHaveProperty("token");
  });

  test("should not login a non-existing user", async () => {
    const res = await request(app).post("/api/v1/users/login").send({
      email: "nonexistinguser@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body.status).toEqual("fail");
    expect(res.body.message).toBeDefined();
  });

  test("should not login a user with incorrect password", async () => {
    const res = await request(app).post("/api/v1/users/login").send({
      email: "testuser@example.com",
      password: "incorrectpassword",
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body.status).toEqual("fail");
    expect(res.body.message).toBeDefined();
  });
});
