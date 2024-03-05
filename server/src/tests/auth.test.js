//to run the test run in the terminal: node --experimental-vm-modules node_modules/jest/bin/jest.js --testPathPattern=auth.test.js
import request from "supertest";
import { initApp } from "../../app";
import { UserModel } from "../models/user.model";
import mongoose from "mongoose";

let app;
let accessToken;
let userId;
let refreshToken;
let newRefreshToken;

const user = {
  email: "test@test.com",
  password: "1234567890",
  username: 'test',
  name: 'test',
  passwordConfirmation: '1234567890',
  image:''
}

const loginUser = {
    username: 'test',
    password: "1234567890"
}

beforeAll(async () => {
    process.env.JWT_EXPIRATION = "4s";
    app = await initApp();
    await UserModel.deleteMany({ 'email': user.email });
  }, 60000);

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth tests", () => {
  test("Test register", async () => {
    const registerResponse = await request(app).post("/auth/register").send(user);
    userId = registerResponse.body._id;
    expect(registerResponse.statusCode).toBe(200);
  });

  test("Test Register exist email", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send(user);
    expect(response.statusCode).toBe(406);
  });

  test("Test Register missing password", async () => {
    const response = await request(app)
      .post("/auth/register").send({
        email: "test@test.com",
      });
    expect(response.statusCode).toBe(500);
  });

  test("Test Login", async () => {
    const response = await request(app)
      .post("/auth/login").send(loginUser);
    expect(response.statusCode).toBe(200);
    accessToken = response.body.accessToken;
    refreshToken = response.body.refreshToken;
    expect(accessToken).toBeDefined();
  });

  test("Test forbidden access without token", async () => {
    const response = await request(app).get("/api/cocktails");
    expect(response.statusCode).toBe(401);
  });

  test("Test access with valid token", async () => {
    const response = await request(app).get("/api/cocktails").set("Authorization", "bearer " + accessToken);
    expect(response.statusCode).toBe(200);
  });

  test("Test access with invalid token", async () => {
    const response = await request(app)
      .get("/api/cocktails")
      .set("Authorization", "bearer 1" + accessToken);
    expect(response.statusCode).toBe(401);
  });

  test("Test access after timeout of token", async () => {
    await new Promise(resolve => setTimeout(() => resolve("done"), 5000));

    const response = await request(app)
      .get("/api/cocktails")
      .set("Authorization", "bearer " + accessToken);
    expect(response.statusCode).not.toBe(200);
  }, 10000);

  test("Test refresh token", async () => {
    const response = await request(app)
      .get("/auth/refresh")
      .set("Authorization", "bearer " + refreshToken)
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body.accessToken).toBeDefined();
    expect(response.body.refreshToken).toBeDefined();

    const newAccessToken = response.body.accessToken;
    newRefreshToken = response.body.refreshToken;

    const response2 = await request(app)
      .get("/api/cocktails")
      .set("Authorization", "bearer " + newAccessToken);
    expect(response2.statusCode).toBe(200);
  });

  test("Test double use of refresh token", async () => {
    const response = await request(app)
      .get("/auth/refresh")
      .set("Authorization", "bearer " + refreshToken)
      .send();
    expect(response.statusCode).not.toBe(200);

    //verify that the new token is not valid as well
    const response1 = await request(app)
      .get("/auth/refresh")
      .set("Authorization", "bearer " + newRefreshToken)
      .send();
    expect(response1.statusCode).not.toBe(200);
  });
});