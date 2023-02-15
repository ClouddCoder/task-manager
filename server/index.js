import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { title: "Task Manager" });
});

const PORT = parseInt(process.env.PORT, 10) || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
