import express, { Router, Request, Response } from "express";
import { WebhookHandler } from "../controller/webhookHandler";

const route: Router = express.Router();

route.post("/handler", async (req: Request, res: Response) => {
  await WebhookHandler(req.body);
  res.status(200).json(req.body);
});

export default route;
