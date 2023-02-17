import pg from "pg";
import db from "./config.js";

const { Pool } = pg;

const pool = new Pool({
  user: db.db.user,
  password: db.db.password,
  host: db.db.host,
  port: db.db.port,
  database: db.db.database,
});

export default pool;
