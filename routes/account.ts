import express, { Request, Response, Router } from "express";
import { auth } from "../middleware/auth";
import { getAccountName } from "../controller/fiat";

const route: Router = express.Router();

route.get("/name", auth, async (req: Request, res: Response) => {
  const account = await getAccountName({
    bank_code: req.query.bank_code,
    account_number: req.query.account_number,
  });
  res.status(account.status).json(account.body);
});

export default route;
