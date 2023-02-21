import { Router } from "express";
import { register, login } from "../controllers/usersControllers.js";
import { loginPage, registerPage, tasksPage } from "../controllers/rendersControllers.js";

const router = Router();

router.get("/", tasksPage);
router.get("/login-page", loginPage);
router.post("/login", login);
router.get("/sign-up-page", registerPage);
router.post("/sign-up", register);

export default router;
