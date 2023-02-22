import request from "supertest";
import dotenv from "dotenv";
import * as authorization from "../controllers/authorization.js";
import { app, server } from "../index.js";
import pool from "../db.js";

dotenv.config();

const api = request(app);

afterAll(() => {
  server.close();
  pool.end();
});

describe("POST /create-task", () => {
  it("should not create a new task because of the lack of user token", async () => {
    const response = await api
      .post("/create-task")
      .send({
        userId: 1,
        title: "Test task",
        description: "Test description",
        status: "pending",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(401);

    expect(response.body.message).toBe("Unauthorized");
  });
});

describe("POST /create-task", () => {
  it("should create a new task", async () => {
    const getAuthorizationSpy = jest
      .spyOn(authorization, "default")
      .mockImplementation(() => ({ userId: 1, username: "test" }));

    const response = await api
      .post("/create-task")
      .send({
        userId: 1,
        title: "Test task",
        description: "Test description",
        status: "pending",
      })
      .set("Authorization", "Bearer 1234");

    expect(response.status).toBe(302);
    getAuthorizationSpy.mockRestore();
  });
});
