import request from "supertest";
import { initApp } from "../../app";
import { UserModel } from "../models/user.model";

let app;
let accessToken;
let userId;
let cocktailId;

const cocktail = {
    "name": "cocktail",
    "category": "cocktail",
    "ingredients": "cocktail",
    "instructions": "cocktail",
    "image": "",
    "username": "test",
    "comments": []
}

const updatedCocktail = {
    "name": "cocktailll",
    "category": "cocktailll",
    "ingredients": "cocktailll",
    "instructions": "cocktailll",
    "image": "",
    "username": "test",
    "comments": []
}


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
    app = await initApp();
    await UserModel.deleteMany({ 'email': user.email });
    const registerResponse = await request(app).post("/auth/register").send(user);
    userId = registerResponse.body._id;
    const loginResponse = await request(app).post("/auth/login").send(loginUser);    
    accessToken = loginResponse.body.accessToken;
  }, 60000);

describe("Cocktail tests", () => {
  const updateCocktail = async () => {
    const response = await request(app).put(`/api/cocktails/${cocktailId}`)
      .set("Authorization", "bearer " + accessToken)
      .send({...updatedCocktail, userId});

    expect(response.statusCode).toBe(200);
  };


  test("Insert new cocktail", async () => {
    const responseUser = await request(app).get("/api/users").set("Authorization", "bearer " + accessToken);
    userId = responseUser.body[0]._id;
    const response = await request(app).post(`/api/cocktails`)
      .set("Authorization", "bearer " + accessToken)
      .send({...cocktail, userId});

    expect(response.statusCode).toBe(201);
  });

  test("Test Get All cocktails", async () => {
    const response = await request(app).get("/api/cocktails").set("Authorization", "bearer " + accessToken);
    expect(response.statusCode).toBe(200);
  });

  test("Test update cocktail", async () => {
    const response = await request(app).get("/api/cocktails").set("Authorization", "bearer " + accessToken);
    cocktailId = response.body[0]._id;
    updateCocktail();
  });

  test("Test Get All cocktails with one cocktail in DB", async () => {
    const response = await request(app).get("/api/cocktails").set("Authorization", "bearer " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    const cocktailFetched = response.body[0];
    expect(cocktailFetched.username).toBe(updatedCocktail.username);
  });

  test("Test DELETE /cocktail/:id", async () => {
    const response = await request(app).delete(`/api/cocktails/${cocktailId}`)
    .set("Authorization", "bearer " + accessToken);;
    expect(response.statusCode).toBe(200);
  });
});