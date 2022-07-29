import express, { Router, Request, Response } from "express";
import { GenerateAddress } from "../controller/generate_address";
import { auth } from "../middleware/auth";

const route: Router = express.Router();

route.post("/generate", auth, async (req: Request, res: Response) => {
  const response = await GenerateAddress(req.body);
  res.status(response.status).json(response.body);
});

export default route;
