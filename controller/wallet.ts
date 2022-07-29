const models = require("../models");
import { JWTUser } from "../interfaces/user";
import { ResponseHandler } from "../util/response";

export const getWalletBalance = async (user: JWTUser) => {
  try {
    const wallet = await models.wallet.findOne({ where: { userId: user.id } });
    return ResponseHandler(200, "Wallet Ballance", {
      wallet: { balance: wallet.balance / 100 },
    });
  } catch (error) {
    console.log(error);
    return ResponseHandler(500, "Internal Server Error");
  }
};
