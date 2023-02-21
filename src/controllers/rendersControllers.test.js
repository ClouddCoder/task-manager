import * as Render from "./rendersControllers.js";
import pool from "../db.js";

jest.mock("../db.js");

const req = { body: { userId: 1 } };
const res = {
  render: jest.fn(),
};

afterEach(() => {
  jest.clearAllMocks();
});

describe.skip("loginPage", () => {
  it("should render the login page", () => {
    Render.loginPage(req, res);
    expect(res.render).toHaveBeenCalledWith("login", { title: "Task Manager" });
  });
});

describe.skip("registerPage", () => {
  it("should render the register page", () => {
    Render.registerPage(req, res);
    expect(res.render).toHaveBeenCalledWith("register", { title: "Task Manager" });
  });
});

describe("tasksPage", () => {
  beforeEach(() => {
    pool.query.mockResolvedValue({ rows: [] });
  });

  it.skip("should call de pool.query method", async () => {
    Render.tasksPage(req, res);

    expect(pool.query).toHaveBeenCalledTimes(1);
    await expect(pool.query()).resolves.toEqual({ rows: [] });
  });

  it("should render the tasks page", async () => {
    await Render.tasksPage(req, res);

    expect(res.render).toHaveBeenCalledWith("index", {
      title: "Task Manager",
      data: [],
    });
  });
});
