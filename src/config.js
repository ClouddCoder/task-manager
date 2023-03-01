import { config } from "dotenv";

config();

let user;
let password;
let host;
let port;
let database;
let ssl;

switch (process.env.NODE_ENV) {
  case "dev":
    user = process.env.DB_USER_DEV;
    password = process.env.DB_PASSWORD_DEV;
    host = process.env.DB_HOST_DEV;
    port = process.env.DB_PORT_DEV;
    database = process.env.DB_NAME_DEV;
    ssl = process.env.DB_SSL_DEV;
    break;
  default:
    user = process.env.DB_USER;
    password = process.env.DB_PASSWORD;
    host = process.env.DB_HOST;
    port = process.env.DB_PORT;
    database = process.env.DB_NAME;
    ssl = process.env.DB_SSL;
}

export default {
  db: {
    user,
    password,
    host,
    port,
    database,
    ssl: Boolean(parseInt(ssl, 10)),
  },
};
