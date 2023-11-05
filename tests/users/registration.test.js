/*
1.	should registrate new user 
        status 201
        data of the new user (email)
        data of the new user (valid subscription)
        save the new user in the database
        should hash the password
        should get the avatar URL
        
2.	shouldn't registrate the same user 2 times


3.	Handling invalid data scenarios (invalid email, missing required fields in the request, etc.)???
Чи потрібно писати тести на валідність даних, тобто на те, що ми валідували за допомогою UserSchema & Joi ?
*/

require("dotenv").config();
const mongoose = require("mongoose");
const testRequest = require("supertest");
const app = require("../../app");
const { User } = require("../../models/userModel");
const { testUser } = require("./testuser");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const { DB_TEST_HOST } = process.env;

describe("Controller registration", () => {
  beforeAll(async () => {
    await mongoose
      .connect(DB_TEST_HOST)
      .then(() => console.log("DB Connected"))
      .catch((error) => console.error(error));

    await User.deleteMany({});
  }, 10000);

  test("should registrate new user", async () => {
    const response = await testRequest(app)
      .post("/api/users/registration")
      .send(testUser);

    // status 201
    expect(response.statusCode).toBe(201);

    // data of the new user (email)
    expect(response.body.email).toBe(testUser.email);

    // data of the new user (valid subscription)
    const validSubscriptions = ["starter", "pro", "business"];
    expect(validSubscriptions).toContain(response.body.subscription);

    // save the new user in the database
    const savedUser = await User.findOne({ email: testUser.email });
    expect(savedUser).toBeDefined();

    // should hash the password
    const passwordMatch = await bcrypt.compare(
      testUser.password,
      savedUser.password
    );
    expect(passwordMatch).toBe(true);

    // should get the avatar URL
    const expectedAvatarURL = gravatar.url(testUser.email);
    expect(savedUser.avatarURL).toBe(expectedAvatarURL);
  });

  test("shouldn't registrate the same user 2 times", async () => {
    const response = await testRequest(app)
      .post("/api/users/registration")
      .send(testUser);

    expect(response.statusCode).toBe(409);
  });

  afterAll(async () => {
    await mongoose.disconnect().then(() => console.log("DB disconnected"));
  });
});
