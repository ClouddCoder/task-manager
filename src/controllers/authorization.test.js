import jwt from "jsonwebtoken";
import getAuthorization from "./authorization.js";

describe.skip("Invalid authorization header", () => {
  it("should return 401 and Unauthorized message if authorization is null", () => {
    const authorization = null;
    const response = getAuthorization(authorization);

    expect(response.code).toEqual(401);
    expect(response.message).toEqual("Unauthorized");
  });

  it("should return 401 and Unauthorized message if the bearer word is missing", () => {
    const authorization = "1234";
    const response = getAuthorization(authorization);

    expect(response.code).toEqual(401);
    expect(response.message).toEqual("Unauthorized");
  });

  it("should return 401 and custom message if the token is missing", () => {
    const authorization = "Bearer";
    const response = getAuthorization(authorization);

    expect(response.code).toEqual(401);
    expect(response.message).toEqual("Token missing or invalid");
  });

  it("should return 401 and Unauthorized message if tshe userId is missing in the payload", () => {
    const decodeTokenSpy = jest.spyOn(jwt, "verify").mockReturnValue({});
    const authorization = "Bearer 1234";
    const response = getAuthorization(authorization);

    expect(response.code).toEqual(401);
    expect(response.message).toEqual("Unauthorized");
    decodeTokenSpy.mockRestore();
  });

  it("should return the token decoded", () => {
    const decodeTokenSpy = jest
      .spyOn(jwt, "verify")
      .mockReturnValue({ userId: 1, username: "test" });
    const authorization = "Bearer 1234";
    const response = getAuthorization(authorization);

    expect(response).toEqual({ userId: 1, username: "test" });
    decodeTokenSpy.mockRestore();
  });
});
