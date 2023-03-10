import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const jwtPassword = process.env.JWT_SECRET;

/**
 * Verifies if the user is authorized.
 */
const getAuthorization = (authorization) => {
  let token = null;
  let decodeToken = null;

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    // eslint-disable-next-line prefer-destructuring
    token = authorization.split(" ")[1];
  } else {
    return { code: 401, message: "Unauthorized" };
  }

  if (!token) {
    return { code: 401, message: "Token missing or invalid" };
  }

  try {
    decodeToken = jwt.verify(token, jwtPassword);
  } catch (error) {
    console.log(error);
    return { code: 401, message: "Token missing or invalid" };
  }

  if (!decodeToken.userId) {
    return { code: 401, message: "Unauthorized" };
  }

  return decodeToken;
};

export default getAuthorization;
