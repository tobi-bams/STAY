import jwt from "jsonwebtoken";
import { User } from "../interfaces/user";

interface JWTUser extends User {
  id: number;
}
export const JwtHandler = (user: JWTUser) => {
  const SECRET: any = process.env.JWT_SECRET;
  let token = jwt.sign(user, SECRET);
  return token;
};
