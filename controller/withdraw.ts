const models = require("../models");
import { ResponseHandler } from "../util/response";
import { JWTUser } from "../interfaces/user";
import joi from "joi";

interface Req {
  user: JWTUser;
  bank_name: string;
  bank_code: number;
  account_number: string;
  amount: number;
}

export const Withdraw = async (req: Req) => {
  const schema = joi.object({
    bank_name: joi.string().required(),
    bank_code: joi.number().required(),
    account_number: joi.number().required(),
    amount: joi.number().required(),
  });

  const validation = schema.validate({
    bank_name: req.bank_name,
    bank_code: req.bank_code,
    account_number: req.account_number,
    amount: req.amount,
  });

  if (validation.error) {
    return ResponseHandler(422, validation.error.details[0].message);
  }
  try {
    const user = await models.user.findOne({
      where: { id: req.user.id },
      include: models.wallet,
    });
    if (user.wallet.balance < req.amount * 100) {
      return ResponseHandler(400, "Insufficient Balance");
    }
    const payoutExist = await models.payout.findOne({
      where: { accountNumber: req.account_number },
    });
    if (payoutExist) {
      return ResponseHandler(200, "Proceed to make widthdrawals");
    } else {
      return ResponseHandler(200, "Proceed to create Payout");
    }
  } catch (error) {
    console.log(error);
    return ResponseHandler(500, "Internal Server Erro");
  }
};
