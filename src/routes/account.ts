import express, { Request, Response, Router } from "express";
import { auth } from "../middleware/auth";
import { getAccountName, getAllbanks } from "../controller/fiat";

const route: Router = express.Router();

route.get("/name", auth, async (req: Request, res: Response) => {
  const account = await getAccountName({
    bank_code: req.query.bank_code,
    account_number: req.query.account_number,
  });
  res.status(account.status).json(account.body);
});

route.get("/banks", auth, async (req: Request, res: Response) => {
  const banks = await getAllbanks();
  res.status(banks.status).json(banks.body);
});

export default route;
