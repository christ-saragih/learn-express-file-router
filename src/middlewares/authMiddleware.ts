import { CustomRequest, User } from "@/types";
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const now = new Date();
  console.log(`[${now.toISOString()}] ${req.method} ${req.url}`);

  // console.log("Ini dari middleware", req.headers["authorization"]);

  // const token = req.headers["authorization"];

  // console.log(token);

  // jwt.verify(token, process.env.JWT_SECRET || "", (err, decoded) => {
  //   if (err) {
  //     return res.status(403).json({
  //       message: "Forbidden",
  //     });
  //   } else {
  //     const user = decoded as User;
  //     req.user = user;
  //     next();
  //   }
  // });

  const authorization = req.headers["authorization"];

  const token = authorization?.split(" ")?.[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorization",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET || "", (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: "Forbidden",
      });
    } else {
      const user = decoded as User;
      req.user = user;
      next();
    }
  });

};
