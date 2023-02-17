import Router from "express";
import { register, login } from "../controllers/users-controllers.js";

const router = Router();

router.post("/register", register);
router.get("/login", login);

export default router;
