import { Request } from "express";

export interface User {
  username: string;
  email: string;
}

export interface CustomRequest extends Request {
  user?: User;
}
