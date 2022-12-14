const models = require("../models");
import { ResponseHandler } from "../util/response";
import { JWTUser } from "../interfaces/user";
import joi from "joi";
import { resolveBank } from "../service/resolveBank";
import api from "../service/api";
import { IntegerDataType } from "sequelize/types";

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

interface Widthdraw {
  amount: number;
  payout_reference: string;
  wallet_id: number;
  payout_id: number;
  balance: number;
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

const withdrawHandler = async (data: Widthdraw) => {
  const t = await models.sequelize.transaction();
  try {
    const amount = Number(data.amount) * 100;
    const payoutDetails = {
      recipient: data.payout_reference,
      amount: amount + 10000,
    };
    const requestPayout = await api.post("payouts", payoutDetails);
    await models.withdraw.create(
      {
        walletId: data.wallet_id,
        amount: amount + 12000,
        payoutId: data.payout_id,
        reference: requestPayout.data.payout.reference,
        status: "success",
      },
      { transaction: t }
    );
    const newWalletBalance = data.balance - (amount + 1200);
    await models.wallet.update(
      { balance: newWalletBalance },
      { where: { id: data.wallet_id }, transaction: t }
    );
    t.commit();
    return ResponseHandler(200, `Withdrawal Successful`);
  } catch (error) {
    t.rollback();
    console.log(error);
    return ResponseHandler(500, "Internal Server Error");
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
      if (payoutExist.bankCode === req.bank_code) {
        const withdraw = await withdrawHandler({
          balance: user.wallet.balance,
          payout_id: payoutExist.id,
          payout_reference: payoutExist.reference,
          wallet_id: user.wallet.id,
          amount: req.amount,
        });
        return withdraw;
      } else {
        return ResponseHandler(400, "Invalid Bank Code");
      }
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
          const withdraw = await withdrawHandler({
            amount: req.amount,
            wallet_id: user.wallet.id,
            payout_reference: savePayout.reference,
            payout_id: savePayout.id,
            balance: user.wallet.balance,
          });
          return withdraw;
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
