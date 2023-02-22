import pool from "../db.js";
import getAuthorization from "./authorization.js";

/**
 * Creates a new task.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const createTask = async (req, res, next) => {
  const { userId, title, description, status } = req.body;
  const { authorization } = req.headers;
  const decodeToken = getAuthorization(authorization);

  if (decodeToken.code) {
    return res.status(decodeToken.code).json({ message: decodeToken.message });
  }

  const createTaskQuery = "CALL create_task($1, $2, $3, $4)";
  const values = [userId, title, description, status];

  try {
    await pool.query(createTaskQuery, values);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

/**
 * Updates the task's title.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const updateTaskTitle = async (req, res, next) => {
  const { taskId, title } = req.body;
  const { authorization } = req.headers;
  const decodeToken = getAuthorization(authorization);

  if (decodeToken.code) {
    return res.status(decodeToken.code).json({ message: decodeToken.message });
  }

  const updateTaskTitleQuery = "CALL update_task_title($1, $2)";
  const values = [title, taskId];

  try {
    await pool.query(updateTaskTitleQuery, values);
    res.json({ message: "Task title updated successfully" });
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

/**
 * Updates the task's description.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const updateTaskDescription = async (req, res, next) => {
  const { taskId, description } = req.body;
  const { authorization } = req.headers;
  const decodeToken = getAuthorization(authorization);

  if (decodeToken.code) {
    return res.status(decodeToken.code).json({ message: decodeToken.message });
  }

  const updateTaskDescriptionQuery = "CALL update_task_description($1, $2)";
  const values = [description, taskId];

  try {
    await pool.query(updateTaskDescriptionQuery, values);
    res.json({ message: "Task description updated successfully" });
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

/**
 * Updates the task's status.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const updateTaskStatus = async (req, res, next) => {
  const { taskId, status } = req.body;
  const { authorization } = req.headers;
  const decodeToken = getAuthorization(authorization);

  if (decodeToken.code) {
    return res.status(decodeToken.code).json({ message: decodeToken.message });
  }

  const updateTaskStatusQuery = "CALL update_task_status($1, $2)";
  const values = [status, taskId];

  try {
    await pool.query(updateTaskStatusQuery, values);
    res.json({ message: "Task status updated successfully" });
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

/**
 * Deletes a task.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const deleteTask = async (req, res, next) => {
  const { taskId } = req.params;
  const { authorization } = req.headers;
  const decodeToken = getAuthorization(authorization);

  if (decodeToken.code) {
    return res.status(decodeToken.code).json({ message: decodeToken.message });
  }

  const deleteTaskQuery = "DELETE FROM task WHERE task_id = $1";
  const values = [taskId];

  try {
    await pool.query(deleteTaskQuery, values);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export { createTask, updateTaskTitle, updateTaskDescription, updateTaskStatus, deleteTask };
