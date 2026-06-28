import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "vendsmart_secure_local_key";

export type TokenPayload = {
  id: string;
  email: string;
  role: "ADMIN" | "MANAGER" | "EMPLOYEE";
  vendorId?: string | null;
  iat?: number;
  exp?: number;
};

export function verifyToken(
  token: string
): TokenPayload | null {
  try {
    return jwt.verify(
      token,
      JWT_SECRET
    ) as TokenPayload;
  } catch (err) {
    console.error("JWT VERIFY ERROR:", err);
    return null;
  }
}