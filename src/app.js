import express from "express";
import cors from "cors";
import morgan from "morgan";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import router from "./routes/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "public")));
app.use(express.static(join(__dirname, "scripts")));
app.use(router);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.code === "23502") {
    return res.status(404).json({ message: "Informacion invalida" });
  }

  switch (err.constraint) {
    case "user_data_username_key":
    case "user_data_user_email_key":
      return res.status(401).json({ message: "El usuario ya existe" });
    case "check_not_null_username":
    case "check_not_empty_username":
      return res.status(401).json({ message: "Debes ingresar el username" });
    case "check_not_null_user_email":
    case "check_not_empty_user_email":
      return res.status(401).json({ message: "Debes ingresar el email" });
    case "check_not_null_user_password":
    case "check_not_empty_user_password":
      return res.status(401).json({ message: "Debes ingresar la contraseña" });
    case "check_not_null_user_id":
    case "check_not_empty_user_id":
      return res.status(401).json({ message: "userId is missing" });
    case "check_not_null_task_title":
    case "check_not_empty_task_title":
      return res.status(401).json({ message: "Debes ingresar un titulo" });
    case "check_not_null_task_status":
    case "check_not_empty_task_status":
      return res.status(401).json({ message: "task status is missing" });
    default:
  }

  return res.status(400).json({ message: "Error" });
});

export default app;
