import jwt from "jsonwebtoken";

interface JWTUser {
  id: number;
  fullname: string;
  email: string;
}
export const JwtHandler = (user: JWTUser) => {
  const SECRET: any = process.env.JWT_SECRET;
  let token = jwt.sign(user, SECRET);
  return token;
};
