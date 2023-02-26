import { Router } from "express";
import { register, login } from "../controllers/usersControllers.js";
import {
  loginPage,
  registerPage,
  tasksPage,
  editTaskPage,
  custom404,
} from "../controllers/rendersControllers.js";
import {
  createTask,
  updateTaskTitle,
  updateTaskDescription,
  updateTaskStatus,
  deleteTask,
} from "../controllers/tasksControllers.js";

const router = Router();

router.get("/tasks/:userId", tasksPage);
router.get("/edit-task-page/:taskId", editTaskPage);
router.get("/sign-up-page", registerPage);
router.post("/sign-up", register);
router.get("/login-page", loginPage);
router.post("/login", login);
router.post("/create-task", createTask);
router.put("/update-task-title", updateTaskTitle);
router.put("/update-task-description", updateTaskDescription);
router.put("/update-task-status", updateTaskStatus);
router.delete("/delete-task", deleteTask);
router.get("*", custom404);

export default router;
