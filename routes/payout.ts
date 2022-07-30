import express, { Router, Response, Request } from "express";
import { savePayout } from "../controller/payout";
import { auth } from "../middleware/auth";

const route: Router = express.Router();

route.put("/save", auth, async (req: Request, res: Response) => {
  const payout = await savePayout(req.body.user);
  res.status(payout.status).json(payout.body);
});

export default route;
