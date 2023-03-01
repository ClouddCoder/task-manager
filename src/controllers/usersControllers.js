import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../db.js";

const jwtPassword = process.env.JWT_SECRET;

/**
 * Creates a new user.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  const registerQuery = "SELECT * FROM register($1, $2, $3)";

  if (password.length === 0 || password === null) {
    return res.status(401).json({ message: "You must enter the password" });
  }
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const userId = await pool.query(registerQuery, [username, email, passwordHash]);

    console.log(userId.rows[0].register);

    const payload = {
      userId: userId.rows[0].register,
      username,
    };

    const token = jwt.sign(payload, jwtPassword);

    return res.json({ userId: userId.rows[0].register, token });
  } catch (error) {
    next(error);
  }
};

/**
 * Checks if the user exists in the database.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const login = async (req, res, next) => {
  const { email, password } = req.body;

  const loginQuery = "SELECT * FROM user_data WHERE user_email = $1";

  try {
    const response = await pool.query(loginQuery, [email]);
    if (response.rows.length === 0) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const data = response.rows[0];

    // eslint-disable-next-line operator-linebreak
    const checkPassword =
      email !== data.user_email ? false : await bcrypt.compare(password, data.user_password);

    if (!checkPassword) {
      return res.status(401).json({
        message: "Incorrect Email/Password",
      });
    }

    const payload = {
      userId: data.user_id,
      username: data.username,
    };

    const token = jwt.sign(payload, "1234");

    return res.json({
      userId: data.user_id,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export { signUp, login };
