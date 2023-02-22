import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import router from "./routes/index.js";

dotenv.config();

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
app.use((err, req, res, next) => res.status(404).json({ message: "Informacion invalida" }));

const PORT = parseInt(process.env.PORT, 10) || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { app, server };
