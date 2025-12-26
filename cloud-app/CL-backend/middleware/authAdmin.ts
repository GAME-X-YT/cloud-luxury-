import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

// Define a custom interface to handle the 'user' property on Request
interface AuthRequest extends Request {
  user?: any;
}

export const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    
    const user = await User.findById(decoded.id);

    // This ensures only your 4 designated admins can proceed
    if (user && user.role === 'admin') {
      req.user = user;
      next(); 
    } else {
      res.status(403).json({ message: "Access denied. Owners only." });
    }
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};