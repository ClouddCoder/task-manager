import pool from "../db.js";

/**
 * Renders the login page.
 * @param {*} req
 * @param {*} res
 */
const loginPage = (req, res) => {
  res.render("login", { title: "Task Manager" });
};

/**
 * Renders the register page.
 * @param {*} req
 * @param {*} res
 */
const registerPage = (req, res) => {
  res.render("register", { title: "Task Manager" });
};

/**
 * Renders the tasks page.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const tasksPage = async (req, res, next) => {
  let data;

  const { userId } = req.params;

  const tasksQuery = "SELECT * FROM task WHERE user_id = $1";

  try {
    data = await pool.query(tasksQuery, [userId]);
  } catch (error) {
    next(error);
  }

  res.render("index", { title: "Task Manager", data: data?.rows });
};

/**
 * Renders the edit task page.
 * @param {*} req
 * @param {*} res
 * @returns
 */
const editTaskPage = (req, res) => {
  const { taskId } = req.params;

  res.render("editTask", { title: "Task Manager", taskId });
};

const custom404 = (req, res) => {
  res.status(404).render("404", { title: "Task Manager" });
};

export { tasksPage, loginPage, registerPage, editTaskPage, custom404 };
