import jwt from "jsonwebtoken";

export function verifyToken(req: any, res: any, next: any) {
  const token = req.headers.authorization;
  const secretKey = "Raed@2024";

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  jwt.verify(token, secretKey, (err: any) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    next();
  });
}
