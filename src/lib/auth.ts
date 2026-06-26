import * as jwt from "jsonwebtoken";

const JWT_SECRET = "secret123";

export function verifyToken(
  token: string
) {
  try {
    const decoded = jwt.verify(
      token,
      JWT_SECRET
    );

    console.log(
      "DECODED TOKEN:",
      decoded
    );

    return decoded as {
      userId: string;
      role: string;
    };
  } catch (error) {
    console.error(
      "JWT VERIFY ERROR:",
      error
    );

    return null;
  }
}