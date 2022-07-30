const models = require("../models");
import { ResponseHandler } from "../util/response";
import { JWTUser } from "../interfaces/user";
import joi from "joi";
import { resolveBank } from "../service/resolveBank";
import api from "../service/api";

interface Req {
  user: JWTUser;
  bank_name: string;
  bank_code: string;
  account_number: string;
  amount: number;
  account_name: string;
}

interface ProviderPayout {
  status: boolean;
  message: string;
  payout?: { bank: Req; reference: string };
}

const createPayout = async (req: Req): Promise<ProviderPayout> => {
  try {
    const data = {
      bank: { account_number: req.account_number, bank_code: req.bank_code },
      currency: "NGN",
    };
    const response = await api.post("payouts/accounts", data);
    return response.data;
  } catch (error) {
    console.log(error);
    return { status: false, message: "Internal Server Error" };
  }
};

export const Withdraw = async (req: Req) => {
  const schema = joi.object({
    bank_name: joi.string().required(),
    bank_code: joi.string().required(),
    account_number: joi.string().required(),
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
    if (user.wallet.balance < Number(req.amount) * 100) {
      return ResponseHandler(400, "Insufficient Balance");
    }
    const payoutExist = await models.payout.findOne({
      where: { accountNumber: req.account_number },
    });
    if (payoutExist) {
      return ResponseHandler(200, "Proceed to make widthdrawals");
    } else {
      const account_name = await resolveBank({
        bank_code: req.bank_code,
        account_number: req.account_number,
      });
      if (account_name.status) {
        const providerPayout = await createPayout(req);
        if (providerPayout.status) {
          const savePayout = await models.payout.create({
            reference: providerPayout.payout?.reference,
            accountName: providerPayout.payout?.bank.account_name,
            accountNumber: providerPayout.payout?.bank.account_number,
            bankCode: providerPayout.payout?.bank.bank_code,
            bankName: providerPayout.payout?.bank.bank_name,
            userId: req.user.id,
          });
          return ResponseHandler(201, "created", savePayout);
        } else {
          return ResponseHandler(500, providerPayout.message);
        }
      } else {
        return ResponseHandler(400, account_name.message);
      }
    }
  } catch (error) {
    console.log(error);
    return ResponseHandler(500, "Internal Server Error");
  }
};
