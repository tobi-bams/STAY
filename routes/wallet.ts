import express, { Router, Request, Response } from "express";
import { auth } from "../middleware/auth";
import { getWalletBalance } from "../controller/wallet";

const route: Router = express.Router();

route.get("/balance", auth, async (req: Request, res: Response) => {
  const response = await getWalletBalance(req.body.user);
  res.status(response.status).json(response.body);
});

export default route;
