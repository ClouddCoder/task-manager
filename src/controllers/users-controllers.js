import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../db.js";

const jwtPassword = process.env.JWT_SECRET;

const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  const registerQuery = "SELECT * FROM register($1, $2, $3)";

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const userId = await pool.query(registerQuery, [username, email, passwordHash]);

    const payload = {
      userId: userId.rows[0].register,
      username,
    };

    const token = jwt.sign(payload, jwtPassword);

    return res.json({ message: "User registered successfully", token });
  } catch (error) {
    next(error);
  }
};

export { register };
