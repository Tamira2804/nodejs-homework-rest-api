/*
1. should successfully log in a user
        status 200
        token
        check token validity and expiration date 1h

2. failed authentication 
        status 401 & error message "Email is not valid"
        status 401 & error message "Password is not valid"

*/

require("dotenv").config();
const mongoose = require("mongoose");
const { User } = require("../../models/userModel");
const testRequest = require("supertest");
const app = require("../../app");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { DB_TEST_HOST, JWT_SECRET } = process.env;

describe("Controller login", () => {
  beforeAll(async () => {
    await mongoose
      .connect(DB_TEST_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("DB Connected"))
      .catch((error) => console.error(error));

    await User.deleteMany({});
  }, 10000);

  test("should successfully log in a user", async () => {
    const loginUser = {
      name: "loginUser",
      email: "loginUserEmail@gmail.com",
      password: "loginUserPassword",
    };
    const hashedPassword = await bcrypt.hash(loginUser.password, 10);
    const user = new User({
      name: loginUser.name,
      email: loginUser.email,
      password: hashedPassword,
    });
    await user.save();

    const response = await testRequest(app)
      .post("/api/users/login")
      .send({ email: loginUser.email, password: loginUser.password });

    // status 200 & token
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeTruthy();

    // check token validity and expiration date 1h
    const decoded = jwt.verify(response.body.token, JWT_SECRET);
    const expirationTimeInSeconds = decoded.exp;
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const tokenValidityPeriod = 3600; // 1 h in seconds
    const timeDifference = expirationTimeInSeconds - currentTimeInSeconds;
    expect(timeDifference).toBeLessThanOrEqual(tokenValidityPeriod);
  });

  test("Email is not valid' for an invalid email", async () => {
    const loginUser = {
      email: "loginUserEmail@gmail.com",
      password: "loginUserPassword",
    };
    const response = await testRequest(app).post("/api/users/login").send({
      email: "invalidEmail@example.com",
      password: loginUser.password,
    });

    expect(response.statusCode).toBe(401);
    expect(response.body).toBe("Email is not valid");
  });

  test("'Password is not valid' for an invalid password", async () => {
    const loginUser = {
      email: "loginUserEmail@gmail.com",
      password: "loginUserPassword",
    };
    const response = await testRequest(app)
      .post("/api/users/login")
      .send({ email: loginUser.email, password: "invalidPassword" });

    expect(response.statusCode).toBe(401);
    expect(response.body).toBe("Password is not valid");
  });

  afterAll(async () => {
    await mongoose.disconnect().then(() => console.log("DB disconnected"));
  });
});
