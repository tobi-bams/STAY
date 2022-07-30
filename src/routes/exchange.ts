import express, { Router, Response, Request } from "express";
import { getCryptoToFiat } from "../controller/fiat";
import { auth } from "../middleware/auth";

const route: Router = express.Router();

route.get("/value", auth, async (req: Request, res: Response) => {
  const response = await getCryptoToFiat(req.query.coin);
  res.status(response.status).json(response.body);
});

export default route;
