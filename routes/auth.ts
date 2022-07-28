import express, { Router, Response, Request } from "express";
import { signUp } from "../controller/auth";

const route: Router = express.Router();

route.post("/sign-up", async (req: Request, res: Response) => {
  const response = await signUp(req.body);
  res.status(response.status).json(response.body);
});

export default route;
