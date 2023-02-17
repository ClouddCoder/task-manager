import pool from "../db.js";

const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  const registerQuery = "CALL register($1, $2, $3)";

  try {
    await pool.query(registerQuery, [username, email, password]);

    return res.json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

export { register };
