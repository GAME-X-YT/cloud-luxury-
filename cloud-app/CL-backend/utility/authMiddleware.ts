import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

interface AuthRequest extends Request {
   user?: { id: string }; // We only need the ID from the token payload
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Check for token existence and format (Bearer <token>)
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token or invalid format, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    req.user = { id: decoded.id.toString() };

    next();


  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Token is not valid" });
  }
};
