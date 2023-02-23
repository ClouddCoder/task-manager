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

describe.skip("POST /sign-up", () => {
  it("should not register a new user because the username is missing", async () => {
    const response = await api
      .post("/sign-up")
      .send({
        username: "",
        email: "prueba@prueba.com",
        password: "1234",
      })
      .set("Accept", "application/json");

    expect(response.type).toEqual("application/json");
    expect(response.status).toEqual(401);
    expect(response.body.message).toEqual("Debes ingresar el username");
  });
});

describe.skip("POST /sign-up", () => {
  it("should not register a new user because the password is missing", async () => {
    const response = await api
      .post("/sign-up")
      .send({
        username: "test",
        email: "test@test.com",
        password: "",
      })
      .set("Accept", "application/json");

    expect(response.type).toEqual("application/json");
    expect(response.status).toEqual(401);
    expect(response.body.message).toEqual("Debes ingresar la contraseña");
  });
});

describe.skip("POST /sign-up", () => {
  it("should not register a new user because the email is missing", async () => {
    const response = await api
      .post("/sign-up")
      .send({
        username: "prueba",
        email: "",
        password: "1234",
      })
      .set("Accept", "application/json");

    expect(response.type).toEqual("application/json");
    expect(response.status).toEqual(401);
    expect(response.body.message).toEqual("Debes ingresar el email");
  });
});

describe.skip("POST /sign-up", () => {
  it("should not register a new user because the user already exists", async () => {
    const response = await api
      .post("/sign-up")
      .send({
        username: "test",
        email: "prueba@prueba.com",
        password: "1234",
      })
      .set("Accept", "application/json");

    expect(response.type).toEqual("application/json");
    expect(response.status).toEqual(401);
    expect(response.body.message).toEqual("El usuario ya existe");
  });
});

describe.skip("POST /sign-up", () => {
  it("should register a new user", async () => {
    const response = await api
      .post("/sign-up")
      .send({
        username: "test",
        email: "prueba@prueba.com",
        password: "1234",
      })
      .set("Accept", "application/json");

    expect(response.type).toEqual("application/json");
    expect(response.status).toEqual(200);
  });
});

describe.skip("POST /login", () => {
  it("should not log in because the user does not exist", async () => {
    const response = await api
      .post("/login")
      .send({
        email: "test@test.com",
        password: "1234",
      })
      .set("Accept", "application/json");

    expect(response.type).toEqual("application/json");
    expect(response.status).toEqual(401);
    expect(response.body.message).toEqual("El usuario no existe");
  });
});

describe.skip("POST /login", () => {
  it("should not log in because the login details are incorrect", async () => {
    const response = await api
      .post("/login")
      .send({
        email: "prueba@prueba.com",
        password: "12345",
      })
      .set("Accept", "application/json");

    expect(response.type).toEqual("application/json");
    expect(response.status).toEqual(401);
    expect(response.body.message).toEqual("Email/Contraseña incorrecto");
  });
});

describe.skip("POST /login", () => {
  it("should log in", async () => {
    const response = await api
      .post("/login")
      .send({
        email: "prueba@prueba.com",
        password: "1234",
      })
      .set("Accept", "application/json");

    expect(response.type).toEqual("application/json");
    expect(response.status).toEqual(200);
  });
});

describe.skip("POST /create-task", () => {
  it("should not create a new task because the user is not authorized", async () => {
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
  it("should not update the task's title because the user is not authorized", async () => {
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
  it("should not update the task's description because the user is not authorized", async () => {
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
  it("should not update the task's status because the user is not authorized", async () => {
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
