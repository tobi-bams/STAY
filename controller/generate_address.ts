import api from "../service/api";
import { ResponseHandler } from "../util/response";
import { JWTUser } from "../interfaces/user";
const models = require("../models");

interface GenerateAddress {
  user: JWTUser;
  coin: string;
}

export const GenerateAddress = async (req: GenerateAddress) => {
  const wallet = await models.wallet.findOne({
    where: { userId: req.user.id },
  });
  try {
    const address = await api.post("address", { code: req.coin });
    const createDeposit = await models.deposit.create({
      amount: 0,
      walletId: wallet.id,
      address: address.data.address.address,
      reference: address.data.address.reference,
      coin: req.coin,
    });
    return ResponseHandler(201, address.data.message, {
      address: address.data.address.address,
      reference: address.data.address.reference,
    });
  } catch (error: any) {
    console.log(error);
    return ResponseHandler(500, "Internal Server Error");
  }
};
