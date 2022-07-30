import jwt from "jsonwebtoken";
import { JWTUser } from "../interfaces/user";
export const JwtHandler = (user: JWTUser) => {
  const SECRET: any = process.env.JWT_SECRET;
  let token = jwt.sign(user, SECRET);
  return token;
};
