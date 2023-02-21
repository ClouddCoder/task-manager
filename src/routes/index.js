import { Router } from "express";
import { register, login } from "../controllers/users-controllers.js";
import { loginPage, registerPage, tasksPage } from "../controllers/renders-controllers.js";

const router = Router();

router.get("/", tasksPage);
router.get("/login-page", loginPage);
router.post("/login", login);
router.get("/sign-up-page", registerPage);
router.post("/sign-up", register);

export default router;
