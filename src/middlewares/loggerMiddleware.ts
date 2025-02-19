import { Request, Response, NextFunction } from "express";

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const now = new Date();
  console.log("Hi bro! this is middleware.");
  console.log(`[${now.toISOString()}] ${req.method} ${req.url}`);

  next();
};
