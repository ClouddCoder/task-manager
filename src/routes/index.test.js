import request from "supertest";
import dotenv from "dotenv";
import * as authorization from "../controllers/authorization.js";
import app from "../app.js";
import pool from "../db.js";

dotenv.config();

const api = request(app);

afterAll(() => {
  pool.end();
});

describe.skip("POST /create-task", () => {
  it("should not create a new task because of the lack of the user token", async () => {
    const response = await api
      .post("/create-task")
      .send({
        userId: 1,
        title: "Test task",
        description: "Test description",
        status: "pending",
      })
      .set("Accept", "application/json");

    expect(response.type).toEqual("application/json");
    expect(response.status).toEqual(401);
    expect(response.body.message).toEqual("Unauthorized");
  });
});

describe.skip("POST /create-task", () => {
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

    expect(response.status).toEqual(302);
    getAuthorizationSpy.mockRestore();
  });
});

describe.skip("PUT /update-task-title", () => {
  it("should not update the task's title because of the lack of the user token", async () => {
    const response = await api
      .put("/update-task-title")
      .send({
        taskId: 1,
        title: "New task",
      })
      .set("Accept", "application/json");

    expect(response.type).toEqual("application/json");
    expect(response.status).toEqual(401);
    expect(response.body.message).toEqual("Unauthorized");
  });
});

describe.skip("PUT /update-task-title", () => {
  it("should update the task's title", async () => {
    const getAuthorizationSpy = jest
      .spyOn(authorization, "default")
      .mockImplementation(() => ({ userId: 1, username: "test" }));

    const response = await api
      .put("/update-task-title")
      .send({
        taskId: 1,
        title: "New task",
      })
      .set("Accept", "application/json");

    expect(response.status).toEqual(302);
    getAuthorizationSpy.mockRestore();
  });
});

describe.skip("PUT /update-task-description", () => {
  it("should not update the task's description because of the lack of the user token", async () => {
    const response = await api
      .put("/update-task-description")
      .send({
        taskId: 1,
        description: "New description",
      })
      .set("Accept", "application/json");

    expect(response.type).toEqual("application/json");
    expect(response.status).toEqual(401);
    expect(response.body.message).toEqual("Unauthorized");
  });
});

describe.skip("PUT /update-task-description", () => {
  it("should update the task's description", async () => {
    const getAuthorizationSpy = jest
      .spyOn(authorization, "default")
      .mockImplementation(() => ({ userId: 1, username: "test" }));

    const response = await api
      .put("/update-task-description")
      .send({
        taskId: 1,
        description: "New description",
      })
      .set("Accept", "application/json");

    expect(response.status).toEqual(302);
    getAuthorizationSpy.mockRestore();
  });
});

describe.skip("PUT /update-task-status", () => {
  it("should not update the task's status because of the lack of the user token", async () => {
    const response = await api
      .put("/update-task-status")
      .send({
        taskId: 1,
        status: "New status",
      })
      .set("Accept", "application/json");

    expect(response.type).toEqual("application/json");
    expect(response.status).toEqual(401);
    expect(response.body.message).toEqual("Unauthorized");
  });
});

describe.skip("PUT /update-task-status", () => {
  it("should update the task's status", async () => {
    const getAuthorizationSpy = jest
      .spyOn(authorization, "default")
      .mockImplementation(() => ({ userId: 1, username: "test" }));

    const response = await api
      .put("/update-task-status")
      .send({
        taskId: 1,
        status: "New status",
      })
      .set("Accept", "application/json");

    expect(response.status).toEqual(302);
    getAuthorizationSpy.mockRestore();
  });
});
